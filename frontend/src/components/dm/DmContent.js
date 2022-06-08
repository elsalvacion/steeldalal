import { Person, Send } from "@mui/icons-material";
import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { socket } from "../../utils/connectSocket";
import "./DmContent.css";

const DmContent = ({ users, messages, userInfo }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message !== "") {
      socket.emit("send_message", {
        message,
        product: messages[0].product,
        from: userInfo.id,
        to: messages[0].from_who,
      });
      setMessage("");
    }
  };
  return (
    <div className="DmContentContainer">
      <div className="DmContentLeft">
        <List>
          {users.map((user) => (
            <ListItem
              button
              sx={{
                color: "#f3f3f3",
                mb: 2,
              }}
              key={user.from_who}
            >
              <ListItemIcon
                sx={{
                  color: "#f3f3f3",
                }}
              >
                <Person />
              </ListItemIcon>
              <ListItemText>{user.name}</ListItemText>
            </ListItem>
          ))}
        </List>
      </div>
      <div className="DmContentRight">
        {/* <Typography variant="h6">{users && users[0].name}</Typography> */}
        <div className="DmContentRighChatMessagesContainer">
          {messages.map((chatMessage) => (
            <div
              key={chatMessage.id}
              className={`DmContentChatMessage ${
                chatMessage.from_who === userInfo.id ? "right" : "left"
              } `}
            >
              {chatMessage.message}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="ChatBoxMarkdownArea">
          <input
            value={message}
            type="text"
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type here..."
          ></input>
          <IconButton type="submit" color="default">
            <Send />
          </IconButton>
        </form>
      </div>
    </div>
  );
};

export default DmContent;
