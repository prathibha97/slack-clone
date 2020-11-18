import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import pusher from "pusher";
import dotenv from "dotenv";
import Slack from "./models/Slack.js";
// app config
const app = express();
dotenv.config();
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

// listen
app.listen(port, () => console.log(`server listening on port ${port}`));

// nH7i9MOrtdrz5ez3
