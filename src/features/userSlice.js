import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: null,
    token: null,
    id: null,
    nickname: null,
    regState: false,
    comments: [],
    currentRating: 0,
    myComments: [],
    myRatings: [],
    authError: null,
    regError: null
  },
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.nickname = action.payload.nickname;
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
      state.nickname = null;
    },
    setRegState(state) {
      state.regState = !state.regState
    },
    setComments(state, action) {
      state.comments = action.payload
    },
    setCurrentRating(state, action) {
      state.currentRating = action.payload
    },
    setMyComments(state, action) {
      state.myComments = action.payload
    },
    setMyRatings(state, action) {
      state.myRatings = action.payload
    },
    setAuthError(state, action) {
      state.authError = action.payload
    },
    setRegError(state, action) {
      state.regError = action.payload
    }
  },
})

export const { setUser, removeUser, setRegState, setComments, setCurrentRating, setMyComments, setMyRatings, setAuthError, setRegError } = userSlice.actions

export const selectEmail = (state) => state.user.email;
export const selectToken = (state) => state.user.token;
export const selectId = (state) => state.user.id;
export const selectRegState = (state) => state.user.regState;
export const selectComments = (state) => state.user.comments;
export const selectCurrentRating = (state) => state.user.currentRating;
export const selectMyComments = (state) => state.user.myComments;
export const selectMyRatings = (state) => state.user.myRatings;
export const selectAuthError = (state) => state.user.authError;
export const selectRegError = (state) => state.user.regError;

export default userSlice.reducer