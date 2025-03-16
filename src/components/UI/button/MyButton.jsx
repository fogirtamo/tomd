import React from 'react';
import classes from './MyButton.module.css'
import { useState } from 'react';

const MyButton = ({ children, disable, ...props }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);

    // Сброс состояния после анимации
    setTimeout(() => setIsClicked(false), 100); // Длительность совпадает с CSS-анимацией
  };

  return (
    <button id={children} disabled={disable} {...props} className={`${classes.myBtn} ${isClicked ? classes.transformed : ''}`}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}

export default MyButton
