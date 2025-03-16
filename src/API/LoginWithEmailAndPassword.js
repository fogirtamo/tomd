import { setAuthError, setRegState, setUser } from "features/userSlice";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import getUserNickname from "./GetUserNickname";
import { getModalState } from "features/moviesSlice";

function loginWithEmailAndPassword(email, password, dispatch, navigate) {
  const auth = getAuth();

  signInWithEmailAndPassword(auth, email, password)
    .then(({ user }) => {
      console.log(user);
      dispatch(setUser({
        email: user.email,
        id: user.uid,
        token: user.accessToken
      }))
      getUserNickname(user.uid, dispatch);
      dispatch(getModalState(false));
      dispatch(setAuthError(null));
      navigate('/', { replace: false })
      dispatch(setRegState());
    })
    .catch((error) => {
      switch (error.code) {
        case 'auth/invalid-email':
          dispatch(setAuthError('invalid-email'));
          break;
        case 'auth/invalid-credential':
          dispatch(setAuthError('invalid-credential'));
          break;
      }
    });
}

export default loginWithEmailAndPassword;