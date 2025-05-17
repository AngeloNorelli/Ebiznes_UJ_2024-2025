import React, { useState } from "react";
import PropTypes from "prop-types";

function Register({ onRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleRepeatPasswordChange = (e) => setRepeatPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        setSuccess("Registration successful! You can now log in.");
        onRegister?.();
      } else {
        const data = await res.json();
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("Network error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={handleUsernameChange}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
        required
      />
      <input
        type="password"
        placeholder="Repeat password"
        value={repeatPassword}
        onChange={handleRepeatPasswordChange}
        required
      />
      <button type="submit">Register</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {success && <div style={{ color: "green", wordBreak: "break-word" }}>{success}</div>}
    </form>
  );
}

Register.propTypes = {
  onRegister: PropTypes.func,
};

export default Register;
