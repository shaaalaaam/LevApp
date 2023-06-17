import React, { useState } from "react";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [authToken, setAuthToken] = useState(""); // State to store the authentication token

  const API_ENDPOINT =
    "https://x8ki-letl-twmt.n7.xano.io/api:XooRuQbs/auth/login";

  const handleLogin = async () => {
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
      alert("An error occurred during login."); // Display error message
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
    </div>
  );
};

export default LoginPage;
