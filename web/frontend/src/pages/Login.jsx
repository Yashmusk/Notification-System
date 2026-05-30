import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/auth.service";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button
} from "@mui/material";

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

      localStorage.setItem(
        "token",
        data.token
      );

      alert("Login successful");

      navigate("/dashboard");

    } catch (error) {
      console.log(error);
      alert("Login failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f5f5f5"
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: 420,
          p: 5,
          borderRadius: 4
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={1}
        >
          Welcome Back
        </Typography>

        <Typography
          color="text.secondary"
          mb={4}
        >
          Login to continue tracking your interviews
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2
          }}
        >
          <TextField
            name="email"
            label="Email"
            type="email"
            fullWidth
            onChange={handleChange}
          />

          <TextField
            name="password"
            label="Password"
            type="password"
            fullWidth
            onChange={handleChange}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              py: 1.5,
              bgcolor: "black",
              borderRadius: "12px",
              "&:hover": {
                bgcolor: "#222"
              }
            }}
          >
            Login
          </Button>
        </Box>

        <Typography
          textAlign="center"
          mt={3}
          fontSize={14}
        >
          Don’t have an account?{" "}
          <Link
            to="/signup"
            style={{
              color: "black",
              fontWeight: 600,
              textDecoration: "none"
            }}
          >
            Signup
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;