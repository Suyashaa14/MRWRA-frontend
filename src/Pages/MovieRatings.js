import React, { useEffect, useState } from "react";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import "./Components/styles/MovieRatings.css";
import { useNavigate } from "react-router-dom";

const MovieRatingPage = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [movieInfo, setMovieInfo] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
  }, [navigate]);

  useEffect(() => {
    fetch("/api/movies")
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.arr);
      });
  }, []);

  const handleMovieChange = (event) => {
    setSelectedMovie(event.target.value);
  };

  const handleViewRating = () => {
    fetch(`/api/movie-info?id=${selectedMovie}`)
      .then((response) => response.json())
      .then((data) => {
        setMovieInfo(data.movieInfo);
      });
  };

  const renderMovieOptions = () => {
    return movies?.map((movie) => (
      <option key={movie.id} value={movie.id}>
        {movie.title}
      </option>
    ));
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="MovieRatingPage">
          <div className="MovieRatingHeader">
            <h1>Movie Ratings</h1>
          </div>
          <div className="MovieRatingForm">
            <select
              value={selectedMovie}
              onChange={handleMovieChange}
              className="movie-select"
            >
              <option value="">Select a Movie</option>
              {renderMovieOptions()}
            </select>
            <button onClick={handleViewRating} className="view-rating-button">
              View Rating
            </button>
          </div>
          {selectedMovie && (
            <div className="MovieTable">
              {movieInfo.length > 0 ? (
                <table className="movie-table">
                  <thead>
                    <tr>
                      <th>Movie ID</th>
                      <th>Movie Title</th>
                      <th>Review</th>
                      <th>Ratings</th>
                      <th>Sentiment Analysis</th>
                    </tr>
                  </thead>
                  <tbody>
                    {movieInfo?.map((movie) => (
                      <tr key={movie.id}>
                        <td>{movie.id}</td>
                        <td>{movie.title}</td>
                        <td>{movie.review}</td>
                        <td>{movie.ratings}</td>
                        <td>{movie.sentiment}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No movie information available.</p>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MovieRatingPage;
