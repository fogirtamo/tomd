import React from 'react'
import classes from './MoviePage.module.css'
import { Link } from 'react-router-dom'
import MyButton from '../UI/button/MyButton'
import { useSelector } from 'react-redux'
import { selectMovie, selectMovies } from '../../features/moviesSlice'
import ErrorRequest from '../request-error/ErrorRequest'
import MyRating from 'components/rating/MyRating'
import CommentForm from 'components/comment-form/CommentForm'
import CommentsList from 'components/comments-list/CommentsList'

const MoviePage = () => {
    const movieData = useSelector(selectMovie);
    const moviesData = useSelector(selectMovies);

    if (!movieData) {
        return (
            <div className={classes.moviePage}>
                <div className={classes.backButton}>
                    <Link to={moviesData === null ? '/' : '/search'}>
                        <MyButton style={{ width: 90, height: 25, borderRadius: 5 }}>≪ Back</MyButton>
                    </Link>
                </div>
                <ErrorRequest style={{ marginBottom: 450 }} />
            </div>
        )
    }

    return (
        <div className={classes.moviePage}>
            <div className={classes.backButton}>
                <Link to={moviesData === null ? '/' : '/search'}>
                    <MyButton style={{ width: 90, height: 25, borderRadius: 5 }}>≪ Back</MyButton>
                </Link>
            </div>
            <div className={classes.movieContainer}>
                <img src={movieData.Poster} className={classes.moviePoster} />
                <div className={classes.movieInfo}>
                    <div className={classes.movieTitle}>
                        <span>title</span>
                        <span>{movieData.Title}</span>
                    </div>
                    <div className={classes.movieYear}>
                        <span>year</span>
                        <span>{movieData.Year}</span>
                    </div>
                    <div className={classes.movieType}>
                        <span>type</span>
                        <span>{movieData.Type}</span>
                    </div>
                    <div className={classes.movieRated}>
                        <span>rated</span>
                        <span>{movieData.Rated}</span>
                    </div>
                    <div className={classes.movieRuntime}>
                        <span>runtime</span>
                        <span>{movieData.Runtime}</span>
                    </div>
                    <div className={classes.movieGenre}>
                        <span>genre</span>
                        <span>{movieData.Genre}</span>
                    </div>
                    <div className={classes.movieDirector}>
                        <span>director</span>
                        <span>{movieData.Director}</span>
                    </div>
                    <div className={classes.movieWriter}>
                        <span>writer</span>
                        <span>{movieData.Writer}</span>
                    </div>
                    <div className={classes.movieActors}>
                        <span>actors</span>
                        <span>{movieData.Actors}</span>
                    </div>
                    <div className={classes.movieCountry}>
                        <span>country</span>
                        <span>{movieData.Country}</span>
                    </div>
                    <div className={classes.movieLanguage}>
                        <span>language</span>
                        <span>{movieData.Language}</span>
                    </div>
                    <div className={classes.movieAwards}>
                        <span>awards</span>
                        <span>{movieData.Awards}</span>
                    </div>
                    <div className={classes.movieBoxOffice}>
                        <span>boxOffice</span>
                        <span>{movieData.BoxOffice}</span>
                    </div>
                    <div className={classes.movieRatings}>
                        <span>ratings</span>
                        <span>IMDb: {movieData.Ratings[0] ? movieData.Ratings[0].Value : 'N/A'}, Rotten Tomatoes: {movieData.Ratings[1] ? movieData.Ratings[1].Value : 'N/A'}, Metacritic: {movieData.Ratings[2] ? movieData.Ratings[2].Value : 'N/A'}</span>
                    </div>
                    <MyRating />
                </div>
            </div>
            <div className={classes.moviePlot}>
                <h3>About the film</h3>
                <span>
                    {movieData.Plot}
                </span>
            </div>
            <CommentForm />
            <CommentsList />
        </div>
    )
}

export default MoviePage
