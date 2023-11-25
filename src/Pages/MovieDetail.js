import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Components/styles/MovieDetails.css";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/movies/${id}`)
      .then((response) => {
        setMovie(response.data);
      })
      .catch((error) => {
        console.error("Error fetching movie details: ", error);
      });
  }, [id]);

  if (!movie) {
    return <div className="loading-container">Loading...</div>;
  }

  return (
    <>
      <NavBar />
      <div className="movie-detail-container">
        <h1>{movie.title}</h1>
        <img className="movie-poster" src={movie.poster} alt={movie.title} />
        <div className="movie-info">
          <p className="info">Year: {movie.year}</p>
          <p className="info">Runtime: {movie.runtime}</p>
          <p className="info">Rating: {movie.rating}</p>
          <p className="info">Description: {movie.description}</p>
          <p className="info">Director: {movie.director}</p>
          <p className="info">Stars: {movie.stars}</p>
          <p className="info">Language: {movie.language}</p>
          <p className="info">Status: {movie.status}</p>
          <a
            className="trailer-link"
            href={movie.trailer}
            target="_blank"
            rel="noreferrer"
          >
            Watch Trailer
          </a>
        </div>
      </div>
      <div className="HomeFooter">
        <Footer />
      </div>
    </>
  );
};

export default MovieDetail;
