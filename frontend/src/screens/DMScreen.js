import { Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import DmContent from "../components/dm/DmContent";
import { socket } from "../utils/connectSocket";

const DMScreen = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!userInfo) {
      history.push(`/login?redirect=dm`);
    } else {
      socket.emit("load_users", userInfo.id);
      socket.on("users_loaded", (loaded_users) => {
        setUsers(loaded_users.users);
        setMessages(loaded_users.messages);
      });
    }
  }, [userInfo, history]);
  return (
    <Container>
      <Typography
        sx={{
          mt: 2,
        }}
        variant="h6"
      >
        Your DM
      </Typography>
      <DmContent users={users} messages={messages} userInfo={userInfo} />
    </Container>
  );
};

export default DMScreen;
