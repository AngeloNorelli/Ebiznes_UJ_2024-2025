import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        onLogin?.(data.token);
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Network error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
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
      <button type="submit">Log in</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
}

Login.propTypes = {
  onLogin: PropTypes.func,
};

export default Login;
