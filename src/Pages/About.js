import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import NavBar from "./Components/NavBar";
import MovieList from "./Admin";

const About = () => {
  return (
    <>
      <NavBar />
      <MovieList />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ color: "#fff" }}>
          About Movie Recommendation with Review Analysis
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: "#d3d3d3" }}>
          Welcome to Movie Recommendation with Review Analysis
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ color: "#fff" }}>
          Key Features
        </Typography>
        <ul>
          <li style={{ color: "#d3d3d3" }}>Smart Movie Recommendations</li>
          <li style={{ color: "#d3d3d3" }}>User-Generated Reviews</li>
          <li style={{ color: "#d3d3d3" }}>Review Analysis</li>
          <li style={{ color: "#d3d3d3" }}>Easy-to-Use Interface</li>
          <li style={{ color: "#d3d3d3" }}>Interactive Rating System</li>
          <li style={{ color: "#d3d3d3" }}>Comprehensive Movie Database</li>
          <li style={{ color: "#d3d3d3" }}>Responsive Design</li>
        </ul>
        <Typography variant="h5" gutterBottom sx={{ color: "#fff" }}>
          Meet the Team
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: "#d3d3d3" }}>
          Our dedicated team of developers, designers, and movie aficionados has
          worked tirelessly to bring MovieHub to life.
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ color: "#fff" }}>
          Get Started
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: "#d3d3d3" }}>
          Embark on a cinematic journey like no other. Sign up for a free
          account and start rating movies you've watched to receive personalized
          recommendations instantly.
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ color: "#fff", mt: 4 }}>
          Contact Us
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: "#d3d3d3" }}>
          Have a question, suggestion, or just want to talk about movies? We'd
          love to hear from you! Reach out to our support team at
          <a
            href="mailto:support@movie.com"
            style={{ color: "#e50914", marginLeft: "4px" }}
          >
            support@movie.com
          </a>
          , and we'll get back to you as soon as possible.
        </Typography>
      </Container>
    </>
  );
};

export default About;
