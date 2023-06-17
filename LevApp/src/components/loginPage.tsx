import React, { useState } from "react";
import "./LoginPage.css";
import MultistepForm from "./multistepForm.tsx";

import { useNavigate } from "react-router-dom";


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [authToken, setAuthToken] = useState(""); // State to store the authentication token
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const API_ENDPOINT =
    "https://x8ki-letl-twmt.n7.xano.io/api:XooRuQbs/auth/login";

  const handleLogin = async () => {
    // Email validation regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setLoginError("Invalid email format");
      return;
    }
    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        body: JSON.stringify({ email, password }), // Include the password from the state
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        // Login successful
        const data = await response.json();
        setAuthToken(data.authToken); // Store the authentication token
        setLoginError("");
        alert("Login successful"); // Display success message
        navigate("/multistep-form"); // Navigate to the MultistepFormPage
        // Redirect or perform other actions
      } else {
        // Login failed
        const data = await response.json();
        setLoginError(data.error);
        alert("Login failed. Please check your credentials."); // Display failure message
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("An error occurred during login.");
      alert("An error occurred during login."); // Display error messa
    }
  };

return (
  <div className="login-container">
    <h2>Login Page</h2>
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Enter your email"
      className="login-input"
    />
    <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Enter your password"
      className="login-input"
    />
    <button onClick={handleLogin} className="login-button">
      Login
    </button>
    {loginError && <p className="login-error">{loginError}</p>}
    {authToken && (
      <p className="login-success">Authentication Token: {authToken}</p>
    )}
    {isAuthenticated && <MultistepForm/>}
  </div>
);

};

export default LoginPage;
