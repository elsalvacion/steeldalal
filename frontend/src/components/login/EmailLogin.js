import React, { useState } from "react";
import "./EmailLogin.css";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../../actions/authAction";
import { Button } from "@mui/material";
// import {Close, Check} from '@mui/icons-material'
const EmailLogin = ({ text }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPass, setShowPass] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text === "login") {
      dispatch(
        loginUser({
          email,
          password,
        })
      );
    } else {
      dispatch(
        registerUser({
          email,
          password,
          name,
        })
      );
    }
  };
  return (
    <form onSubmit={handleSubmit} className="loginContentLeft">
      {text === "register" && (
        <>
          <label htmlFor="name">Name</label>
          <input
            values={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            type="text"
            placeholder="Enter name"
          />
        </>
      )}
      <label htmlFor="email">Email</label>
      <input
        values={email}
        onChange={(e) => setEmail(e.target.value)}
        id="email"
        type="email"
        placeholder="Enter email"
      />
      {text === "register" && (
        <>
          <small>Use valid business or personal email</small>
          <br />
        </>
      )}
      <label htmlFor="password">Password</label>
      <input
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type={showPass ? "text" : "password"}
        placeholder="Enter password"
      />
      <div className="showPassword">
        <input
          onChange={() => setShowPass(!showPass)}
          type="checkbox"
          id="showPassword"
        />
        <label htmlFor="showPassword">Show Password</label>
      </div>
      {/* password check */}
      {/* {
          text === 'register' && <ul className="passwordPass">
            <p>Password must: </p>
            <li className={passwordPass.isLengthy ? 'success' : null}>{passwordPass.isLengthy ? <Check /> : <Close />} Be atleast 8 characters</li>
            <li className={passwordPass.isUppercase ? 'success' : null}>{passwordPass.isUppercase ? <Check /> : <Close />} Contain atleast an uppercase letter</li>
            <li className={passwordPass.isLowercase ? 'success' : null}>{passwordPass.isLowercase ? <Check /> : <Close />} Contain atleast a lowercase letter</li>
            <li className={passwordPass.isNumber ? 'success' : null}>{passwordPass.isNumber ? <Check /> : <Close />} Contain a number</li>
            <li className={passwordPass.isSpecialCharacter ? 'success' : null}>{passwordPass.isSpecialCharacter ? <Check /> : <Close />} Contain atleast a special character: @#!..</li>
          </ul>
        } */}

      <Button
        color="primary"
        variant="contained"
        className="loginSubmitBtn"
        type="submit"
      >
        {text}
      </Button>
    </form>
  );
};

export default EmailLogin;
