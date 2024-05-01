import React, { useRef } from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  const nowPlayingRef = useRef(null);
  const trendingRef = useRef(null);
  const popularRef = useRef(null);
  return (
    <div className="bg-black">
      <div className="mt-16 md:-mt-32 pl-4 relative z-10">
        <MovieList ref={nowPlayingRef} title={"Now Playing"} movies={movies.nowPlayingMovies} />
        <MovieList ref={trendingRef} title={"Trending Movies"} movies={movies.trendingMovies} />
        <MovieList ref={popularRef} title={"Popular Movies"} movies={movies.popularMovies} />
      </div>
    </div>
  );
};

export default SecondaryContainer;
