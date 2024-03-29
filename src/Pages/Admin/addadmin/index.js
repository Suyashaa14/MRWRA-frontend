import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Snackbar,
  CssBaseline,
  Paper,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import NavBar from "../../Components/NavBar";
import Footer from "../../Components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddAdmin = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
      const response = await axios.post("http://localhost:8005/auth/register", {
        firstName,
        lastName,
        email,
        password,
        role: "admin",
      });

      // Show success message and open success Snackbar
      setSnackbarMessage("Add Admin successful.");
      setOpenSnackbar(true);
    } catch (error) {
      // Handle signup failure and show error Snackbar
      setError("Add Admin failed. Please try again.");
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <NavBar />
      <CssBaseline />
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          marginTop: "5%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: "30px",
            textAlign: "center",
            background: "#fff", // Change the background color
            borderRadius: "15px", // Add rounded corners
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            gutterBottom
            style={{ color: "#333" }} // Change text color
          >
            Add Admin
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="First Name"
              variant="outlined"
              margin="normal"
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <TextField
              label="Last Name"
              variant="outlined"
              margin="normal"
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <TextField
              label="Email"
              variant="outlined"
              margin="normal"
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              variant="outlined"
              margin="normal"
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              style={{ marginTop: "20px", backgroundColor: "#ff1744" }} // Change the button color
            >
              Add Admin
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
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <MuiAlert
              onClose={handleSnackbarClose}
              severity={error ? "error" : "success"}
              sx={{ width: "100%" }}
            >
              {snackbarMessage || error}
            </MuiAlert>
          </Snackbar>
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default AddAdmin;
