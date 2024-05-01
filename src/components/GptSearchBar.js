import React, { useEffect, useRef, useState } from "react";
import lang from "../utils/languageConstants";
import { useSelector, useDispatch } from "react-redux";
import openai from "../utils/openai";
import gptMovieResultConstants from "../utils/gptMovieResultConstants";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const movieResults = useSelector((store) => store.gpt.movieResults);
  const [divHeight, setDivHeight] = useState(760);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  // Search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" + movie + "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    if (movieResults) {
      return;
    }

    // Make an API call to GPT API and get movie results
    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example result : Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    /* This result will come when we make API call but now I don't have paid access of openAi So I'm doing it manually by constants 
      const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });
    console.log("GPT result : ", gptResults.choices?[0]?.message?.content);
    */

    /* This is getting movies using constants */
    const gptResults = gptMovieResultConstants;
    if (!gptResults.choices) {
      // Write Error Handling
      return;
    }
    const gptMovieList = gptResults?.choices[0]?.message?.content.split(",");
    // For each movie I will search TMDB API
    const promiseArray = gptMovieList.map((movie) => searchMovieTMDB(movie));
    const tmdbMovieListResult = await Promise.allSettled(promiseArray);
    dispatch(addGptMovieResult({ movieNames: gptMovieList, movieResults: tmdbMovieListResult }));
    setDivHeight(400);
  };

  useEffect(() => {
    if (movieResults) {
      setDivHeight(400);
    }
  }, [divHeight, movieResults]);

  return (
    <div className="flex flex-wrap justify-center bg-black bg-opacity-80" style={{ height: divHeight + "px" }}>
      <form className="mt-48" action="" onSubmit={(e) => e.preventDefault()}>
        <input
          ref={searchText}
          className="p-2 m-2 w-[300px] md:w-[600px] rounded-lg focus:border-none focus:outline-none "
          type="text"
          name=""
          id=""
          placeholder={lang[langKey].gptSearchPlaceHolder}
        />
        <button className="bg-red-700 text-white rounded-lg px-6 py-2" onClick={handleGptSearchClick}>
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
