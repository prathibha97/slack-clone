import React, { useState } from "react";
import { useStateValue } from "../context/StateProvider";
import "../css/ChatInput.css";
import db from "../firebase";
import firebase from "firebase";
import axios from '../axios'

function ChatInput({ channelName, channelId }) {
  const [input, setInput] = useState("");
  const [{ user }] = useStateValue();

  const sendMessage = (e) => {
    e.preventDefault();
    if (channelId) {
      axios.post(`/new/message?id=${channelId}`, {
        message: input,
        timestamp: Date.now(),
        user: user.displayName,
        userImage: user.photoURL
      })

    }
    setInput("");
  };
  return (
    <div className='chatInput'>
      <form onSubmit={sendMessage}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type='text'
          placeholder={`Message #${channelName?.toLowerCase()}`}
        />
        <button onClick={sendMessage}>Send</button>
      </form>
    </div>
  );
}

export default ChatInput;
