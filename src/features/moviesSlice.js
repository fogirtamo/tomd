import { createSlice } from '@reduxjs/toolkit'

export const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    data: null,
    movie: null,
    error: null,
    loading: false,
    movieLoading: false,
    totalResults: 0,
    title: '',
    currentPage: 1,
    movieType: '',
    movieYear: '',
    modalState: false,
  },
  reducers: {
    getMovies: (state) => {
      state.loading = true
    },
    getMoviesSuccess: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.totalResults = action.payload.totalResults;
    },
    getMoviesError: (state) => {
      state.loading = false;
      state.error = "ERROR";
    },
    getMovie: (state) => {
      state.movieLoading = true
    },
    getMovieSuccess: (state, action) => {
      state.movie = action.payload;
      console.log(state.movie)
      state.movieLoading = false;
    },
    getMovieError: (state) => {
      state.movieLoading = false;
      state.error = "ERROR";
    },
    getCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    getTitle: (state, action) => {
      state.title = action.payload;
    },
    getMovieType: (state, action) => {
      state.movieType = action.payload;
    },
    getMovieYear: (state, action) => {
      state.movieYear = action.payload;
    },
    getModalState: (state, action) => {
      state.modalState = action.payload;
    },
  },
})

export const {
  getMovies,
  getMoviesSuccess,
  getTitle,
  getMoviesError,
  typeFilter,
  yearFilter,
  getCurrentPage,
  getMovieType,
  getMovieYear,
  getModalState,
  getMovie,
  getMovieSuccess,
  getMovieError } = moviesSlice.actions


export const selectMovies = (state) => state.movies.data;
export const selectLoading = (state) => state.movies.loading;
export const selectError = (state) => state.movies.error;
export const selectTotalResults = (state) => state.movies.totalResults;
export const selectTitle = (state) => state.movies.title;
export const selectCurrentPage = (state) => state.movies.currentPage;
export const selectMovieType = (state) => state.movies.movieType;
export const selectMovieYear = (state) => state.movies.movieYear;
export const selectModalState = (state) => state.movies.modalState;
export const selectMovie = (state) => state.movies.movie;
export const selectMovieLoading = (state) => state.movies.movieLoading;


export default moviesSlice.reducer