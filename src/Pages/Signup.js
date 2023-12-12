import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  CssBaseline,
  Paper,
  Grid,
  InputAdornment,
  IconButton,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
const Signup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true); // New state
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleSnackbarOpen = () => {
    setOpenSnackbar(true);
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPasswordValue = e.target.value;
    setConfirmPassword(confirmPasswordValue);

    // Check if passwords match
    setPasswordsMatch(password === confirmPasswordValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordsMatch) {
      setError("Passwords do not match. Please check again.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8005/auth/register", {
        firstName,
        lastName,
        email,
        password,
      });
      handleSnackbarOpen();
      // Clear form fields
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      // Handle signup failure and show error Snackbar
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          Signup Successful!
        </Alert>
      </Snackbar>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <Paper
            elevation={3}
            style={{
              padding: "30px",
              textAlign: "center",
              background: "#fff",
              borderRadius: "15px",
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              gutterBottom
              style={{ color: "#333" }}
            >
              Sign up
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Confirm Password"
                    variant="outlined"
                    fullWidth
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                    error={!passwordsMatch} // Highlight the field if passwords don't match
                    helperText={!passwordsMatch ? "Passwords do not match" : ""}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
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
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                color="error"
                fullWidth
                style={{ marginTop: "20px" }}
                disabled={!passwordsMatch} // Disable the button if passwords don't match
              >
                Sign up
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
            </form>
            <Typography style={{ marginTop: "10px", color: "#333" }}>
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#2196f3" }}>
                Sign in
              </Link>
            </Typography>
          </Paper>
        </Container>
      </div>
    </>
  );
};

export default Signup;
