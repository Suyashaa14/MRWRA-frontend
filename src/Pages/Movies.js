import React, { useEffect, useState } from "react";
import MovieCard from "./Components/MovieCard";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import "./Components/styles/MovieStyles.css";
import RandomMoviePicker from "./RandomMoviePicker";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const MoviePage = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [userData, setUserData] = useState("");
  const [movies, setMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
  }, [navigate]);
  useEffect(() => {
    getUserData();
    getAllMovies();
  }, []);

  const getUserData = () => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      setUserData(decodedToken);
    }
  };

  const getAllMovies = () => {
    axios
      .get("http://localhost:8005/movies")
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  const handleAddAdmin = () => {
    navigate("/admin");
  };

  // const handleInlineSearch = (searchText) => {
  //   setSearchText(searchText);

  //   // Filter the movie list based on the search text
  //   const results = movies.filter(
  //     (movie) =>
  //       movie.title.toLowerCase().includes(searchText.toLowerCase()) ||
  //       movie.genre.toLowerCase().includes(searchText.toLowerCase())
  //   );

  //   setSearchResults(results);
  //   console.log("result", results);
  //   if (results.length > 0) {
  //     // Use the Flask API for content-based recommendations
  //     axios
  //       .post("http://localhost:5000/api/recommendations", {
  //         movie_title: results[0].title,
  //       })
  //       .then((response) => {
  //         setRecommendedMovies(response.data.recommendations);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching recommendations: ", error);
  //       });
  //   } else {
  //     setRecommendedMovies([]);
  //   }
  // };

  const handleInlineSearch = (searchText) => {
    setSearchText(searchText);

    const results = movies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(searchText.toLowerCase()) ||
        movie.genre.toLowerCase().includes(searchText.toLowerCase())
    );

    setSearchResults(results);

    if (results.length > 0) {
      const genre = results[0].genre;

      const recommendations = movies.filter(
        (movie) => movie.genre === genre && movie.id !== results[0].id
      );

      setRecommendedMovies(recommendations.slice(0, 5));
    } else {
      setRecommendedMovies([]);
    }
  };

  return (
    <>
      <NavBar />
      <div className="container-fluid">
        <div className="MoviePage">
          <div className="MoviesSearch">
            <div
              style={{
                position: "relative",
              }}
            >
              <input
                type="text"
                placeholder="Search for a Movie"
                onChange={(e) => handleInlineSearch(e.target.value)}
                value={searchText}
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

        <div className="container-fluid HomeMovies">
          {userData.role === "admin" && (
            <div
              style={{
                width: "83%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <button className="button" onClick={handleAddAdmin}>
                Add Movie
              </button>
            </div>
          )}

          <h1
            style={{
              textAlign: "center",
              color: "white",
              marginBottom: "40px",
            }}
          >
            Movies
          </h1>
          <div className="container HomeMovieGrid">
            {searchText === ""
              ? movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))
              : searchResults.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
          </div>

          {recommendedMovies.length > 0 && (
            <>
              <h2
                style={{
                  textAlign: "center",
                  marginTop: "40px",
                  color: "white",
                }}
              >
                Recommended Movies
              </h2>
              <div className="container HomeMovieGrid">
                {recommendedMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </>
          )}
        </div>
        <div className="HomeFooter">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default MoviePage;
