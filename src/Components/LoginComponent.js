// import React from "react";
// import { useNavigate } from "react-router-dom";

// import { Button, TextField, Typography, Box } from "@mui/material";

// function LoginComponent() {
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     navigate("/create-questions");
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         mt: 8,
//       }}
//     >
//       <Typography variant="h4" gutterBottom>
//         Login
//       </Typography>
//       <form onSubmit={handleLogin}>
//         <TextField
//           label="Username"
//           variant="outlined"
//           margin="normal"
//           sx={{ mb: 2 }}
//           //fullWidth
//           required
//         />
//         <TextField
//           label="Password"
//           type="password"
//           variant="outlined"
//           margin="normal"
//           fullWidth
//           required
//         />
//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           sx={{ mt: 2 }}
//         >
//           Login
//         </Button>
//       </form>
//     </Box>
//   );
// }

// export default LoginComponent;

import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";

function LoginComponent() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/create-questions");
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
        borderRadius: 0,
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
          type="email"
          fullWidth
          // margin="none"
          required
          // sx={{ mb: 2 }}
        />
        <TextField
          variant="outlined"
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          required
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Box>
  );
}

export default LoginComponent;
