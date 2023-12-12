import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Container,
  CssBaseline,
  Paper,
  Box,
  Link,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8005/auth/password-reset", {
        email,
      });
      setResetSent(true);
    } catch (error) {
      console.error("Forgot password request failed:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "#f5f5f5", // Set the background color to match the Login page
      }}
    >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper
          elevation={3}
          sx={{
            padding: "30px",
            textAlign: "center",
            background: "#fff",
            borderRadius: "15px",
            marginTop: "8%",
          }}
        >
          <Typography component="h1" variant="h5" style={{ color: "#333" }}>
            Forgot Password
          </Typography>
          {!resetSent ? (
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
                InputProps={{ style: { color: "#333" } }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="error"
                sx={{ mt: 3 }}
              >
                Send Password Reset Email
              </Button>
              {error && (
                <Typography
                  variant="body2"
                  color="error"
                  style={{ marginTop: "10px", color: "#ff1744" }}
                >
                  {error}
                </Typography>
              )}
            </Box>
          ) : (
            <MuiAlert
              elevation={6}
              variant="filled"
              severity="success"
              sx={{ mt: 2 }}
            >
              Please check your email for password reset instructions.
            </MuiAlert>
          )}
          <Typography style={{ marginTop: "10px", color: "#333" }}>
            Remember your password?{" "}
            <Link to="/login" style={{ color: "#2196f3" }}>
              Sign in
            </Link>
          </Typography>
        </Paper>
      </Container>
    </div>
  );
}

export default ForgotPassword;
