import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addTrendingMovies } from "../utils/moviesSlice";
import { useDispatch, useSelector } from "react-redux";

const useTrendingMovies = (pageLoad) => {
  const dispatch = useDispatch();
  const trendingMovies = useSelector((store) => store.trendingMovies);

  const getTrendingMovies = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=" + pageLoad,
        API_OPTIONS
      );
      const json = await response.json();
      dispatch(addTrendingMovies(json.results));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    !trendingMovies && getTrendingMovies();
  }, [pageLoad]);
};

export default useTrendingMovies;
