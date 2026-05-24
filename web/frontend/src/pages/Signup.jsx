import { useState } from "react";

import {
  signupUser
} from "../services/auth.service";

const Signup = () => {

  const [formData, setFormData] = useState({
    name: "",
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

      const data = await signupUser(formData);

      console.log(data);

      alert("Signup successful");

    } catch (error) {

      console.log(error);

      alert("Signup failed");
    }
  };

  return (
    <div>

      <h1>Signup</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Enter name"
          onChange={handleChange}
        />

        <br />

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
          Signup
        </button>

      </form>

    </div>
  );
};

export default Signup;