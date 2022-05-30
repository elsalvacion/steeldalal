import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ProfileDetailContainer.css";
import ProfileDetailLeft from "./ProfileDetailLeft";
import ProfileDetailRight from "./ProfileDetailRight";
import CustomAlert from "../layout/CustomAlert";
import { YOUR_PRODUCT_RESET } from "../../reducers/types/productTypes";

const ProfileDetailContainer = ({ userInfo }) => {
  const { error } = useSelector((state) => state.yourProduct);
  const dispatch = useDispatch();
  return (
    <div>
      {error && (
        <CustomAlert
          type="error"
          text={error}
          handleClose={() => dispatch({ type: YOUR_PRODUCT_RESET })}
        />
      )}
      <div className="profileDetailContainer">
        <div className="profileDetailLeft">
          <ProfileDetailLeft userInfo={userInfo} />
        </div>
        <div className="profileDetailRight">
          <ProfileDetailRight />
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailContainer;
