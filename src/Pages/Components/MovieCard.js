// This is the movie card component
import "./styles/Card.css";
import { useNavigate } from "react-router-dom";
const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const currentMovie = movie.title;
  // opening the clicked movie
  const goToMovie = () => {
    navigate(`/search/${currentMovie}`);
    // window.location.reload();
  };
  const img_path = "https://image.tmdb.org/t/p/w342";

  return (
    <div onClick={goToMovie} className="Main-Card">
      {movie.poster && (
        <img
          // src={img_path + movie.poster_path}
          src={movie.poster}
          alt={movie.title}
          title={movie.title}
          className="Poster"
        />
      )}
      <div className="Movie-Title">{movie.title}</div>
      {movie.rating ? (
        <span className={"movie-voting"}>
          {movie.rating}
          <i class="fa fa-star" aria-hidden="true"></i>
        </span>
      ) : null}
    </div>
  );
};

export default MovieCard;
