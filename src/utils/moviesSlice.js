import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: [], //
    trailerVideo: null, //
    popularMovies: [], //
    trendingMovies: [], //
    nowPlayingMoviesPageNumber: 1, //
    popularMoviesPageNumber: 1, //
    trendingMoviesPageNumber: 1, //
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = [...state.nowPlayingMovies, ...action.payload];
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = [...state.popularMovies, ...action.payload];
    },
    addTrendingMovies: (state, action) => {
      state.trendingMovies = [...state.trendingMovies, ...action.payload];
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    addNowPlayingMoviesPageNumber: (state, action) => {
      state.nowPlayingMoviesPageNumber = state.nowPlayingMoviesPageNumber + action.payload;
    },
    addPopularMoviesPageNumber: (state, action) => {
      state.popularMoviesPageNumber = state.popularMoviesPageNumber + action.payload;
    },
    addTrendingMoviesPageNumber: (state, action) => {
      state.trendingMoviesPageNumber = state.trendingMoviesPageNumber + action.payload;
    },
  },
});

export const {
  addNowPlayingMovies,
  addPopularMovies,
  addTrendingMovies,
  addTrailerVideo,
  addNowPlayingMoviesPageNumber,
  addPopularMoviesPageNumber,
  addTrendingMoviesPageNumber,
} = moviesSlice.actions;

export default moviesSlice.reducer;
