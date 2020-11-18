import React from "react";
import "../css/SidebarOption.css";
import { useHistory } from "react-router-dom";
import db from "../firebase";

function SidebarOption({ Icon, id, title, addChannelOption }) {
  const history = useHistory();

  const selectChannel = () => {
    if (id) {
      history.push(`/room/${id}`);
    } else {
      history.push(title);
    }
  };

  const addChannel = () => {
    const channelName = prompt("Please Enter Channel Name");
    if (channelName) {
      db.collection("rooms").add({
        name: channelName,
      });
    }
  };
  return (
    <div
      className='sidebarOption'
      onClick={addChannelOption ? addChannel : selectChannel}>
      {Icon && <Icon className='sidebarOption__icon' />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <h3 className='sidebarOption__Channel'>
          <span className='sidebarOption__hash'>#</span>
          {title}
        </h3>
      )}
    </div>
  );
}

export default SidebarOption;
