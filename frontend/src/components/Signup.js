import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // For redirection
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", { username, password });
      alert(response.data.message);
      //setMessage("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
        if (err.response && err.response.status === 400) {
          // User already exists, redirect to login
          alert("User already exists. Redirecting to login...");
          navigate("/login");
        } else {
          setMessage(err.response?.data?.message || "Signup failed. Please try again.");
        }
      }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Sign Up</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Signup;
