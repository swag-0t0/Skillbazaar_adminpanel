import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

const Login = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      formData.email === "admin@example.com" &&
      formData.password === "123456"
    ) {
      setIsAuthenticated(true);
      navigate("/");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="loginPage">
      <div className="loginLeft">
        <div className="loginCard">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button type="submit">Login</button>
          </form>
        </div>
      </div>

      <div className="loginRight">
        <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c" alt="" />
      </div>
    </div>
  );
};

export default Login;
