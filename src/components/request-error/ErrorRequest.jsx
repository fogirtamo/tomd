import React from 'react'
import classes from './ErrorRequest.module.css'

const ErrorRequest = (props) => {
    return (
        <div className={classes.errorRequest} {...props}>
            Movie not found, try changing your request.
        </div>
    )
}

export default ErrorRequest
