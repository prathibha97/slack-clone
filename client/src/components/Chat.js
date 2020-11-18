import React, { useEffect, useState } from "react";
import "../css/Chat.css";
import { useParams } from "react-router-dom";
import { InfoOutlined, StarBorderOutlined } from "@material-ui/icons";
import db from "../firebase";
import Messages from "./Messages";
import ChatInput from "./ChatInput";
import axios from '../axios'
import Pusher from 'pusher-js'


const pusher = new Pusher('715d7e3f66d25a5cc259', {
  cluster: 'ap2'
});

function Chat() {
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [roomMessages, setRoomMessages] = useState([]);

  const getConvo = () => {
    axios.get(`/get/conversation?id=${roomId}`).then((res) => {
      setRoomDetails(res.data[0].channelName)
      setRoomMessages(res.data[0].conversation)
    })
  }

  useEffect(() => {
    if (roomId) {
      getConvo()

      // pusher stuff
      const channel = pusher.subscribe('conversation');
      channel.bind('newMessage', function (data) {
        getConvo()
      });
    }
  }, [roomId]);
  //   console.log(roomDetails);
  console.log(roomMessages);
  return (
    <div className='chat'>
      <div className='chat__header'>
        <div className='chat__headerLeft'>
          <h4 className='chat__channelName'>
            <strong># {roomDetails}</strong>
            <StarBorderOutlined />
          </h4>
        </div>
        <div className='chat__headerRight'>
          <p>
            <InfoOutlined /> Details
          </p>
        </div>
      </div>
      {/* map messages */}
      <div className='chat__messages'>
        {roomMessages.map(({ message, timestamp, user, userImage }) => (
          <Messages
            message={message}
            timestamp={timestamp}
            user={user}
            userImage={userImage}
          />
        ))}
      </div>
      <ChatInput channelName={roomDetails} channelId={roomId} />
    </div>
  );
}

export default Chat;
