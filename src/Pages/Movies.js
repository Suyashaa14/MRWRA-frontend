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

  const handleInlineSearch = (searchText) => {
    setSearchText(searchText);

    // Filter the movie list based on the search text
    const results = movies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(searchText.toLowerCase()) ||
        movie.genre.toLowerCase().includes(searchText.toLowerCase())
    );

    setSearchResults(results);

    if (results.length > 0) {
      // Extract the genre of the first movie in the search results
      const genre = results[0].genre;

      // Filter recommended movies with the same genre, excluding the first movie
      const recommendations = movies.filter(
        (movie) => movie.genre === genre && movie.id !== results[0].id
      );

      setRecommendedMovies(recommendations.slice(0, 5)); // Ensure at least 5 recommended movies
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

// import React, { useEffect, useState } from "react";
// import MovieCard from "./Components/MovieCard";
// import NavBar from "./Components/NavBar";
// import Footer from "./Components/Footer";
// import "./Components/styles/MovieStyles.css";
// import RandomMoviePicker from "./RandomMoviePicker";
// import axios from "axios";
// import jwtDecode from "jwt-decode";
// import { useNavigate } from "react-router-dom";

// const MoviePage = () => {
//   const navigate = useNavigate();
//   const [list, setList] = useState([]);
//   const [searchText, setSearchText] = useState("");
//   const [userData, setUserData] = useState("");
//   const [movies, setMovies] = useState([]);

//   useEffect(() => {
//     getUserData();
//     getAllMovies();
//   }, []);

//   const getUserData = () => {
//     const storedToken = localStorage.getItem("token");
//     if (storedToken) {
//       const decodedToken = jwtDecode(storedToken);
//       setUserData(decodedToken);
//     }
//   };
//   const getAllMovies = () => {
//     axios
//       .get("http://localhost:8005/movies")
//       .then((response) => {
//         setMovies(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data: ", error);
//       });
//   };
//   const filteredMovies = movies.filter((movie) =>
//     movie.title.toLowerCase().includes(searchText.toLowerCase())
//   );
//   const handleAddAdmin = () => {
//     navigate("/admin");
//   };

//   return (
//     <>
//       <NavBar />
//       <div className="container-fluid">
//         <div className="MoviePage">
//           <div className="MoviesSearch">
//             <div
//               style={{
//                 position: "relative",
//                 // margin: "40px auto 20px",
//                 // maxWidth: "500px",
//               }}
//             >
//               <input
//                 type="text"
//                 placeholder="Search for a Movie"
//                 onChange={(e) => setSearchText(e.target.value)}
//                 style={{
//                   width: "70vw",
//                   padding: "15px",
//                   borderRadius: "25px",
//                   border: "1px solid #ccc",
//                 }}
//               />
//             </div>
//           </div>
//         </div>

//         <div className="container-fluid HomeMovies">
//           {userData.role == "admin" ? (
//             <div
//               style={{
//                 width: "83%",
//                 display: "flex",
//                 justifyContent: "flex-end",
//               }}
//             >
//               <button className="button" onClick={handleAddAdmin} style={{}}>
//                 Add Movie
//               </button>
//             </div>
//           ) : (
//             // <RandomMoviePicker list={list} />
//             ""
//           )}

//           <h1
//             style={{
//               textAlign: "center",
//               color: "white",
//               marginBottom: "40px",
//             }}
//           >
//             Movies
//           </h1>
//           <div className="container HomeMovieGrid">
//             {filteredMovies.map((movie) => (
//               <MovieCard key={movie.id} movie={movie} />
//             ))}
//           </div>
//         </div>
//         <div className="HomeFooter">
//           <Footer />
//         </div>
//       </div>
//     </>
//   );
// };

// export default MoviePage;
