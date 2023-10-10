import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Components/styles/SearchResultsStyles.css";
import MovieCard from "./Components/MovieCard";
import NavBar from "./Components/NavBar";
import ReactPlayer from "react-player";
import Footer from "./Components/Footer";

const SearchResult = () => {
  const params = useParams();
  const apiKey = "api_key=b97316ed479ee4226afefc88d1792909";
  const inputValue = params.id;
  const [searchedMovie, setSearchedMovie] = useState({});
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [castMembers, setCastMembers] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [currGenre, setCurrGenre] = useState([]);
  const [videoData, setVideoData] = useState([]);
  const [playTrailer, setPlayTrailer] = useState(false);

  const gotCast = (castData) => {
    setCastMembers([]);

    let counter = 5;
    for (let cast of castData) {
      setCastMembers((castMembers) => [...castMembers, cast]);
      counter--;
      if (counter === 0) break;
    }
  };

  const gotVideo = (data) => {
    if (data.videos && data.videos.results) {
      const trailer = data.videos.results.find(
        (vid) => vid.name === "Official Trailer"
      );

      setVideoData(trailer ? trailer : data.videos.results[0]);
    }
  };

  const gotRecommendedData = (apiData) => {
    setRecommendedMovies([]);
    let counter = 16;
    for (let movie of apiData.movies) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?${apiKey}&query=${movie}`
      ).then((Response) =>
        Response.json().then((data) =>
          setRecommendedMovies((recommendedMovies) => [
            ...recommendedMovies,
            data.results[0],
          ])
        )
      );
      counter--;
      if (counter === 0) break;
    }
  };

  useEffect(() => {
    const gotTMDBData = (apiData) => {
      const realMovieData = apiData.results[0];
      setCurrGenre([]);
      setCurrGenre(realMovieData.genre_ids);

      setSearchedMovie(realMovieData);
      fetch(
        `https://api.themoviedb.org/3/movie/${realMovieData.id}/credits?${apiKey}`
      ).then((Response) => Response.json().then((data) => gotCast(data.cast)));

      fetch(
        `https://api.themoviedb.org/3/movie/${realMovieData.id}?${apiKey}&append_to_response=videos`
      ).then((Response) => Response.json().then((data) => gotVideo(data)));
    };

    fetch(
      `https://api.themoviedb.org/3/search/movie?${apiKey}&query=${inputValue}`
    ).then((Response) => Response.json().then((data) => gotTMDBData(data)));

    fetch(`/api/similarity/${inputValue}`).then((Response) =>
      Response.json().then((data) => gotRecommendedData(data))
    );

    fetch(`https://api.themoviedb.org/3/genre/movie/list?${apiKey}`).then(
      (Response) => Response.json().then((data) => setGenreList(data.genres))
    );
  }, [inputValue]);

  const streamingLinks = [
    {
      platform: "Netflix",
      link: `https://www.netflix.com/${searchedMovie.id}`,
    },
    {
      platform: "Amazon Prime",
      link: `https://www.amazon.com/${searchedMovie.id}`,
    },
    // ... add more streaming links here
  ];
  const RenderMovies = () =>
    recommendedMovies.map((movie) => (
      <MovieCard key={movie.id + movie.original_title} movie={movie} />
    ));

  const RenderTrailer = () => {
    return (
      <div className="trailer-overlay" onClick={() => setPlayTrailer(false)}>
        <div className="trailer-video-container">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${videoData.key}-U`}
            playing={true}
            width="100%"
            height="100%"
            className="youtube-container"
          />
        </div>
      </div>
    );
  };

  const displayGenre = () =>
    currGenre.map((movieId, ind) => {
      if (ind >= 3) return null;
      if (movieId) {
        for (let obj of genreList) {
          if (obj.id === movieId) {
            if (ind === 2) {
              return <span key={obj.id}>{obj.name}</span>;
            } else {
              return (
                <span key={obj.id}>
                  {obj.name}
                  {","}{" "}
                </span>
              );
            }
          }
        }
      }
      return null;
    });

  const imgLink = "https://image.tmdb.org/t/p/original";
  const backdropPath = "https://image.tmdb.org/t/p/w1280";

  return (
    <div className="main-background">
      <NavBar isHome={true} />

      <div className="background-image">
        <div
          className="background-image-overlay"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${backdropPath}${searchedMovie.backdrop_path})`,
          }}
        />
      </div>

      <div className="content-container">
        <div className="movie-details">
          <h1 className="top-title-movie">{searchedMovie.title}</h1>
          <p className="overview-content">{searchedMovie.overview}</p>
          <p className="cast-heading">Cast:</p>
          <div className="casting">
            {castMembers.map((member) => (
              <a
                key={member.id}
                href={`https://en.wikipedia.org/wiki/${member.name}`}
                target="_blank"
                rel="noreferrer"
                className="cast-link"
              >
                <img
                  src={
                    member.profile_path
                      ? `${imgLink}${member.profile_path}`
                      : ""
                  }
                  alt={member.name}
                  className="cast-photo"
                />
              </a>
            ))}
          </div>
          <div className="rating">
            <b>Rating: </b>
            {searchedMovie.vote_average?.toFixed(1)}/10{" "}
            <i className="fas fa-star"></i>
          </div>

          <div className="release-date">
            <b>Release Date: </b>
            {searchedMovie.release_date}
          </div>
          <div className="genres">
            <b>Genres: </b>
            {currGenre ? displayGenre() : null}
          </div>
          <button
            className="trailer-button"
            onClick={() => setPlayTrailer(true)}
          >
            <i className="fas fa-play"></i> Watch Trailer
          </button>
        </div>

        <div className="movie-poster">
          <img
            className="main-img"
            src={`https://image.tmdb.org/t/p/w500${searchedMovie.poster_path}`}
            alt="Movie"
          />
        </div>
      </div>

      <div
        className={playTrailer ? "trailer-overlay" : "trailer-overlay-hidden"}
      >
        <div className="trailer-video-container">
          {videoData && playTrailer ? RenderTrailer() : null}
        </div>
      </div>

      <div className="streaming-links">
        <h3>Available on:</h3>
        <ul>
          {streamingLinks.map((linkInfo) => (
            <li key={linkInfo.platform}>
              <a href={linkInfo.link} target="_blank" rel="noopener noreferrer">
                {linkInfo.platform}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="recommended-movies">
        <h2 className="recommend-heading">Recommended Movies</h2>
        <div className="recommended-grid">{RenderMovies()}</div>
      </div>

      <Footer />
    </div>
  );
};

export default SearchResult;
