import React, { useEffect } from "react";
import PanelContainer from "../components/admin/PanelContainer";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  UPDATE_ADMIN_ORDER_RESET,
  UPDATE_ADMIN_PRODUCT_RESET,
  UPDATE_ADMIN_USER_RESET,
} from "../reducers/types/adminTypes";
const AdminPanelScreen = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!userInfo || userInfo.isAdmin !== 1) history.push(`/login`);
    dispatch({
      type: UPDATE_ADMIN_USER_RESET,
    });
    dispatch({
      type: UPDATE_ADMIN_ORDER_RESET,
    });
    dispatch({
      type: UPDATE_ADMIN_PRODUCT_RESET,
    });
  }, [userInfo, history, dispatch]);
  return <PanelContainer />;
};

export default AdminPanelScreen;
