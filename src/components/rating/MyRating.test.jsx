import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import MyRating from './MyRating';
import addRatingToMovie from 'API/AddRatingToMovie';

jest.mock('API/AddRatingToMovie', () => jest.fn());
jest.mock('hooks/use-auth', () => ({
  useAuth: () => ({
    isAuth: true,
    email: 'test@example.com',
  }),
}));

const mockStore = configureStore([]);

describe('MyRating', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      movies: { movie: { imdbID: 'tt1234567', Title: 'Test Movie' } },
      user: { currentRating: 5 },
    });
  });

  // === UI Tests ===
  describe('UI Tests', () => {
    it('renders the rating buttons when the user is authenticated', () => {
      render(
        <Provider store={store}>
          <MyRating />
        </Provider>
      );

      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(10); // 10 buttons for ratings
      expect(screen.getByText('my rating')).toBeInTheDocument();
    });

    it('does not render anything when the user is not authenticated', () => {
      // Динамически изменяем возвращаемое значение useAuth
      const mockUseAuth = jest.spyOn(require('hooks/use-auth'), 'useAuth');
      mockUseAuth.mockReturnValue({
        isAuth: false, // Пользователь не авторизован
        email: null,
      });

      render(
        <Provider store={store}>
          <MyRating />
        </Provider>
      );

      // Проверяем, что текст "my rating" не отображается
      expect(screen.queryByText('my rating')).not.toBeInTheDocument();

      // Восстанавливаем оригинальное поведение useAuth
      mockUseAuth.mockRestore();
    });

    it('applies the correct styles to the selected rating button', () => {
      render(
        <Provider store={store}>
          <MyRating />
        </Provider>
      );

      const selectedButton = screen.getByText('5');
      expect(selectedButton).toHaveStyle('border: 2px solid gray');
      expect(selectedButton).toHaveStyle('background: rgba(20, 20, 20, 1.00)');
    });
  });

  // === Unit Tests ===
  describe('Unit Tests', () => {
    it('dispatches the correct action and calls API when a rating button is clicked', () => {
      render(
        <Provider store={store}>
          <MyRating />
        </Provider>
      );

      const button = screen.getByText('7');
      fireEvent.mouseDown(button);

      const actions = store.getActions();
      expect(actions).toContainEqual({ type: 'user/setCurrentRating', payload: 7 });
      expect(addRatingToMovie).toHaveBeenCalledWith(
        'test@example.com',
        'tt1234567',
        7,
        'Test Movie'
      );
    });

    it('does not call API if the rating is not clicked', () => {
      render(
        <Provider store={store}>
          <MyRating />
        </Provider>
      );

      expect(addRatingToMovie).not.toHaveBeenCalled();
    });

    it('does not call API if movieData is missing', () => {
      const emptyStore = mockStore({
        movies: { movie: null }, // movieData отсутствует
        user: { currentRating: 5 },
      });

      render(
        <Provider store={emptyStore}>
          <MyRating />
        </Provider>
      );

      // Проверяем, что отображается сообщение
      expect(screen.getByText((content) => content.includes('No movie data available'))).toBeInTheDocument();

      // Проверяем, что кнопки не отображаются
      const button = screen.queryByText('5');
      expect(button).not.toBeInTheDocument();

      // Проверяем, что API не вызывается
      expect(addRatingToMovie).not.toHaveBeenCalled();
    });
  });
});