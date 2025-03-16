import React from 'react'
import MySelect from '../UI/select/MySelect'
import MyInput from '../UI/input/MyInput'
import classes from './Filters.module.css'
import MyButton from '../UI/button/MyButton'
import { useDispatch, useSelector } from 'react-redux'
import { getMovieType, getMovieYear, selectMovies, selectMovieType, selectMovieYear, selectTitle } from '../../features/moviesSlice'
import { getMoviesData } from '../../action-creators/movies'

const Filtres = () => {
    const searchTitle = useSelector(selectTitle);
    const movieType = useSelector(selectMovieType);
    const movieYear = useSelector(selectMovieYear);
    const dispatch = useDispatch();

    function handleMouseDown(type, year) {
        getMoviesData(dispatch, searchTitle, 1, type, year);
    }

    function handleOnChangeType(type) {
        dispatch(getMovieType(type));

    }
    function handleOnChangeYear(year) {
        dispatch(getMovieYear(year));
    }

    return (
        <div className={classes.filters}>
            <span className={classes.filterSpan}>FILTERS :</span>
            <MySelect
                value={movieType}
                defaultValue='-Type-'
                onChange={e => {
                    handleOnChangeType(e)
                }}
                options={[
                    { value: 'Movie', label: 'Movie' },
                    { value: 'Series', label: 'Series' },
                    { value: 'Episode', label: 'Episode' }
                ]}
            />
            <MyInput
                value={movieYear}
                onChange={e => {
                    handleOnChangeYear(e.target.value)
                }}
                style={{ width: 130, marginLeft: 10 }}
                placeholder="Release year..."
            />
            <MyButton
                onMouseDown={() => {
                    movieType === '' ?
                        handleMouseDown('', movieYear)
                        :
                        handleMouseDown(movieType.value, movieYear)
                }}
                style={{ width: 100, marginLeft: 10 }}
            >Apply</MyButton>

        </div>
    )
}

export default Filtres


