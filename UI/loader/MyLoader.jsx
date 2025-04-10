import React from 'react'
import classes from './MyLoader.module.css'

const MyLoader = ({ ...prop }) => {
  return (
    <div className={classes.loader}
      {...prop}
    >
    </div>
  )
}

export default MyLoader
