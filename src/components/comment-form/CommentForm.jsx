import { useAuth } from 'hooks/use-auth';
import React, { useState } from 'react'
import classes from './CommentForm.module.css'
import MyButton from 'components/UI/button/MyButton';
import { useDispatch, useSelector } from 'react-redux';
import { selectMovie } from 'features/moviesSlice';
import getCommentsByMovieId from 'API/GetCommentsByID';
import addCommentToMovie from 'API/AddCommentToMovie';

const CommentForm = () => {
  const dispatch = useDispatch();
  const { isAuth, nickname, id } = useAuth();
  const [comment, setComment] = useState('');
  const movieData = useSelector(selectMovie);

  function handleOnMauseDown() {
    if (comment.length > 0 && movieData) { // Проверка на наличие movieData
      addCommentToMovie(nickname, id, comment, movieData.imdbID, movieData.Title);
      setComment('');
      getCommentsByMovieId(movieData.imdbID, dispatch);
    }
  }

  return (
    isAuth ?
      <div className={classes.myCommentContainer}>
        <textarea
          className={classes.myComment}
          value={comment}
          onChange={e => {
            setComment(e.target.value);
          }}
          placeholder="Leave your comment..."
          type="text"
          autoComplete='off'
        />
        <MyButton
          style={{ width: 100, height: 30, marginLeft: 10 }}
          onMouseDown={handleOnMauseDown}
          disabled={comment.length === 0} // Кнопка отключена, если комментарий пуст
        >
          Send
        </MyButton>
      </div>
      :
      <></>
  )
}

export default CommentForm


