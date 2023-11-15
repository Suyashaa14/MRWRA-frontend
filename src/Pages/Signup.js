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

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
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
        role,
      });

      // Show success message and open success Snackbar
      setSnackbarMessage("Signup successful.");
      setOpenSnackbar(true);
    } catch (error) {
      // Handle signup failure and show error Snackbar
      setError("Signup failed. Please try again.");
      setOpenSnackbar(true);
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
        Signup
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
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel id="role-label" style={{ color: "#fff" }}>
            Role
          </InputLabel>
          <Select
            labelId="role-label"
            label="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "20px" }}
        >
          Signup
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
      <Typography variant="body2" align="center" style={{ marginTop: "20px" }}>
        Already have an account?{" "}
        <Link component={RouterLink} to="/login" color="primary">
          Login here
        </Link>
      </Typography>
      {/* Snackbar for success and error messages */}
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
  );
};

export default Signup;
