import React from 'react'
import classes from './SignUp.module.css'

const SignUpErrors = ({ regError }) => {
    switch (regError) {
        case 'unequal-password':
            return <span className={classes.regError}> <h4>Error:</h4><span>The passwords entered do not match</span></span>
        case 'email-already-in-use':
            return <span className={classes.regError}> <h4>Error:</h4><span>This email is already in use</span></span>
        case 'missing-email':
            return <span className={classes.regError}> <h4>Error:</h4><span>Enter your email</span></span>
        case 'invalid-email':
            return <span className={classes.regError}> <h4>Error:</h4><span>Invalid email</span></span>
        case 'missing-password':
            return <span className={classes.regError}> <h4>Error:</h4><span>Enter your password</span></span>
        case 'weak-password':
            return <span className={classes.regError}> <h4>Error:</h4><span>Weak password (must contain at least 6 symbols)</span></span>
        case 'short-nickname':
            return <span className={classes.regError}> <h4>Error:</h4><span>Short nickname (must contain at least 3 symbols)</span></span>
        default:
            return <></>;
    }
}

export default SignUpErrors
