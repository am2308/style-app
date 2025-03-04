import React, { useState } from "react";
import { login } from "../api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // For redirection

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (!username || !password) {
      alert("Please fill in both username and password.");
      return;
    }

    try {
      console.log("Login Window:", { username, password });
      const response = await login(username, password);
      console.log("Login successful:", response.data);

      // Handle success (e.g., store token, redirect, show a message)
      // Check if response contains a token
      if (response.data && response.data.token) {
        // Login successful, handle the response accordingly
        console.log("Login successful:", response.data);
        alert("Login successful!");
        navigate("/");
        localStorage.setItem("authToken", response.data.token); // Store token in localStorage or context
        // Redirect to another page or dashboard if necessary
        // e.g., history.push("/dashboard"); (if you're using react-router)
      } else {
        // If no token or unexpected data, show an error
        console.log("Login failed:", response.data);
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.log("Login failed:", error.response?.data || error.message);
      console.error("Login failed:", error.response?.data || error.message);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-page" style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: "40px", marginTop: "30px" }}>
        {/* Fashion Images */}
        <div className="fashion-images" style={{ width: "50%" }}>
          <img
            src="/assets/fashion-1.jpg"
            alt="Fashion Trend 1"
            style={{ width: "100%", borderRadius: "8px", marginBottom: "20px" }}
          />
          <img
            src="/assets/fashion-2.jpg"
            alt="Fashion Trend 2"
            style={{ width: "100%", borderRadius: "8px", marginBottom: "20px" }}
          />
          <img
            src="/assets/fashion-3.jpg"
            alt="Fashion Trend 3"
            style={{ width: "100%", borderRadius: "8px" }}
          />
        </div>

        {/* Login Form */}
        <div className="login-form" style={{ width: "30%", textAlign: "left" }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "20px" }}>
              <label>Username:</label>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  marginTop: "5px",
                }}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label>Password:</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  marginTop: "5px",
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "#007BFF",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
