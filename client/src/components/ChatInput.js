import React, { useState } from "react";
import { useStateValue } from "../context/StateProvider";
import "../css/ChatInput.css";
import db from "../firebase";
import firebase from "firebase";

function ChatInput({ channelName, channelId }) {
  const [input, setInput] = useState("");
  const [{ user }] = useStateValue();

  const sendMessage = (e) => {
    e.preventDefault();
    if (channelId) {
      db.collection("rooms").doc(channelId).collection("messages").add({
        message: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        userImage: user.photoURL,
        user: user.displayName,
      });
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
