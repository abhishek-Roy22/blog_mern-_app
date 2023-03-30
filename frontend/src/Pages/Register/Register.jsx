import React, { useState } from "react";
import "./Register.scss";
import { useSignup } from "../../hooks/useSignup";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoading, error } = useSignup();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(name, email, password);
    navigate("/");
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <label>UserName:</label>
        <input
          type="text"
          placeholder="username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Email:</label>
        <input
          type="email"
          placeholder="abhi@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={isLoading}>
          SignUp
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Register;
