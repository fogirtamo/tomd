import React from 'react'
import { useSelector } from 'react-redux'
import { selectMovieLoading } from '../features/moviesSlice'
import MyLoader from './UI/loader/MyLoader'
import MoviePage from './movie-page/MoviePage'

const AppMovie = () => {
    const movieLoading = useSelector(selectMovieLoading);

    return (
        movieLoading ?
            <MyLoader
                style={{ marginBottom: 250 }}
            />
            :
            <MoviePage />
    )
}

export default AppMovie
