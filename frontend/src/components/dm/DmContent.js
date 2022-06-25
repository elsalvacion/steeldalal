import { Circle, Send } from "@mui/icons-material";
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { grey, red } from "@mui/material/colors";
import React, { useEffect, useRef, useState } from "react";
import { socket } from "../../utils/connectSocket";
import CustomHelmet from "../layout/CustomHelmet";
import "./DmContent.css";
const DmContent = ({ userInfo }) => {
  const [message, setMessage] = useState("");
  const fixedSenders = useRef([]);
  const [renderSenders, setRenderSenders] = useState([]);
  const chatContainer = useRef();
  const chatItem = useRef();
  const currentUser = useRef(0);
  const [renderMessages, setRenderMessages] = useState([]);
  const fixedMessages = useRef([]);
  const [noUnRead, setNoUnRead] = useState(0);
  // const [newMessages, setNewMessages] = useState([]);
  useEffect(() => {
    socket.emit("join_room", userInfo.id);
    socket.emit("load_unread_messages", userInfo.id);
    socket.on("message_marked_as_read", () =>
      socket.emit("load_unread_messages", userInfo.id)
    );
    socket.on("unread_messages_loaded", (res) => {
      if (res.userId === userInfo.id) {
        setNoUnRead(res.unread);
      }
    });
    socket.on("new_user_connected", () =>
      socket.emit("load_senders", userInfo.id)
    );
    socket.on("bye", () => socket.emit("load_senders", userInfo.id));
    socket.emit("load_senders", userInfo.id);
    socket.on("senders_loaded", (users) => {
      fixedSenders.current = users;
      setRenderSenders(users);
      if (users.length > 0) {
        socket.emit("load_messages", {
          to: userInfo.id,
          // product: users[currentUser.current].product,
          from: users[currentUser.current].id,
        });
      }
    });

    socket.on("messages_loaded", (messages) => {
      socket.emit("mark_as_read", {
        to: userInfo.id,
        from: fixedSenders.current[currentUser.current].id,
      });
      const chatsBox = document.querySelector(
        ".DmContentRighChatMessagesContainer"
      );
      fixedMessages.current = messages;
      setRenderMessages(messages);
      if (chatsBox) {
        chatsBox.scrollTop = chatsBox.scrollHeight;
      }
    });
    socket.on("message_sent", () => {
      socket.emit("load_senders", userInfo.id);
      socket.emit("load_messages", {
        to: userInfo.id,
        // product: fixedSenders.current[currentUser.current].product,
        from: fixedSenders.current[currentUser.current].id,
      });
    });
    // eslint-disable-next-line
  }, [userInfo]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message !== "") {
      socket.emit("mark_as_read", {
        to: userInfo.id,
        from: fixedSenders.current[currentUser.current].id,
      });
      socket.emit("send_message", {
        message,
        product: fixedSenders.current[currentUser.current].product.id,
        from: userInfo.id,
        to: fixedSenders.current[currentUser.current].id,
      });
      setMessage("");
    }
  };
  const handleUserChange = (sender) => {
    socket.emit("load_messages", {
      // product: fixedSenders.current[sender].product,
      from: userInfo.id,
      to: fixedSenders.current[sender].id,
    });
    socket.emit("mark_as_read", {
      to: userInfo.id,
      from: fixedSenders.current[sender].id,
    });
    socket.emit("load_senders", userInfo.id);

    currentUser.current = sender;
  };
  const onScroll = () => {
    // if (
    //   chatContainer.current.scrollTop >=
    //   chatItem.current.getBoundingClientRect().top
    // )
  };
  return renderSenders.length === 0 ? (
    <div>
      <br />
      <br />
      <Typography>No Message in your DM</Typography>
    </div>
  ) : (
    <div className="DmContentContainer">
      <CustomHelmet
        title={noUnRead !== 0 ? `(${noUnRead}) messages` : "Direct Messages"}
        desc="Our real-time direct messaging system between sellers and buyers is just amazing. You should chek it out "
      />
      <div className="DmContentLeft">
        <List>
          {renderSenders.map((sender, i) => (
            <ListItem
              button
              onClick={() => handleUserChange(i)}
              sx={{
                m: 0,
                p: 1,
                background:
                  i === currentUser.current ? "#eeeeee" : "transparent",
                color: "#212121",
              }}
              key={sender.id}
            >
              <ListItemIcon>
                <Circle color={sender.online ? "success" : "disabled"} />
              </ListItemIcon>
              <ListItemText>
                <b>{sender.name}</b>
                <br />
                <p>{sender.message}</p>
              </ListItemText>
              {sender.unread !== 0 && (
                <ListItemIcon>
                  <Avatar
                    sx={{
                      bgcolor: red[800],
                      width: 24,
                      height: 24,
                      color: grey[50],
                      fontSize: 16,
                    }}
                  >
                    {sender.unread}
                  </Avatar>
                </ListItemIcon>
              )}
            </ListItem>
          ))}
        </List>
      </div>
      <div className="DmContentRight">
        <div className="DmContentRightProduct">
          <img
            src={fixedSenders.current[currentUser.current].product.image}
            alt="steeldalal.com"
          />
          <Typography>
            {fixedSenders.current[currentUser.current].product.title}
          </Typography>
        </div>
        <div
          className="DmContentRighChatMessagesContainer"
          onScroll={onScroll}
          ref={chatContainer}
        >
          {renderMessages.map((chatMessage) => (
            <div
              key={chatMessage.id}
              className={`DmContentChatMessage ${
                chatMessage.from_who === userInfo.id ? "right" : "left"
              } `}
              ref={chatItem}
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
