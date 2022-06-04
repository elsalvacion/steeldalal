import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const ChecoutScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userInfo } = useSelector((state) => state.userLogin);
  useEffect(() => {
    if (!userInfo) {
      history("/login?redirect=checkout");
    }
  }, [userInfo]);
  return <div>ChecoutScreen</div>;
};

export default ChecoutScreen;
