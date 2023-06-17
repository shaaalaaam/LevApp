import React, { useState } from "react";
import "./ForgotPasswordPage.css";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [resetPasswordError, setResetPasswordError] = useState("");
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState(false);

  const API_ENDPOINT =
    "https://x8ki-letl-twmt.n7.xano.io/api:XooRuQbs/auth/login";

  const handleResetPassword = async () => {
    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setResetPasswordError("");
        setResetPasswordSuccess(true);
      } else {
        const data = await response.json();
        setResetPasswordError(data.error);
        setResetPasswordSuccess(false);
      }
    } catch (error) {
      console.error("Password reset error:", error);
      setResetPasswordError("An error occurred during password reset.");
      setResetPasswordSuccess(false);
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <h2 className="forgot-password-title">Forgot Password</h2>
        {resetPasswordSuccess ? (
          <p className="success-message">
            Password reset instructions have been sent to your email. Please
            check your inbox and follow the instructions to reset your password.
          </p>
        ) : (
          <>
            <p className="forgot-password-message">
              Enter your email to reset your password:
            </p>
            <input
              className="input-field"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            <button className="reset-button" onClick={handleResetPassword}>
              Reset Password
            </button>
            {resetPasswordError && (
              <p className="error-message">{resetPasswordError}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
