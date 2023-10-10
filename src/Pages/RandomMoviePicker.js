import React, { useState } from "react";
import MovieCard from "./Components/MovieCard"; // Import your MovieCard component
import "./Components/styles/RandomMoviePicker.css"; // Import your CSS file for styling

const RandomMoviePicker = ({ list }) => {
  const [randomMovie, setRandomMovie] = useState(null);

  const pickRandomMovie = () => {
    const randomIndex = Math.floor(Math.random() * list.length);
    setRandomMovie(list[randomIndex]);
  };

  return (
    <div className="random-movie-picker">
      <h2 className="header">Random Movie Picker</h2>
      <button className="button" onClick={pickRandomMovie}>
        Pick a Random Movie
      </button>
      {randomMovie && (
        <div className="movie-details">
          <MovieCard movie={randomMovie} />
        </div>
      )}
    </div>
  );
};

export default RandomMoviePicker;
