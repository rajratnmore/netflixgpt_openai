import React, { useRef } from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const popularRef = useRef(null);
  const { movieNames, movieResults } = useSelector((store) => store.gpt);
  if (!movieNames || !movieResults) {
    return;
  }

  return (
    <div className="w-full p-4 bg-black opacity-80 ">
      {movieNames.map((movieName, index) => (
        <MovieList key={index} ref={popularRef} title={movieName} movies={movieResults[index]?.value} />
      ))}
    </div>
  );
};

export default GptMovieSuggestions;
