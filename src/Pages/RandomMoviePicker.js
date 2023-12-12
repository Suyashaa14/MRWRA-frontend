import React, { useState } from "react";
import Modal from "react-modal";
import MovieCard from "./Components/MovieCard";
import "./Components/styles/RandomMoviePicker.css";

const RandomMoviePicker = ({ list }) => {
  const [randomMovie, setRandomMovie] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [languageOptions, setLanguageOptions] = useState([]);
  const [genreOptions, setGenreOptions] = useState([]);

  // Extract unique languages and genres from the movie list
  const uniqueLanguages = Array.from(
    new Set(list.map((movie) => movie.language))
  );
  const uniqueGenres = Array.from(
    new Set(
      list
        .map((movie) => movie.genre.split(","))
        .flat()
        .map((genre) => genre.trim())
    )
  );

  // Update language and genre options when the component mounts
  React.useEffect(() => {
    setLanguageOptions(uniqueLanguages);
    setGenreOptions(uniqueGenres);
  }, [uniqueLanguages, uniqueGenres]);

  const pickRandomMovie = () => {
    // Filter movies based on selected language and genre
    const filteredMovies = list.filter(
      (movie) =>
        (!selectedLanguage || movie.language === selectedLanguage) &&
        (!selectedGenre || movie.genre.includes(selectedGenre))
    );

    // Pick a random movie from the filtered list
    const randomIndex = Math.floor(Math.random() * filteredMovies.length);
    setRandomMovie(filteredMovies[randomIndex]);

    // Close the modal
    setModalIsOpen(false);
  };

  return (
    <div className="random-movie-picker">
      <h2 className="header">Random Movie Picker</h2>
      <button className="button" onClick={() => setModalIsOpen(true)}>
        Select Language and Genre
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Select Language and Genre"
      >
        <h2>Select Language and Genre</h2>
        <div>
          <label>Language:</label>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            <option value="">Select Language</option>
            {languageOptions.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Genre:</label>
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option value="">Select Genre</option>
            {genreOptions.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
        <button onClick={pickRandomMovie}>Find Movie</button>
      </Modal>

      {randomMovie && (
        <div className="movie-details">
          <MovieCard movie={randomMovie} />
        </div>
      )}
    </div>
  );
};

export default RandomMoviePicker;
