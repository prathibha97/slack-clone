import { Avatar } from "@material-ui/core";
import { AccessTime, Help, Search } from "@material-ui/icons";
import React from "react";
import { useStateValue } from "../context/StateProvider";
import "../css/Header.css";

function Header() {
  const [{ user }] = useStateValue();
  return (
    <div className='header'>
      <div className='header__left'>
        {/* avatar fro logged in user */}
        <Avatar
          className='header__avatar'
          alt={user?.displayName}
          src={user?.photoURL}
        />
        {/* time icon */}
        <AccessTime />
      </div>
      <div className='header__search'>
        {/* search icon */}
        <Search />
        {/* input */}
        <input placeholder='Search Chat' type='text' />
      </div>
      <div className='header__right'>
        {/* help icon */}
        <Help />
      </div>
    </div>
  );
}

export default Header;
