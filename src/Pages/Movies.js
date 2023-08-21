import React, { useEffect, useState } from "react";
import MovieCard from "./Components/MovieCard";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import "./Components/styles/MovieStyles.css";

const MoviePage = () => {
  const apiKey = "api_key=b97316ed479ee4226afefc88d1792909";
  const [list, setList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  useEffect(() => {
    // Fetch all movies from the TMDB API
    fetch(`https://api.themoviedb.org/3/discover/movie?${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.results) {
          setList(data.results);
          setSearchResults(data.results);
        }
      })
      .catch((error) => {
        console.error("Error fetching movie data:", error);
      });
  }, []);

  const handleInlineSearch = (searchText) => {
    // Filter the movie list based on the search text
    const results = list.filter((movie) =>
      movie.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchResults(results);
    setIsSearched(true);
  };

  const renderMovies = () => {
    const moviesToRender = isSearched ? searchResults : list;
    return moviesToRender.map((movie) => (
      <MovieCard key={movie.id + movie.original_title} movie={movie} />
    ));
  };

  return (
    <>
      <NavBar />
      <div className="container-fluid">
        <div className="MoviePage">
          <div className="MoviesSearch">
            {/* Render the larger search input */}
            <div
              style={{
                position: "relative",
                // margin: "40px auto 20px",
                // maxWidth: "500px",
              }}
            >
              <input
                type="text"
                placeholder="Search for a Movie"
                onChange={(e) => handleInlineSearch(e.target.value)}
                style={{
                  width: "70vw",
                  padding: "15px",
                  borderRadius: "25px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
          </div>
        </div>
        {/* Rendering recommended movies */}
        <div style={{ maxWidth: "90vw", margin: "0 auto" }}>
          {recommendedMovies.length > 0 && (
            <>
              <div>
                <h2 style={{ textAlign: "center" }}>Recommended Movies</h2>
                <div
                  className="container HomeMovieGrid"
                  style={{ width: "97%", marginLeft: "70px" }}
                >
                  {recommendedMovies
                    .filter((movieTitle) => movieTitle !== "")
                    .map((movieTitle) => (
                      <MovieCard key={movieTitle} movie={movieTitle} />
                    ))}
                </div>
              </div>
            </>
          )}
        </div>
        {/* Render the list of movies */}
        <div className="container-fluid HomeMovies">
          <h1 style={{ textAlign: "center" }}>Movies</h1>
          <div className="container HomeMovieGrid">{renderMovies()}</div>
        </div>
        <div className="HomeFooter">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default MoviePage;
