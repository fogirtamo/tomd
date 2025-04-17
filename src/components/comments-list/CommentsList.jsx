import React from 'react'
import classes from './CommentsList.module.css'
import { useSelector } from 'react-redux'
import { selectComments } from 'features/userSlice'

const CommentsList = () => {
  const commentsList = useSelector(selectComments) || []; // Добавлена проверка на undefined

  return (
    commentsList.length > 0 ? (
      <div className={classes.commentsList}>
        {commentsList.map((comment) => (
          <div
            className={classes.comment}
            key={`${comment.date}`}
          >
            <div className={classes.commentInfo}>
              <div className={classes.commentInfo_nickname}>{comment.nickname}</div>
              <div className={classes.commentInfo_date}>{comment.formattedDate}</div>
            </div>
            <div className={classes.commentText}>{comment.comment}</div>
          </div>
        ))}
      </div>
    ) : (
      <></>
    )
  );
};

export default CommentsList;
