import React, { useState } from "react";
import axios from "axios";
import { TextField, Grid, Snackbar, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar({ setRecommendedMovies, moviesSectionRef }) {
  const [inputValue, setInputValue] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const apiKey = "bed3786746b111149c675b32ea0380cc"; // Replace with your TMDb API key

  const handleSearchClick = async () => {
    const lowerCaseInputValue = inputValue.toLowerCase();
    try {
      const response = await fetch(
        // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint for movie recommendations
        `http://127.0.0.1:5000/api/recommend`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ movie_title: lowerCaseInputValue }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      setRecommendedMovies(data.recommendations);
      if (data.recommendations.length === 0) {
        setSnackbarOpen(true);
      } else {
        fetchMoviePosters(data.recommendations);
      }
    } catch (error) {
      console.error("Error fetching movie recommendations:", error);
    }
    window.scrollTo({
      top: moviesSectionRef.current.offsetTop,
      behavior: "smooth",
    });
  };

  const fetchMoviePosters = async (movieTitles) => {
    try {
      const requests = movieTitles.map(async (movieTitle) => {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
            movieTitle
          )}`
        );
        if (response.data.results.length > 0) {
          return response.data.results[0];
        }
        return null;
      });

      const movieDetails = await Promise.all(requests);
      setRecommendedMovies(movieDetails.filter((movie) => movie !== null));
    } catch (error) {
      console.error("Error fetching movie posters:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "20%",
        left: "30%",
        width: "40%",
        padding: "5px",
        borderRadius: "10px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        display: "flex",
        alignItems: "center",
        background: "#69696952",
      }}
    >
      <TextField
        placeholder="Search for movies"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{
          flex: 1,
          marginRight: "8px",
          borderRadius: "10px",
          background: "white",
        }}
      />
      <Button
        variant="contained"
        onClick={handleSearchClick}
        style={{
          padding: "11px",
          background: "white",
          borderRadius: "10px",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <SearchIcon style={{ color: "black", fontSize: "30px" }} />
      </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="No movie found"
      />
    </div>
  );
}

export default SearchBar;
