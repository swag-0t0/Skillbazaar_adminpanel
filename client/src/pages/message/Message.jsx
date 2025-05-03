import React, { useState } from "react";
import "./Message.scss";
import { demoMessages } from "../../data";
import SendIcon from "@mui/icons-material/Send";

const Message = () => {
  const [replies, setReplies] = useState({});

  const handleReplyChange = (id, value) => {
    setReplies((prev) => ({ ...prev, [id]: value }));
  };

  const handleReplySubmit = (id) => {
    alert(`Reply to user ${id}: ${replies[id]}`);
    setReplies((prev) => ({ ...prev, [id]: "" }));
  };

  return (
    <div className="message">
      <h2>User Messages</h2>
      {demoMessages.map((msg) => (
        <div className="messageCard" key={msg.id}>
          <div className="userInfo">
            <img src={msg.avatar} alt="" className="userAvatar" />
            <div className="userDetails">
              <h4>{msg.name}</h4>
              <p>{msg.email}</p>
            </div>
          </div>
          <p className="messageContent">{msg.message}</p>
          <div className="replySection">
            <input
              type="text"
              placeholder="Write a reply..."
              value={replies[msg.id] || ""}
              onChange={(e) => handleReplyChange(msg.id, e.target.value)}
            />{" "}
            <button
              onClick={() => handleReplySubmit(msg.id)}
              className="replyBtn"
            >
              <SendIcon />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Message;
