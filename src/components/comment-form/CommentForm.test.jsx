import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import * as authHook from 'hooks/use-auth';
import CommentForm from './CommentForm';
import * as addCommentAPI from 'API/AddCommentToMovie';
import * as moviesAPI from 'API/GetCommentsByID';
import moviesReducer from 'features/moviesSlice';
import '@testing-library/jest-dom'; // Добавлен импорт

describe('CommentForm', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        movies: moviesReducer,
      },
      preloadedState: {
        movies: {
          movie: {
            imdbID: 'tt1234567',
            Title: 'Test Movie',
          },
        },
      },
    });

    jest.clearAllMocks();
  });

  it('renders the form when the user is authenticated', () => {
    jest.spyOn(authHook, 'useAuth').mockReturnValue({ isAuth: true, nickname: 'TestUser', id: '123' });

    render(
      <Provider store={store}>
        <CommentForm />
      </Provider>
    );

    expect(screen.getByPlaceholderText('Leave your comment...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });

  it('does not render the form when the user is not authenticated', () => {
    jest.spyOn(authHook, 'useAuth').mockReturnValue({ isAuth: false });

    render(
      <Provider store={store}>
        <CommentForm />
      </Provider>
    );

    expect(screen.queryByPlaceholderText('Leave your comment...')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /send/i })).not.toBeInTheDocument();
  });

  it('disables the button when comment is empty', () => {
    jest.spyOn(authHook, 'useAuth').mockReturnValue({ isAuth: true });

    render(
      <Provider store={store}>
        <CommentForm />
      </Provider>
    );

    const button = screen.getByRole('button', { name: /send/i });
    expect(button).toBeDisabled();
  });

  it('enables the button when the comment is not empty', () => {
    jest.spyOn(authHook, 'useAuth').mockReturnValue({ isAuth: true });

    render(
      <Provider store={store}>
        <CommentForm />
      </Provider>
    );

    const textarea = screen.getByPlaceholderText('Leave your comment...');
    fireEvent.change(textarea, { target: { value: 'Test comment' } });

    const button = screen.getByRole('button', { name: /send/i });
    expect(button).not.toBeDisabled();
  });

  it('calls APIs correctly when comment is submitted', () => {
    jest.spyOn(authHook, 'useAuth').mockReturnValue({ isAuth: true, nickname: 'TestUser', id: '123' });
    const addCommentSpy = jest.spyOn(addCommentAPI, 'default').mockImplementation(() => { });
    const getCommentsSpy = jest.spyOn(moviesAPI, 'default').mockImplementation(() => { });

    render(
      <Provider store={store}>
        <CommentForm />
      </Provider>
    );

    const textarea = screen.getByPlaceholderText('Leave your comment...');
    const button = screen.getByRole('button', { name: /send/i });

    fireEvent.change(textarea, { target: { value: 'Test comment' } });
    fireEvent.mouseDown(button);

    expect(addCommentSpy).toHaveBeenCalledWith('TestUser', '123', 'Test comment', 'tt1234567', 'Test Movie');
    expect(getCommentsSpy).toHaveBeenCalledWith('tt1234567', expect.any(Function));
  });

  it('does not call APIs when movieData is missing', () => {
    const emptyStore = configureStore({
      reducer: {
        movies: moviesReducer,
      },
      preloadedState: {
        movies: {
          movie: null, // movieData отсутствует
        },
      },
    });

    jest.spyOn(authHook, 'useAuth').mockReturnValue({ isAuth: true });
    const addCommentSpy = jest.spyOn(addCommentAPI, 'default').mockImplementation(() => { });
    const getCommentsSpy = jest.spyOn(moviesAPI, 'default').mockImplementation(() => { });

    render(
      <Provider store={emptyStore}>
        <CommentForm />
      </Provider>
    );

    const textarea = screen.getByPlaceholderText('Leave your comment...');
    const button = screen.getByRole('button', { name: /send/i });

    fireEvent.change(textarea, { target: { value: 'Test comment' } });
    fireEvent.mouseDown(button);

    expect(addCommentSpy).not.toHaveBeenCalled();
    expect(getCommentsSpy).not.toHaveBeenCalled();
  });
});