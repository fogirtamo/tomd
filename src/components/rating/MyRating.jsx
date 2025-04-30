import MyButton from 'components/UI/button/MyButton';
import React from 'react'
import classes from './MyRating.module.css'
import { useAuth } from 'hooks/use-auth';
import addRatingToMovie from 'API/AddRatingToMovie';
import { selectMovie } from 'features/moviesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentRating, setCurrentRating } from 'features/userSlice';

const MyRating = () => {
  const dispatch = useDispatch();
  const movieData = useSelector(selectMovie);
  const { isAuth, email } = useAuth();
  const arrNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const currentRating = useSelector(selectCurrentRating);

  if (!isAuth) {
    return null; // Если пользователь не авторизован, ничего не рендерим
  }

  if (!movieData) {
    return <div>No movie data available</div>; // Обработка отсутствия movieData
  }

  function handleOnMouseDown(number) {
    if (!movieData) return;
    dispatch(setCurrentRating(number));
    if (number > 0) {
      addRatingToMovie(email, movieData.imdbID, number, movieData.Title);
    }
  }

  return (
    <div className={classes.myRating}>
      <span>my rating</span>
      <span>
        {arrNumbers.map((number) => (
          <button
            key={number}
            className="myBtn"
            id={number}
            style={{
              width: '35px',
              marginLeft: '5px',
              borderRadius: '50px',
              background: number === currentRating ? 'rgba(20, 20, 20, 1.00)' : 'rgb(28, 28, 28)',
              border: number === currentRating ? '2px solid gray' : 'none',
            }}
            onMouseDown={() => handleOnMouseDown(number)}
          >
            {number}
          </button>
        ))}
      </span>
    </div>
  );
};

export default MyRating;