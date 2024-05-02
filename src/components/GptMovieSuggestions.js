import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import MovieList from "./MovieList";
import { updateMovieResult } from "../utils/gptSlice";

const GptMovieSuggestions = () => {
  const popularRef = useRef(null);
  const dispatch = useDispatch();
  const { movieNames, movieResults } = useSelector((store) => store.gpt);
  if (!movieNames || !movieResults) {
    return;
  }

  const removieMovie = (index) => {
    const newMovieNames = movieNames.filter((movieName, movieNameIndex) => movieNameIndex !== index);
    const newMovieResults = movieResults.filter((movieResults, movieResultIndex) => movieResultIndex !== index);
    dispatch(updateMovieResult({ movieNames: newMovieNames, movieResults: newMovieResults }));
  };

  return (
    <div className="w-full px-4 bg-black opacity-80 ">
      {movieNames.map((movieName, index) => (
        <MovieList
          key={index}
          index={index}
          ref={popularRef}
          title={movieName}
          movies={movieResults[index]?.value}
          removieMovie={removieMovie}
        />
      ))}
    </div>
  );
};

export default GptMovieSuggestions;
