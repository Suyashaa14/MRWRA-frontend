import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

const StarRating = ({ onChange }) => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
    onChange(selectedRating);
  };
  console.log("ratinf", rating);
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <p style={{ marginRight: "1rem" }}>Rate:</p>
      <div style={{ marginTop: "0rem" }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            style={{ cursor: "pointer" }}
            onClick={() => handleStarClick(star)}
          >
            {star <= rating ? <StarIcon /> : <StarOutlineIcon />}
          </span>
        ))}
      </div>
    </div>
  );
};

export default StarRating;
