import React, { useEffect } from 'react'
import classes from './MyCommentsAndRatings.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { selectMyComments, selectMyRatings, setMyComments } from 'features/userSlice';
import getMyComments from 'API/GetMyComments';
import getMyRatings from 'API/GetMyRatings';
import { useAuth } from 'hooks/use-auth';
import MyButton from 'components/UI/button/MyButton';
import deleteMyComment from 'API/DeleteMyComment';
import { Link } from 'react-router-dom';
import { getMovieData } from 'action-creators/movies';
import getCommentsByMovieId from 'API/GetCommentsByID';
import getMovieRating from 'API/GetMovieRating';

const MyCommentsAndRatings = ({ activeSection }) => {
  const dispatch = useDispatch();
  const { email, id } = useAuth();

  // Получаем комментарии и рейтинги только один раз при монтировании компонента
  useEffect(() => {
    if (id) {
      getMyComments(id, dispatch);  // Загружаем комментарии
    }
    if (email) {
      getMyRatings(email, dispatch);  // Загружаем рейтинги
    }
  }, [id, email, dispatch]);

  const myComments = useSelector(selectMyComments);
  const myRatings = useSelector(selectMyRatings);

  const handleOnMouseDown = (userId, movieId, comment, date, dispatch) => {
    deleteMyComment(userId, movieId, comment, date, dispatch)

    // Удаляем комментарий из локального состояния, чтобы обновить интерфейс без задержки
    const updatedComments = myComments.filter(c => c.id !== comment.id);
    dispatch(setMyComments(updatedComments));

    getMyComments(userId, dispatch);
  };

  function handleOnClick(movieId) {
    getMovieData(dispatch, movieId);
    getCommentsByMovieId(movieId, dispatch);
    getMovieRating(email, movieId, dispatch);
  }

  return (
    activeSection ?
      <div className={classes.contentSection}>
        {
          myComments.length > 0 ?
            myComments.map((comment) => (
              <div
                className={classes.myComment}
                key={`${comment.date}`}>
                <div className={classes.comment}>
                  <div className={classes.commentInfo}>
                    <div
                      className={classes.commentInfo_title}
                      style={{ color: 'white' }}
                    >{comment.movieTitle}</div>
                    <div className={classes.commentInfo_date}>{comment.formattedDate}</div>
                  </div>
                  <div className={classes.commentText}>{comment.comment}</div>
                </div>
                <MyButton
                  style={{ width: 80, height: 30, marginLeft: 10, marginTop: 10 }}
                  onMouseDown={() => {
                    handleOnMouseDown(comment.userId, comment.movieId, comment.comment, comment.date, dispatch)
                  }}
                >
                  Delete
                </MyButton>


              </div>
            ))
            :
            <div>No comments available</div>
        }
      </div>
      :
      <div className={classes.contentSection}>
        <div
          className={classes.rating}
        >
          <div
            className={classes.ratingInfo}
            style={{ height: 30 }}
          >
            <div
              className={classes.ratingInfo_title}
              style={{ color: 'white', marginLeft: 100 }}
            >Title</div>
            <div
              className={classes.ratingInfo_rating}
              style={{ color: 'white' }}
            >Rating</div>
          </div>
        </div>
        {
          myRatings && myRatings.length > 0 ?
            myRatings.map((rating) => (
              <Link to='/movie' key={`${rating.movieID}`}>
                <div
                  className={classes.rating}
                  onClick={() => handleOnClick(rating.movieID)}
                >
                  <div className={classes.ratingInfo}>
                    <div className={classes.ratingInfo_title}>{rating.movieTitle}</div>
                    <div
                      className={classes.ratingInfo_rating}
                      style={{ marginRight: 21 }}
                    >{rating.rating}</div>
                  </div>
                </div>
              </Link>
            )) :
            <div>No ratings available</div>
        }
      </div>
  );
}

export default MyCommentsAndRatings
