import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  CssBaseline,
  Checkbox,
  FormControlLabel,
  Paper,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from "axios";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8005/auth/login", {
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem("token", token);
      handleSnackbarOpen();
      setTimeout(() => {
        navigate("/home");
      }, 500);
    } catch (error) {
      setError("Invalid Credentials. Please try again.");
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
          Login Successful!
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
              Sign in
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
              />
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                InputProps={{
                  style: { color: "#333" },
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
              <Link
                to="/forgotPassword"
                style={{ marginTop: "10px", color: "#333", textAlign: "left" }}
              >
                Forgot Password?
              </Link>

              <Button
                type="submit"
                variant="contained"
                color="error"
                fullWidth
                style={{ marginTop: "20px" }}
              >
                Sign In
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
              Don't have an account?{" "}
              <Link to="/" style={{ color: "#2196f3" }}>
                Sign up
              </Link>
            </Typography>
          </Paper>
        </Container>
      </div>
    </>
  );
};

export default LoginForm;
