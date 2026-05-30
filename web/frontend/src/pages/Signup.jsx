import { useState } from "react";
import { signupUser } from "../services/auth.service";
import { Link, useNavigate } from "react-router-dom";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button
} from "@mui/material";

const Signup = () => {
  const navigate = useNavigate();

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
      await signupUser(formData);
      alert("Signup successful");
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Signup failed");
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
          Create Account
        </Typography>

        <Typography
          color="text.secondary"
          mb={4}
        >
          Start tracking your job applications
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
            name="name"
            label="Full Name"
            fullWidth
            onChange={handleChange}
          />

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
              "&:hover": {
                bgcolor: "#222"
              },
              borderRadius: "12px"
            }}
          >
            Signup
          </Button>
        </Box>

        <Typography
          textAlign="center"
          mt={3}
          fontSize={14}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "black",
              fontWeight: 600,
              textDecoration: "none"
            }}
          >
            Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Signup;