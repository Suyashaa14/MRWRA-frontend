import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import YouTube from "react-youtube";
import "./Components/styles/MovieDetails.css";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import jwtDecode from "jwt-decode";
import { StarRating, StarRatingDisplay } from "./Components/StarRating";
import { useNavigate } from "react-router-dom";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [comments, setComments] = useState([]);
  const [userComment, setUserComment] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
  }, [navigate]);
  useEffect(() => {
    axios
      .get(`http://localhost:8005/movies/${id}`)
      .then((response) => {
        setMovie(response.data);

        if (response.data.trailer) {
          const videoId = extractYouTubeVideoId(response.data.trailer);
          setMovie((prevMovie) => ({ ...prevMovie, trailerVideoId: videoId }));
        }
      })
      .catch((error) => {
        console.error("Error fetching movie details: ", error);
      });

    axios
      .get(`http://localhost:8005/movies/${id}/comments`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching movie comments: ", error);
      });
  }, [id]);

  const extractYouTubeVideoId = (url) => {
    const match = url.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    );
    return match ? match[1] : null;
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      const storedToken = localStorage.getItem("token");
      const decodedToken = jwtDecode(storedToken);

      const response = await axios.post(
        `http://localhost:8005/movies/${id}/comments`,
        {
          comment: userComment,
          userId: decodedToken.id,
          userRating,
        }
      );

      setComments([...comments, response.data]);

      setUserComment("");
      setUserRating(0);
    } catch (error) {
      console.error("Error submitting comment: ", error);
    }
  };

  if (!movie) {
    return <div className="loading-container">Loading...</div>;
  }

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <>
      <NavBar />
      <div className="movie-detail-container">
        <h1>{movie.title}</h1>
        <img className="movie-poster" src={movie.poster} alt={movie.title} />
        <div className="movie-info">
          <p className="info">Year: {movie.year}</p>
          <p className="info">Runtime: {movie.runtime}</p>
          <p className="info">IMDBRating: {movie.rating}</p>
          <p className="info">Description: {movie.description}</p>
          <p className="info">Director: {movie.director}</p>
          <p className="info">Stars: {movie.stars}</p>
          <p className="info">Language: {movie.language}</p>
          {movie.trailerVideoId && (
            <YouTube
              videoId={movie.trailerVideoId}
              opts={opts}
              onClose={() => setTrailerOpen(false)}
              isOpen={trailerOpen}
            />
          )}{" "}
        </div>
        <div className="user-comment-section">
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <StarRating onChange={(rating) => setUserRating(rating)} />
            <textarea
              placeholder="Write your co  ment..."
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
              required
              className="comment-input"
            ></textarea>
            <button type="submit" className="comment-submit">
              Submit Comment
            </button>
          </form>
          {comments ? (
            <>
              <h2>Comments</h2>
              <ul className="comments-list">
                {comments?.map((comment) => (
                  <li key={comment.id} className="comment-item">
                    <div className="comment-header">
                      <p className="comment-user">
                        {comment?.user?.firstName}:
                      </p>
                      {comment.userRating !== null && (
                        <div className="comment-rating">
                          <StarRatingDisplay rating={comment.userRating} />
                        </div>
                      )}
                    </div>
                    <p className="comment-text">{comment.comment}</p>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            ""
          )}
          {/* <h2 className="comments-heading">Comments</h2>
          {loadingComments ? (
            <p>Loading comments...</p>
          ) : (
            <ul className="comments-list">
              {comments?.map((comment) => (
                <li key={comment.id} className="comment-item">
                  <div className="comment-header">
                    <p className="comment-user">{comment?.user?.firstName}:</p>
                  </div>
                  <p className="comment-text">{comment.comment}</p>
                </li>
              ))}
            </ul>
          )} */}
        </div>
      </div>

      <div className="HomeFooter">
        <Footer />
      </div>
    </>
  );
};

export default MovieDetail;
