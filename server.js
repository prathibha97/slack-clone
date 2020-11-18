import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Pusher from "pusher";
import dotenv from "dotenv";
import Slack from "./models/Slack.js";
import path from "path";
// app config
const app = express();
dotenv.config();

const pusher = new Pusher({
  appId: "1108968",
  key: process.env.KEY,
  secret: process.env.SECRET,
  cluster: "ap2",
  useTLS: true,
});

const port = process.env.PORT || 9000;

// middleware
app.use(cors());
app.use(express.json());

// DB config
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log(`mongoDB connected`);
    const changeStream = mongoose.connection
      .collection("conversations")
      .watch();

    changeStream.on("change", (change) => {
      if (change.operationType === "insert") {
        pusher.trigger("channels", "newChannel", {
          change: change,
        });
      } else if (change.operationType === "update") {
        pusher.trigger("conversation", "newMessage", {
          change: change,
        });
      } else {
        console.log(`error triggering pusher`);
      }
    });
  })

  .catch((err) => console.log(err.message));

// api routes
app.get("/", (req, res) => res.status(200).send("hello world"));

app.post("/new/channel", (req, res) => {
  const dbData = req.body;
  Slack.create(dbData, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.post("/new/message", (req, res) => {
  const id = req.query.id;
  const newMessage = req.body;

  Slack.update(
    { _id: id },
    { $push: { conversation: newMessage } },
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    },
  );
});

app.get("/get/channelList", (req, res) => {
  Slack.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      let channels = [];
      data.map((channelData) => {
        const channelInfo = {
          id: channelData._id,
          name: channelData.channelName,
        };
        channels.push(channelInfo);
      });
      res.status(200).send(channels);
    }
  });
});

app.get("/get/conversation", (req, res) => {
  const id = req.query.id;

  Slack.find({ _id: id }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// serve static assets on production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// listen
app.listen(port, () => console.log(`server listening on port ${port}`));

// nH7i9MOrtdrz5ez3
