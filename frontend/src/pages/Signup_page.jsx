import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./Form.css";
import { useState } from "react";

import { handleError, handleSuccess } from "../utils";

export default function Login_page() {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  //for send the server side in the form of object

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copysignInfo = { ...signupInfo };
    copysignInfo[name] = value;
    setSignupInfo(copysignInfo);
  };

  //for client side validation
  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;

    if (!name || !email || !password) {
      return handleError("name ,email and password are required");
    }
    try {
      const url = "http://localhost:8080/api/auth/createUser";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      const { success, message, errors } = result;
      console.log(result);
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (errors) {
        const details = result.errors[0].msg;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="container bgColor">
      <h1>SingUp Here</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            onChange={handleChange} //onChange used for the track every value of input
            value={signupInfo.name}
            type="text"
            name="name"
            placeholder="enter your name.."
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange} //onChange used for the track every value of input
            value={signupInfo.email}
            type="email"
            name="email"
            placeholder="enter your email.."
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange} //onChange used for the track every value of input
            value={signupInfo.password}
            type="password"
            name="password"
            placeholder="enter your password.."
          />
        </div>
        <button className="loginBtn">Signup</button>
        <span>
          {" "}
          Already have an account ? <Link to="/login">Login</Link>
        </span>
      </form>

      <ToastContainer />
    </div>
  );
}
