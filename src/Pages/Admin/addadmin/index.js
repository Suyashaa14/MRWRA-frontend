import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Link,
  Snackbar,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import NavBar from "../../Components/NavBar";
import Footer from "../../Components/Footer";

const AddAdmin = () => {
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
      setError("Signup failed. Please try again.");
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <NavBar />
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
          Add Admin
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            InputLabelProps={{ style: { color: "#fff" } }}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            InputLabelProps={{ style: { color: "#fff" } }}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
            InputLabelProps={{ style: { color: "#fff" } }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "20px" }}
          >
            Add Admin
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
            severity={error ? "error" : "success"}
          >
            {snackbarMessage || error}
          </MuiAlert>
        </Snackbar>
      </Container>
      <Footer />
    </>
  );
};

export default AddAdmin;
