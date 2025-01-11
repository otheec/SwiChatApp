import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const Login: React.FC = () => {
  const { setUser } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); // Mock field
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/users/username", JSON.stringify(username), {
        headers: { "Content-Type": "application/json" },
      });
      setUser(response.data); // Set the user in the global context
    } catch (err) {
      setError("Invalid login attempt");
      console.error(err);
    }
  };

  return (
    <div
      className="p-4 rounded shadow-lg d-flex flex-column justify-content-center align-items-center mx-auto border bg-white"
      style={{ maxWidth: "400px", width: "100%" }}
    >
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleLogin} style={{ width: "100%" }}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=""
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
      {error && <div className="alert alert-danger mt-3 w-100">{error}</div>}
    </div>
  );
};

export default Login;
