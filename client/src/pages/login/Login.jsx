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
          <h2>Login Here!</h2>
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
        {/* <img src="https://img.freepik.com/free-vector/technology-wire-mesh-network-connection-digital-background_1017-28407.jpg?t=st=1746305614~exp=1746309214~hmac=d6e7371f3f253a0c4360cc9d73de3021d09bcbafea923ad78675ecbc63dd2ebf&w=1380" alt="" /> */}
      </div>
    </div>
  );
};

export default Login;
