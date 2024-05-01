import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store.movies.trailerVideo);
  // fetch movie trailer video && updating the store with trailer video data
  const getMovieTrailerVideo = async () => {
    try {
      const data = await fetch("https://api.themoviedb.org/3/movie/" + movieId + "/videos?language=en-US", API_OPTIONS);
      const json = await data.json();
      const filterTrailerData = json.results.filter((video) => video.type === "Trailer");
      const trailer = filterTrailerData.length ? filterTrailerData[0] : json.results[0];
      dispatch(addTrailerVideo(trailer));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    !trailerVideo && getMovieTrailerVideo();
  }, []);
};

export default useMovieTrailer;
