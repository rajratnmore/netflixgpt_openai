import React from "react";
import { IMG_CDN } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) {
    return;
  }
  const moviePosterImage = IMG_CDN + posterPath;
  return (
    <div className="w-40 mx-2">
      <img src={moviePosterImage} alt="Movie Card" />
    </div>
  );
};

export default MovieCard;
