import React from "react";
import "../css/Messages.css";

function Messages({ message, timestamp, user, userImage }) {
  return (
    <div className='messages'>
      <img src={userImage} alt='' />
      <div className='messages__info'>
        <h4>
          {user}
          <span className='messages__timestamp'>{new Date(parseInt(timestamp)).toUTCString()}</span>
        </h4>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Messages;
