import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import MyAccount from './MyAccount';

// Мокируем все дочерние компоненты
jest.mock('components/UI/button/MyButton', () => ({ children, style, onMouseDown }) => (
  <button
    style={style}
    onMouseDown={onMouseDown}
    data-testid="my-button"
  >
    {children}
  </button>
));

jest.mock('components/my-comments-and-ratings/MyCommentsAndRatings', () => ({ activeSection }) => (
  <div data-testid="comments-ratings">
    {activeSection ? 'Comments Section' : 'Ratings Section'}
  </div>
));

// Мокируем зависимости
jest.mock('react-router-dom', () => ({
  Link: ({ children, to }) => <a href={to} data-testid="link">{children}</a>,
  useNavigate: jest.fn(),
}));

jest.mock('hooks/use-auth', () => ({
  useAuth: jest.fn(),
}));

const mockStore = configureStore([]);

describe('MyAccount Component', () => {
  let store;
  const mockNavigate = jest.fn();

  beforeEach(() => {
    store = mockStore({});
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
    require('hooks/use-auth').useAuth.mockReturnValue({
      isAuth: true,
      email: 'test@example.com',
      nickname: 'TestUser'
    });
    jest.clearAllMocks();
  });

  // UI тесты
  describe('UI Tests', () => {
    it('renders account info when authenticated', () => {
      render(
        <Provider store={store}>
          <MyAccount />
        </Provider>
      );

      expect(screen.getByText('E-mail: test@example.com')).toBeInTheDocument();
      expect(screen.getByText('Nickname: TestUser')).toBeInTheDocument();
      expect(screen.getByTestId('link')).toHaveAttribute('href', '/');
      expect(screen.getByText('≪ Back')).toBeInTheDocument();
      expect(screen.getByText('MY COMMENTS')).toBeInTheDocument();
      expect(screen.getByText('MY RATINGS')).toBeInTheDocument();
      expect(screen.getByText('Comments Section')).toBeInTheDocument();
    });

    it('switches between comments and ratings sections', () => {
      render(
        <Provider store={store}>
          <MyAccount />
        </Provider>
      );

      fireEvent.mouseDown(screen.getByText('MY RATINGS'));
      expect(screen.getByText('Ratings Section')).toBeInTheDocument();

      fireEvent.mouseDown(screen.getByText('MY COMMENTS'));
      expect(screen.getByText('Comments Section')).toBeInTheDocument();
    });
  });

  // Юнит тесты
  describe('Unit Tests', () => {
    it('redirects to home when not authenticated', () => {
      require('hooks/use-auth').useAuth.mockReturnValue({
        isAuth: false,
        email: '',
        nickname: ''
      });

      render(
        <Provider store={store}>
          <MyAccount />
        </Provider>
      );

      expect(mockNavigate).toHaveBeenCalledWith('/', { replace: false });
    });

    it('applies active styles to buttons', () => {
      render(
        <Provider store={store}>
          <MyAccount />
        </Provider>
      );

      const commentsButton = screen.getByText('MY COMMENTS');
      const ratingsButton = screen.getByText('MY RATINGS');

      // Проверяем начальное состояние
      expect(commentsButton).toHaveStyle({
        border: '1px solid gray',
        background: 'rgba(20, 20, 20, 1.00)'
      });

      // Переключаемся на рейтинги
      fireEvent.mouseDown(ratingsButton);

      // Проверяем обновленные стили
      expect(ratingsButton).toHaveStyle({
        border: '1px solid gray',
        background: 'rgba(20, 20, 20, 1.00)'
      });
      expect(commentsButton).not.toHaveStyle({
        border: '1px solid gray',
        background: 'rgba(20, 20, 20, 1.00)'
      });
    });
  });
});