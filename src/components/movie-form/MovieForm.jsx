import React from 'react'
import classes from './MovieForm.module.css'


const MovieForm = ({ title, year, posterURL, id, onClick }) => {
  return (
    <div className={classes.movieForm}
      key={id}
      onClick={onClick}
    >
      <img className={classes.moviePoster} src={posterURL}></img>
      <div className={classes.movieTitle}>{title}</div>
      <div className={classes.movieInfo}>
        <h4>{year}</h4>
      </div>
    </div>
  )
}

export default MovieForm
