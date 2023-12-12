import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Snackbar,
  CssBaseline,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "confirmPassword" && value !== "") {
      // Check for password matching only when Confirm Password is typed
      setPasswordsMatch(value === formData.password);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error message

    try {
      if (!passwordsMatch) {
        throw new Error("Passwords do not match");
      }

      // Make an API request to reset the password
      await axios.post(`http://localhost:8005/auth/reset-password/${token}`, {
        password: formData.password,
      });

      // Display a success message or redirect to a login page
      alert("Password reset successfully");
      navigate("/login");
    } catch (error) {
      console.error("Reset Password failed:", error);
      setError(error.message || "Failed to reset password. Please try again.");
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
          <div>
            <Typography component="h1" variant="h5" style={{ color: "#333" }}>
              Reset Password
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                label="New Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                required
                InputProps={{
                  style: { color: "#333" },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword} edge="end">
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                InputProps={{
                  style: { color: "#333" },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleShowConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {!passwordsMatch && formData.confirmPassword !== "" && (
                <Typography
                  variant="body2"
                  color="error"
                  style={{ marginTop: "10px", color: "#ff1744" }}
                >
                  Passwords do not match.
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{ marginTop: "20px", backgroundColor: "#FF0000" }}
                disabled={!passwordsMatch}
              >
                Reset Password
              </Button>
            </form>
          </div>
          <Snackbar
            open={!!error}
            autoHideDuration={6000}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <MuiAlert
              onClose={() => setError("")}
              severity="error"
              sx={{ width: "100%" }}
            >
              {error}
            </MuiAlert>
          </Snackbar>
        </Paper>
      </Container>
    </div>
  );
}

export default ResetPassword;
