import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8005/auth/login", {
        email,
        password,
        role: "user",
      });

      const { token } = response.data;
      localStorage.setItem("token", token);

      // Set success message for Snackbar
      setSnackbarMessage("Login successful");
      setOpenSnackbar(true);

      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (error) {
      setError("Invalid Credentials. Please try again.");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        backgroundColor: "#1a1a1a",
        color: "#fff",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          color="primary"
          InputLabelProps={{ style: { color: "#fff" } }}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          color="primary"
          InputLabelProps={{ style: { color: "#fff" } }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          style={{ marginTop: "20px" }}
        >
          Login
        </Button>
        {error && (
          <Typography
            variant="body2"
            color="error"
            style={{ marginTop: "10px" }}
          >
            {error}
          </Typography>
        )}
      </form>
      {/* Snackbar for success message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity="success"
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default LoginForm;
