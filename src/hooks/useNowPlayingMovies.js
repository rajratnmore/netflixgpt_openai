import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { useDispatch, useSelector } from "react-redux";

const useNowPlayingMovies = (pageLoad) => {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector((store) => store.nowPlayingMovies);

  const getNowPlayingMovies = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=" + pageLoad,
        API_OPTIONS
      );
      const json = await response.json();
      dispatch(addNowPlayingMovies(json.results));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    !nowPlayingMovies && getNowPlayingMovies();
  }, [pageLoad]);
};

export default useNowPlayingMovies;
