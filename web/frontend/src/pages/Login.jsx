import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  loginUser
} from "../services/auth.service";

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const data = await loginUser(formData);

      console.log(data);

      localStorage.setItem(
        "token",
        data.token
      );

      alert("Login successful");

      navigate('/dashboard');

    } catch (error) {

      console.log(error);

      alert("Login failed");
    }
  };

  return (
    <div>

      <h1>Login</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={handleChange}
        />

        <br />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          onChange={handleChange}
        />

        <br />

        <button type="submit">
          Login
        </button>

      </form>

    </div>
  );
};

export default Login;