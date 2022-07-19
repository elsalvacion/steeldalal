import React, { useEffect } from "react";
import PanelContainer from "../components/admin/PanelContainer";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
const AdminPanelScreen = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const history = useHistory();
  useEffect(() => {
    if (!userInfo || userInfo.isAdmin !== 1) history.push(`/login`);
  }, [userInfo, history]);
  return <PanelContainer />;
};

export default AdminPanelScreen;
