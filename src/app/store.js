import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import moviesReducer from '../features/moviesSlice';
import userReducer from '../features/userSlice';
import storage from 'redux-persist/lib/storage';

const persistConfigMovie = {
  key: 'movies',
  storage
};

const persistConfigUser = {
  key: 'user',
  storage
};

const persistedMovieReducer = persistReducer(persistConfigMovie, moviesReducer);
const persistedUserReducer = persistReducer(persistConfigUser, userReducer);

const store = configureStore({
  reducer: {
    movies: persistedMovieReducer,
    user: persistedUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'], // Игнорируем действия, связанные с персистенцией
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
