import React, { useEffect, useState, useRef } from "react";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import "./Components/styles/HomeStyles.css";
import MovieCard from "./Components/MovieCard";
import SearchBar from "./Components/SearchBar";

const Home = () => {
  const apiKey = "api_key=b97316ed479ee4226afefc88d1792909";
  const [list, setList] = useState([]);
  const [homeGenreList, setHomeGenreList] = useState([{}]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [currMovies, setCurrMovies] = useState([{}]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [sortOrder, setSortOrder] = useState("aesc"); // Default sorting order

  const moviesSectionRef = useRef(null);
  // Helper function to get the name of the selected genre
  const getGenreName = (genreId) => {
    const genre = homeGenreList.find((genre) => genre.id === genreId);
    return genre ? genre.name : "";
  };
  useEffect(() => {
    setCurrMovies([]);
    setSelectedGenres([]);
    setHomeGenreList([]);
    setList([]);
    // Getting the list of all movies from our flask server for our search bar
    fetch("/api/movies")
      .then((response) => response.json())
      .then((data) => setList(data.arr));

    // Getting the list of all genres
    fetch(`https://api.themoviedb.org/3/genre/movie/list?${apiKey}`)
      .then((response) => response.json())
      .then((data) => setHomeGenreList(data.genres));
  }, []);

  useEffect(() => {
    setCurrMovies([]);
    if (selectedGenres.length > 0) {
      fetch(
        `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&${apiKey}&release_date.lte=2019-12-12&with_genres=${encodeURI(
          selectedGenres.join(",")
        )}`
      )
        .then((response) => response.json())
        .then((data) => {
          let sortedMovies = data.results;
          if (sortOrder === "desc") {
            sortedMovies = sortedMovies.sort(
              (a, b) => b.vote_average - a.vote_average
            );
          } else {
            sortedMovies = sortedMovies.sort(
              (a, b) => a.vote_average - b.vote_average
            );
          }
          setCurrMovies(sortedMovies);
        });
    }
  }, [selectedGenres, sortOrder]);

  const onTagClick = (genreId) => {
    let isPresent = false;
    for (let id of selectedGenres) {
      if (id === genreId) {
        isPresent = true;
        break;
      }
    }
    if (isPresent) {
      setSelectedGenres(selectedGenres.filter((item) => item !== genreId));
    } else {
      setSelectedGenres((selectedGenres) => [...selectedGenres, genreId]);
    }
    window.scrollTo({
      top: moviesSectionRef.current.offsetTop,
      behavior: "smooth",
    });
  };

  const renderMovies = () =>
    currMovies.map((movie) => {
      if (movie) {
        return (
          <MovieCard key={movie.id + movie.original_title} movie={movie} />
        );
      } else {
        return null;
      }
    });

  return (
    <>
      <NavBar />
      <div className="container-fluid">
        <div className="HomePage">
          {/* Rendering the search bar */}
          <SearchBar
            placeholder="Search for a Movie"
            setRecommendedMovies={setRecommendedMovies}
            moviesSectionRef={moviesSectionRef}
          />

          <h2 className="genreHeader">Get Top Movies Based On Genre </h2>
          <div className="buttonGrid">
            {homeGenreList.map((genre) => (
              <div
                key={genre.id}
                onClick={() => onTagClick(genre.id)}
                className={
                  selectedGenres.includes(genre.id)
                    ? "genreTagON"
                    : "genreTagOFF"
                }
              >
                {genre.name}
                {selectedGenres.includes(genre.id) ? (
                  <i className="fa fa-times" aria-hidden="true"></i>
                ) : null}
              </div>
            ))}
          </div>
        </div>
        {/* Rendering recommended movies */}

        <div
          // className="container-fluid HomeMovies"
          style={{ maxWidth: "90vw" }}
        >
          {recommendedMovies.length > 0 && (
            <>
              <div>
                <h2
                  style={{
                    textAlign: "center",
                    color: "white",
                    margin: "50px",
                  }}
                >
                  Recommended Movies
                </h2>
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
        {/* Rendering selected genre movies */}
        <div
          // className="container-fluid HomeMovies"
          style={{ color: "white", margin: "40px" }}
        >
          <button
            style={{
              backgroundColor: "#e50914", // Netflix red color
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginBottom: "20px",
              margin: "50px",
              fontSize: "16px",
            }}
            onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
          >
            {sortOrder === "desc"
              ? "Sort by Lowest Rating"
              : "Sort by Highest Rating"}
          </button>
          {selectedGenres.length > 0 && (
            <h2 style={{ textAlign: "center" }}>
              Genre:{" "}
              {selectedGenres
                .map((genreId) => getGenreName(genreId))
                .join(", ")}
            </h2>
          )}

          <div
            className="container HomeMovieGrid"
            style={{ marginTop: "50px" }}
            ref={moviesSectionRef}
          >
            {currMovies.length > 0 ? renderMovies() : null}
          </div>
        </div>

        <div className="HomeFooter">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
