import { useAuth } from 'hooks/use-auth';
import React from 'react'
import { useDispatch } from 'react-redux';
import { removeUser, setRegState } from 'features/userSlice';
import MyButton from './UI/button/MyButton';
import { Link } from 'react-router-dom';
import SignIn from './sign-in/SignIn';
import { getModalState } from 'features/moviesSlice';

const AppAuth = () => {
    const dispatch = useDispatch();
    const { isAuth, nickname } = useAuth();

    function handleOnMouseDownSignIn(state) {
        dispatch(getModalState(state));
    }

    function handleOnMouseDownLogOut(state) {
        dispatch(removeUser());
        dispatch(setRegState());
    }

    return (
        isAuth ?
            <div className='Auth-container'>
                <span>Hello, <h4 style={{ marginRight: 3, marginLeft: 6 }}>{nickname}</h4>!</span>
                <div className='App-auth'>
                    <Link to='/account'>
                        <MyButton style={{ width: 200 }}>MY ACCOUNT</MyButton>
                    </Link>
                    <MyButton
                        style={{ width: 140 }}
                        onMouseDown={handleOnMouseDownLogOut}
                    >LOG OUT</MyButton>
                    <Link to='/questions'>
                        <MyButton style={{ width: 50 }}>?</MyButton>
                    </Link>
                    <SignIn />
                </div>
            </div>
            :
            <div className='App-auth'>
                <MyButton
                    style={{ width: 170 }}
                    onMouseDown={() => {
                        handleOnMouseDownSignIn(true)
                    }}
                >SIGN IN</MyButton>
                <Link to='/register'>
                    <MyButton
                        style={{ width: 170 }}
                    // onMouseDown={() => {
                    //     dispatch(setRegState())
                    // }}
                    >SIGN UP</MyButton>
                </Link>
                <Link to='/questions'>
                    <MyButton style={{ width: 50 }}>?</MyButton>
                </Link>
                <SignIn />
            </div >
    )
}

export default AppAuth
