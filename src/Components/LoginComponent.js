import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";

function LoginComponent() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Hardcoded credentials
    const adminCredentials = { username: "admin", password: "admin" };
    const userCredentials = { username: "user", password: "user" };

    if (
      username === adminCredentials.username &&
      password === adminCredentials.password
    ) {
      navigate("/create-questions");
    } else if (
      username === userCredentials.username &&
      password === userCredentials.password
    ) {
      navigate("/answer-questions");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "background.paper",
        p: 3,
        boxShadow: 3,
        borderRadius: 1,
        mx: "auto",
        maxWidth: 400,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleLogin} style={{ width: "100%" }}>
        <TextField
          variant="outlined"
          label="Username"
          type="text"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          variant="outlined"
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Box>
  );
}

export default LoginComponent;
