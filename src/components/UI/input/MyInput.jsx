import React, { useState } from 'react';
import classes from './MyInput.module.css';

const MyInput = React.forwardRef((props, ref) => {
  const [placeholder, setPlaceholder] = useState(props.placeholder || '');

  const handleFocus = () => {
    setPlaceholder('');
  };

  const handleBlur = () => {
    setPlaceholder(props.placeholder || '');
  };

  return (
    <input
      ref={ref}
      className={classes.myInput}
      {...props}
      placeholder={placeholder}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
});

export default MyInput;
