import React, { useState } from 'react';
import classes from './MyButton.module.css';

const MyButton = ({ children, disable, onClick, ...props }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    setIsClicked(true);

    // Сброс состояния после анимации
    setTimeout(() => {
      setIsClicked(false);
    }, 100); // Длительность совпадает с CSS-анимацией
  };

  return (
    <button
      id={children}
      disabled={disable}
      {...props}
      className={`${classes.myBtn} ${isClicked ? classes.transformed : ''}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default MyButton;
