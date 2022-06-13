import React, { useEffect, useState } from "react";
import "./ChatBox.css";
import { Button, IconButton, Typography } from "@mui/material";
import { Send, Circle } from "@mui/icons-material";
import { Zoom } from "react-reveal";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { socket } from "../../utils/connectSocket";
const ChatBox = ({ product, to }) => {
  const history = useHistory();
  const { userInfo } = useSelector((state) => state.userLogin);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [isOnline, setIsOnline] = useState(false);
  useEffect(() => {
    if (userInfo) {
      socket.emit("join_room", userInfo.id);

      socket.emit("check_if_online", to);

      socket.on("new_user_connected", () => socket.emit("check_if_online", to));

      socket.on("bye", () => socket.emit("check_if_online", to));

      socket.on("is_online", (connected) => {
        if (connected > 0) setIsOnline(true);
        else setIsOnline(false);
      });

      socket.emit("load_messages", {
        to,
        product,
        from: userInfo.id,
      });

      socket.on("messages_loaded", (messages) => {
        setChatMessages(messages);
        const chatsBox = document.querySelector(".ChatBoxChatsContainer");
        if (chatsBox) {
          chatsBox.scrollTop = chatsBox.scrollHeight;
        }
      });

      socket.on("message_sent", () => {
        socket.emit("load_messages", { to, product, from: userInfo.id });
      });
    }
    // eslint-disable-next-line
  }, [userInfo]);

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
              <div className="ChatBoxContentChatHeader">
                <div className={isOnline ? "online" : "offline"}>
                  <Circle />
                  <Typography fontSize={12} sx={{ ml: 1 }}>
                    Seller {isOnline ? "Online" : "Offline"}
                  </Typography>
                </div>
              </div>
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
              <Typography fontSize={14}>
                You have to loggin to chat with sellers
              </Typography>
              <br />
              <Button
                onClick={() =>
                  history.push(`/login?redirect=product/${product}`)
                }
                color="primary"
                variant="contained"
                sx={{
                  mx: "auto",
                  width: "fit-content",
                  display: "block",
                }}
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
