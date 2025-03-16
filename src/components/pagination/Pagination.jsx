import React from 'react'
import classes from './Pagination.module.css'
import MyButton from '../UI/button/MyButton'
import { selectTotalResults, selectTitle, selectCurrentPage, selectMovieType, selectMovieYear } from '../../features/moviesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { getMoviesData } from '../../action-creators/movies';

const Pagination = () => {
  const searchTitle = useSelector(selectTitle);
  const totalResults = useSelector(selectTotalResults);
  const currentPage = useSelector(selectCurrentPage);
  const movieType = useSelector(selectMovieType);
  const movieYear = useSelector(selectMovieYear);
  const totalPages = Math.ceil(totalResults / 10);
  const dispatch = useDispatch();

  function handleMouseDown(number) {
    getMoviesData(dispatch, searchTitle, number, movieType.value, movieYear);
  }

  let arrTotalButtons = [];

  for (let i = 1; i <= totalPages; i++) {
    arrTotalButtons.push(i)
  }

  return (
    totalPages >= 1 ?
      <>
        <span className={classes.currentPage}>Страница {currentPage} из {totalPages}</span>
        <div className={classes.paginationContainer}>
          <div className={classes.pagination}>
            <table>
              <tbody>
                {arrTotalButtons.map((number) =>
                  <td key={number}><MyButton
                    style={{
                      width: 35,
                      marginLeft: 5,
                      border: number === currentPage && '1px solid gray',
                      background: number === currentPage && 'rgba(25, 25, 25, 1.00)'
                    }}
                    onMouseDown={() => {
                      handleMouseDown(number)
                    }}
                  >{number}</MyButton></td>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </>
      :
      <>
      </>
  )
}

export default Pagination
