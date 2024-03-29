import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Snackbar,
  Alert,
  Container,
  CssBaseline,
} from "@mui/material";
import axios from "axios";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";

const MovieAddRequestPage = () => {
  const [movieData, setMovieData] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8005/movies/superadmin").then((response) => {
      setMovieData(response.data);
    });
  }, []);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleApproveReject = async (id, action) => {
    try {
      // Update the backend with the approval/rejection status
      await axios.patch(`http://localhost:8005/movies/${id}`, {
        super_admin_approved: action === "approve" ? "approved" : "rejected",
      });

      setMovieData((prevData) =>
        prevData.map((movie) =>
          movie.id === id
            ? {
                ...movie,
                super_admin_approved:
                  action === "approve" ? "approved" : "rejected",
              }
            : movie
        )
      );

      setSnackbarMessage(`Movie ID ${id} ${action}ed.`);
      setOpenSnackbar(true);
      window.location.reload();
    } catch (error) {
      console.error("Error approving/rejecting movie:", error);
      setSnackbarMessage(`Error ${action}ing Movie ID ${id}.`);
      setOpenSnackbar(true);
    }
  };

  return (
    <div>
      <NavBar />
      <CssBaseline />
      <Container component="main" maxWidth="lg" style={{ marginTop: "30px" }}>
        <Paper elevation={3} style={{ padding: "30px", background: "#f5f5f5" }}>
          <Typography variant="h4" gutterBottom>
            Movie Add Requests
          </Typography>
          <TableContainer
            component={Paper}
            style={{ margin: "20px 0", height: "60vh" }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Trailer</TableCell>
                  <TableCell>Poster</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {movieData.map((movie) => (
                  <TableRow key={movie.id}>
                    <TableCell>{movie.title}</TableCell>
                    <TableCell>{movie.description}</TableCell>
                    <TableCell>{movie.rating}</TableCell>
                    <TableCell>
                      <a
                        href={movie.trailer}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Watch Trailer
                      </a>
                    </TableCell>
                    <TableCell>
                      <img
                        src={movie.poster}
                        alt={`${movie.title} Poster`}
                        style={{ maxWidth: "100px" }}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleApproveReject(movie.id, "approve")}
                        style={{ marginRight: "10px", marginBottom: "10px" }}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleApproveReject(movie.id, "reject")}
                      >
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert onClose={handleSnackbarClose} severity="success">
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Paper>
      </Container>
      <Footer />
    </div>
  );
};

export default MovieAddRequestPage;
