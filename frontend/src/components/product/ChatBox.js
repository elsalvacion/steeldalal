import React, { useEffect, useState } from "react";
import "./ChatBox.css";
import { Button, IconButton, Typography } from "@mui/material";
import { Send } from "@mui/icons-material";
import { Zoom } from "react-reveal";
import { socket } from "../../utils/connectSocket";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
const ChatBox = ({ product, to }) => {
  const history = useHistory();
  const { userInfo } = useSelector((state) => state.userLogin);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  useEffect(() => {
    if (userInfo) {
      socket.emit("load_messages", { to, product, from: userInfo.id });
      socket.on("messages_loaded", (messages) => {
        setChatMessages(messages);
      });
    }
  }, [product, to, userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message !== "") {
      socket.emit("send_message", {
        message,
        product,
        from: userInfo.id,
        to,
      });
      setMessage("");
    }
  };
  return (
    <Zoom>
      <div className="ChatBoxContainer">
        {userInfo ? (
          userInfo.id === to ? (
            <div className="ChatBoxNotLoggedIn">
              <div className="ChatBoxNotLoggedInContent">
                <Typography>You cannot make a deal to yourself. </Typography>
                <br />
                <Typography>😂😂😂 Wait for buyers</Typography>
              </div>
            </div>
          ) : (
            <div className="ChatBoxContentContainer">
              <div className="ChatBoxChatsContainer">
                {chatMessages.map((chatMessage) => (
                  <div
                    className={`chatMessage ${
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
          )
        ) : (
          <div className="ChatBoxNotLoggedIn">
            <div className="ChatBoxNotLoggedInContent">
              <Typography fontSize={14}>You are not logged in</Typography>
              <br />
              <Button
                onClick={() =>
                  history.push(`/login?redirect=product/${product}`)
                }
                color="primary"
                variant="contained"
              >
                Login or Register
              </Button>
            </div>
          </div>
        )}
      </div>
    </Zoom>
  );
};

export default ChatBox;
