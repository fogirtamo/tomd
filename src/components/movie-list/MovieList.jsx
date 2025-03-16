import React from 'react'
import classes from './MovieList.module.css'
import MovieForm from '../movie-form/MovieForm'
import { useDispatch } from 'react-redux';
import { getMovieData } from '../../action-creators/movies';
import { Link } from 'react-router-dom';
import getCommentsByMovieId from 'API/GetCommentsByID';
import { useAuth } from 'hooks/use-auth';
import getMovieRating from 'API/GetMovieRating';

const MovieList = ({ data }) => {
  const dispatch = useDispatch();
  const { email } = useAuth();

  function handleOnClick(movieId) {
    getMovieData(dispatch, movieId);
    getCommentsByMovieId(movieId, dispatch);
    getMovieRating(email, movieId, dispatch);
  }

  if (!data || data.length === 0) {
    return (
      <></>
    )
  }
  return (
    <div className={classes.movieList}>
      {data.map((movie) =>
        <Link to='/movie' key={movie.imdbID}>
          <MovieForm
            title={movie.Title}
            year={movie.Year}
            posterURL={movie.Poster}
            key={`${movie.imdbID} + ${movie.Title} `}
            onClick={() => {
              handleOnClick(movie.imdbID);
            }}
          />
        </Link>
      )}
    </div>
  )
}

export default MovieList
