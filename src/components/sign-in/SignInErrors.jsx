import React from 'react'
import classes from './SignIn.module.css'

const SignInErrors = ({ authError }) => {
  switch (authError) {
    case 'invalid-email':
      return <span className={classes.authError}> <h4>Error:</h4><span>Invalid email</span></span>
    case 'invalid-credential':
      return <span className={classes.authError}> <h4>Error:</h4><span>Incorrect email or password</span></span>
    default:
      return <></>;
  }
}

export default SignInErrors
