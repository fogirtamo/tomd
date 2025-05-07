import React, { useState } from 'react';
import classes from './SignUp.module.css';
import MyInput from '../UI/input/MyInput';
import MyButton from '../UI/button/MyButton';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectRegError, selectRegState, setRegError } from 'features/userSlice';
import SignUpErrors from './SignUpErrors';
import registerWithEmailAndPassword from 'API/RegisterWithEmailAndPassword';

const SignUp = () => {
  const dispatch = useDispatch();
  const regState = useSelector(selectRegState);
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [email, setEmail] = useState('');
  const regError = useSelector(selectRegError);

  function handleOnMouseDown() {
    if (nickname.length < 3) {
      dispatch(setRegError('short-nickname'));
    } else if (password === repeatedPassword) {
      dispatch(setRegError(null));
      registerWithEmailAndPassword(email, password, nickname, dispatch);
    } else {
      dispatch(setRegError('unequal-password'));
    }
  }

  return (
    regState ? (
      <div className={classes.signUpContainer}>
        <div className={classes.backButton}>
          <Link to='/'>
            <MyButton
              data-testid="back-button"
              style={{ width: 90, height: 25, borderRadius: 5 }}
            >
              ≪ Back
            </MyButton>
          </Link>
        </div>
        <div className={classes.signUpSuccess}>
          <span>
            Registration was successful, now you can access comments and ratings.
          </span>
        </div>
      </div>
    ) : (
      <div className={classes.signUpContainer}>
        <div className={classes.backButton}>
          <Link to='/'>
            <MyButton
              data-testid="back-button"
              style={{ width: 90, height: 25, borderRadius: 5 }}
            >
              ≪ Back
            </MyButton>
          </Link>
        </div>
        <div className={classes.signUp}>
          <h2>Hello!</h2>
          <span>
            To access the full functionality of the site you need to go through a simple registration procedure. You will have the opportunity to rate and leave comments on films!
          </span>
          <SignUpErrors regError={regError} />
          <div>E-Mail:
            <MyInput
              style={{ width: 300 }}
              placeholder="E-Mail"
              onChange={(e) => { setEmail(e.target.value); }}
            />
          </div>
          <div>Login:
            <MyInput
              style={{ width: 300 }}
              placeholder="Login"
              onChange={(e) => { setNickname(e.target.value); }}
            />
          </div>
          <div>Password:
            <MyInput
              style={{ width: 300 }}
              placeholder="Password"
              onChange={(e) => { setPassword(e.target.value); }}
            />
          </div>
          <div>Repeat password:
            <MyInput
              style={{ width: 300 }}
              placeholder="Repeat password"
              onChange={(e) => { setRepeatedPassword(e.target.value); }}
            />
          </div>
          <div>
            <MyButton
              data-testid="submit-button"
              onMouseDown={handleOnMouseDown}
              style={{ width: 200 }}
            >
              Send
            </MyButton>
          </div>
        </div>
      </div>
    )
  );
};

export default SignUp;
