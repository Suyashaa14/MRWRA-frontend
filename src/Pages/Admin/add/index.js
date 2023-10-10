import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextareaAutosize from "@mui/material/TextareaAutosize";

const AddMovie = () => {
  const [movieData, setMovieData] = useState({
    title: "",
    year: null,
    contentRating: "",
    runtime: "",
    description: "",
    rating: null,
    poster: "",
    genre: "",
    director: "",
    metascore: null,
    writer: "",
    stars: "",
    trailer: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let parsedValue = value;

    if (name === "year" || name === "rating" || name === "metascore") {
      // Use parseFloat for rating and metascore, and parseInt for year
      parsedValue = name === "year" ? parseInt(value) : parseFloat(value);
    }

    setMovieData({ ...movieData, [name]: parsedValue });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to be sent in the request body
    const requestData = {
      ...movieData,
      movieId: "tt1234567", // You can set the movieId as needed
    };

    try {
      const response = await fetch("http://localhost:8005/movies/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        console.log("Movie data sent successfully!");
        // Handle success
      } else {
        console.error("Request failed with status:", response.status);
        // Handle error
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle network or other errors
    }
  };

  return (
    <Card style={{ backgroundColor: "white", padding: "16px" }}>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Movie Details</Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Title"
                name="title"
                value={movieData.title}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Year"
                name="year"
                type="number"
                value={movieData.year}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Content Rating"
                name="contentRating"
                value={movieData.contentRating}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Runtime"
                name="runtime"
                value={movieData.runtime}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Trailer"
                name="trailer"
                value={movieData.trailer}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Rating"
                name="rating"
                type="number" // Set the input type to "number"
                value={movieData.rating}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Metascore"
                name="metascore"
                type="number" // Set the input type to "number"
                value={movieData.metascore}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Poster"
                name="poster"
                value={movieData.poster}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Genre"
                name="genre"
                value={movieData.genre}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Director"
                name="director"
                value={movieData.director}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Writer"
                name="writer"
                value={movieData.writer}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Stars"
                name="stars"
                value={movieData.stars}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Movie Description</Typography>
              <TextareaAutosize
                minRows={3}
                maxRows={10}
                aria-label="Movie Description"
                name="description"
                value={movieData.description}
                onChange={handleChange}
                fullWidth
                style={{ width: "100%" }}
              />
            </Grid>
          </Grid>
          <Button variant="contained" color="primary" type="submit">
            Add Movie
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddMovie;