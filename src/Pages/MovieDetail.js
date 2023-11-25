import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Components/styles/MovieDetails.css";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import jwtDecode from "jwt-decode";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [userComment, setUserComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8005/movies/${id}`)
      .then((response) => {
        setMovie(response.data);
      })
      .catch((error) => {
        console.error("Error fetching movie details: ", error);
      });
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    // Submit the user's comment
    try {
      const storedToken = localStorage.getItem("token");
      const decodedToken = jwtDecode(storedToken);
      console.log(decodedToken.id)
      const response = await axios.post(
        `http://localhost:8005/movies/${id}/comments`,
        {
          comment: userComment,
          userId: decodedToken.id

        }
      );

      // Update the comments state with the new comment
      setComments([...comments, response.data]);

      // Clear the input field after submission
      setUserComment("");
    } catch (error) {
      console.error("Error submitting comment: ", error);
    }
  };

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
        <div className="user-comment-section" style={{ lineHeight: "3rem" }}>
          <h2>Comments</h2>
          {loadingComments ? (
            <p>Loading comments...</p>
          ) : (
            <ul>
              {comments.map((comment) => (
                <li key={comment.id}>{comment.comment}</li>
              ))}
            </ul>
          )}
          <form onSubmit={handleCommentSubmit}>
            <textarea
              placeholder="Write your comment..."
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
              required
            ></textarea>
            <button type="submit">Submit Comment</button>
          </form>
        </div>
      </div>
      <div className="HomeFooter">
        <Footer />
      </div>
    </>
  );
};

export default MovieDetail;
