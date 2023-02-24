import React, { useState } from "react";
import "./loginform.css";
const LoginForm = () => {
  const [popupStyle, showPopup] = useState("hide");

  const popup = () => {
    showPopup("login-popup");
    setTimeout(() => showPopup("hide"), 5000);
  };
  return (
    <div className='cover'>
      <div className='alt-login'>
        <div className='icon'></div>
      </div>
      <h1 className='textLogin'>Welcome back!</h1>
      <input type='text' placeholder='Username.....' />
      <input type='password' placeholder='Password.....' />

      <div className='login-btn' onClick={popup}>
        Login
      </div>
      <p className='back'>Back to home</p>

      <div className={popupStyle}>
        <h3>Login unsuccessfully!</h3>
        <p>The inputed username or password is incorrect</p>
      </div>
    </div>
  );
};
export default LoginForm;
