import React from "react";
import Avatar from "react-avatar";
function Client(props) {
  return (
    <div className="client">
      <div className="avatar">
        <Avatar name={props.username} size={50} round="14px" />
      </div>
      <span className="userName">{props.username}</span>
    </div>
  );
}

export default Client;
