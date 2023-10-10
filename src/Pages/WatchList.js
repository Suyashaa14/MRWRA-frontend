import React from "react";
import MovieCard from "./Components/MovieCard";

const WatchlistPage = ({ watchlist, movies }) => {
  const watchlistMovies = watchlist.map((movieId) =>
    movies.find((movie) => movie.id === movieId)
  );

  return (
    <div>
      <h2>My Watchlist</h2>
      <div className="movie-list">
        {watchlistMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default WatchlistPage;
