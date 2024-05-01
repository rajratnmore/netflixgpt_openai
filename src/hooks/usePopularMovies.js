import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addPopularMovies } from "../utils/moviesSlice";
import { useDispatch, useSelector } from "react-redux";

const usePopularMovies = (pageLoad) => {
  const dispatch = useDispatch();
  const popularMovies = useSelector((store) => store.popularMovies);
  const getPopularMovies = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=" + pageLoad,
        API_OPTIONS
      );
      const json = await response.json();
      dispatch(addPopularMovies(json.results));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    !popularMovies && getPopularMovies();
  }, [pageLoad]);
};

export default usePopularMovies;
