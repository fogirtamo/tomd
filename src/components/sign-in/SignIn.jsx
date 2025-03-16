import React, { useEffect, useState } from 'react'
import classes from './SignIn.module.css'
import MyInput from '../UI/input/MyInput'
import MyButton from '../UI/button/MyButton'
import { useDispatch, useSelector } from 'react-redux'
import { getModalState, selectModalState } from '../../features/moviesSlice'
import { selectAuthError, setAuthError } from 'features/userSlice'
import SignInErrors from './SignInErrors'
import { useNavigate } from 'react-router-dom'
import loginWithEmailAndPassword from 'API/LoginWithEmailAndPassword'

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authError = useSelector(selectAuthError);
  const modalState = useSelector(selectModalState);

  useEffect(() => {
    if (modalState) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [modalState]);

  function handleOnClick(state) {
    dispatch(getModalState(state));
    dispatch(setAuthError(null));
  }

  return (
    modalState ?
      <div className={`${classes.modal} ${modalState ? classes.active : ''}`}
        onClick={() => {
          handleOnClick(false)
        }}
      >
        <div className={classes.modalContent}
          onClick={(e) => e.stopPropagation()
          }
        >
          <span>User authorization</span>
          <SignInErrors
            authError={authError}
          />
          <MyInput
            style={{ width: 350 }}
            placeholder="E-mail"
            onChange={(e) => { setEmail(e.target.value) }}
          />
          <MyInput
            style={{ width: 350 }}
            placeholder="Password"
            onChange={(e) => { setPassword(e.target.value) }}
          />
          <MyButton
            onMouseDown={() => {
              loginWithEmailAndPassword(email, password, dispatch, navigate)
            }}
            style={{ width: 200 }}>ENTER
          </MyButton>
        </div>
      </div>
      :
      <></>
  )
}

export default SignIn

