import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./Form.css";
import { useState } from "react";
import { handleError, handleSuccess } from "../utils";
import { GoogleLogin } from "@react-oauth/google";

export default function Login_page() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  //for send the server side in the form of object
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyloginInfo = { ...loginInfo };
    copyloginInfo[name] = value;
    setLoginInfo(copyloginInfo);
  };

  //for client side validation
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("email and password are required");
    }
    try {
      const url = " http://localhost:8080/api/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success, message, jwttoken, name, errors } = result;
      //server side response message
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwttoken);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (errors) {
        console.log(result.errors[0].msg);
        const errorMsg = result.errors[0].msg;
        handleError(errorMsg);
      } else if (!success) {
        handleError(message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="container">
      <h1>Login Here</h1>

      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange} //onChange used for the track value of input
            value={loginInfo.email}
            type="email"
            name="email"
            placeholder="enter your email.."
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange} //onChange used for the track value of input
            value={loginInfo.password}
            type="password"
            name="password"
            placeholder="enter your password.."
          />
        </div>
        <button className="loginBtn">Login</button>

        <span>
          {" "}
          Does't have an account ? <Link to="/signup">Signup</Link>
        </span>
      </form>

      <ToastContainer />
    </div>
  );
}
