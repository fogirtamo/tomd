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

  function handleOnMouseDown(number) {
    dispatch(setCurrentRating(number));
    if (number > 0) {
      addRatingToMovie(email, movieData.imdbID, number, movieData.Title);
    }
  }

  return (
    isAuth ?
      <div className={classes.myRating}>
        <span>my rating</span>
        <span>
          {
            arrNumbers.map((number) => {
              return (
                <MyButton
                  key={number}
                  style={{
                    width: 35,
                    marginLeft: 5,
                    border: currentRating === number && '2px solid gray',
                    borderRadius: '50px',
                    background: currentRating === number ? 'rgba(20, 20, 20, 1.00)' : 'rgba(28, 28, 28, 1.00)'
                  }}
                  onMouseDown={() => {
                    handleOnMouseDown(number, email, movieData.imbdID, currentRating)
                  }}
                >{number}</MyButton>
              )
            })
          }
        </span>
      </div>
      :
      <></>
  )
}

export default MyRating
