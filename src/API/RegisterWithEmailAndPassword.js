import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setRegError, setRegState, setUser } from 'features/userSlice'
import addNewUser from "./AddNewUser";

function registerWithEmailAndPassword(email, password, nickname, dispatch) {
  const auth = getAuth();

  createUserWithEmailAndPassword(auth, email, password)
    .then(({ user }) => {
      console.log(user);
      dispatch(setUser({
        email: user.email,
        token: user.accessToken,
        id: user.uid,
        nickname: nickname
      }));
      addNewUser(email, nickname, user.uid);
      dispatch(setRegState());
    })
    .catch((error) => {
      switch (error.code) {
        case 'auth/email-already-in-use':
          dispatch(setRegError('email-already-in-use'));
          break;
        case 'auth/missing-email':
          dispatch(setRegError('missing-email'));
          break;
        case 'auth/invalid-email':
          dispatch(setRegError('invalid-email'));
          break;
        case 'auth/missing-password':
          dispatch(setRegError('missing-password'));
          break;
        case 'auth/weak-password':
          dispatch(setRegError('weak-password'));
          break;
        default:
          dispatch(setRegError('unknown-error'));
      }
    });
}

export default registerWithEmailAndPassword;