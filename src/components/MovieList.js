import React, { useEffect, forwardRef } from "react";
import MovieCard from "./MovieCard";
import { useDispatch } from "react-redux";
import {
  addPopularMoviesPageNumber,
  addNowPlayingMoviesPageNumber,
  addTrendingMoviesPageNumber,
} from "../utils/moviesSlice";

const MovieList = forwardRef(({ title, movies, removieMovie, index }, ref) => {
  const dispatch = useDispatch();
  const uniqueKey = new Set();

  const handleHorizontalScroll = (scrollContainer) => {
    if (
      scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth &&
      title === "Now Playing"
    ) {
      dispatch(addNowPlayingMoviesPageNumber(15));
    } else if (
      scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth &&
      title === "Trending Movies"
    ) {
      dispatch(addTrendingMoviesPageNumber(15));
    } else if (
      scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth &&
      title === "Popular Movies"
    ) {
      dispatch(addPopularMoviesPageNumber(15));
    }
  };

  useEffect(() => {
    const scrollContainer = ref.current;
    scrollContainer.addEventListener("scroll", () => {
      handleHorizontalScroll(scrollContainer);
    });
    return () =>
      scrollContainer.removeEventListener("scroll", () => {
        handleHorizontalScroll(scrollContainer);
      });
  }, []);

  return (
    <div className="px-2 bg-transparent">
      <div className="flex ">
        <h1 className="text-md md:text-3xl py-4 text-white">{title}</h1>
        {index !== undefined && (
          <button
            className="bg-slate-500 px-3 mx-10 my-5 rounded-md hover:text-white"
            onClick={() => {
              removieMovie(index);
            }}
          >
            X
          </button>
        )}
      </div>
      <div className="flex overflow-x-auto" ref={ref}>
        <div className="flex">
          {movies &&
            movies.map((movie) => {
              if (!uniqueKey.has(movie.id)) {
                uniqueKey.add(movie.id);
                return <MovieCard key={movie.id} posterPath={movie?.poster_path} />;
              } else {
                return null;
              }
            })}
        </div>
      </div>
    </div>
  );
});

export default MovieList;
