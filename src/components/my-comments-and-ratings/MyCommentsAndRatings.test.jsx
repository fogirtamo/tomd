import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import MyCommentsAndRatings from './MyCommentsAndRatings';

// Мокируем все зависимости
jest.mock('components/UI/button/MyButton', () => ({ children, style, onMouseDown }) => (
  <button
    style={style}
    onMouseDown={onMouseDown}
    data-testid="my-button"
  >
    {children}
  </button>
));

jest.mock('react-router-dom', () => ({
  Link: ({ children, to }) => <a href={to} data-testid="link">{children}</a>,
}));

jest.mock('hooks/use-auth', () => ({
  useAuth: () => ({
    email: 'test@example.com',
    id: 'user123'
  }),
}));

jest.mock('API/GetMyComments', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('API/GetMyRatings', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('API/DeleteMyComment', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('action-creators/movies', () => ({
  getMovieData: jest.fn(),
}));

jest.mock('API/GetCommentsByID', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('API/GetMovieRating', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => jest.fn(),
  useSelector: jest.fn(),
}));

const mockStore = configureStore([]);

describe('MyCommentsAndRatings Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    jest.clearAllMocks();
  });

  // UI тесты для секции комментариев
  describe('Comments Section', () => {
    const mockComments = [
      {
        id: '1',
        movieTitle: 'Test Movie',
        formattedDate: '2023-01-01',
        comment: 'Great movie!',
        userId: 'user123',
        movieId: 'movie123',
        date: '20230101'
      }
    ];

    beforeEach(() => {
      require('react-redux').useSelector.mockImplementation(selector => {
        if (selector.name === 'selectMyComments') return mockComments;
        if (selector.name === 'selectMyRatings') return [];
        return {};
      });
    });

    it('renders comments when activeSection is true', () => {
      render(
        <Provider store={store}>
          <MyCommentsAndRatings activeSection={true} />
        </Provider>
      );

      expect(screen.getByText('Test Movie')).toBeInTheDocument();
      expect(screen.getByText('2023-01-01')).toBeInTheDocument();
      expect(screen.getByText('Great movie!')).toBeInTheDocument();
      expect(screen.getByText('Delete')).toBeInTheDocument();
    });

    it('calls deleteMyComment when delete button clicked', () => {
      render(
        <Provider store={store}>
          <MyCommentsAndRatings activeSection={true} />
        </Provider>
      );

      fireEvent.mouseDown(screen.getByText('Delete'));
      expect(require('API/DeleteMyComment').default).toHaveBeenCalled();
    });

    it('shows "No comments available" when no comments', () => {
      require('react-redux').useSelector.mockImplementation(selector => {
        if (selector.name === 'selectMyComments') return [];
        if (selector.name === 'selectMyRatings') return [];
        return {};
      });

      render(
        <Provider store={store}>
          <MyCommentsAndRatings activeSection={true} />
        </Provider>
      );

      expect(screen.getByText('No comments available')).toBeInTheDocument();
    });
  });

  // UI тесты для секции рейтингов
  describe('Ratings Section', () => {
    const mockRatings = [
      {
        movieID: 'movie123',
        movieTitle: 'Test Movie',
        rating: '8.5'
      }
    ];

    beforeEach(() => {
      require('react-redux').useSelector.mockImplementation(selector => {
        if (selector.name === 'selectMyComments') return [];
        if (selector.name === 'selectMyRatings') return mockRatings;
        return {};
      });
    });

    it('renders ratings when activeSection is false', () => {
      render(
        <Provider store={store}>
          <MyCommentsAndRatings activeSection={false} />
        </Provider>
      );

      expect(screen.getByText('Test Movie')).toBeInTheDocument();
      expect(screen.getByText('8.5')).toBeInTheDocument();
    });

    it('calls API functions when rating item clicked', () => {
      render(
        <Provider store={store}>
          <MyCommentsAndRatings activeSection={false} />
        </Provider>
      );

      fireEvent.click(screen.getByText('Test Movie'));

      expect(require('action-creators/movies').getMovieData).toHaveBeenCalled();
      expect(require('API/GetCommentsByID').default).toHaveBeenCalled();
      expect(require('API/GetMovieRating').default).toHaveBeenCalled();
    });

    it('shows "No ratings available" when no ratings', () => {
      require('react-redux').useSelector.mockImplementation(selector => {
        if (selector.name === 'selectMyComments') return [];
        if (selector.name === 'selectMyRatings') return [];
        return {};
      });

      render(
        <Provider store={store}>
          <MyCommentsAndRatings activeSection={false} />
        </Provider>
      );

      expect(screen.getByText('No ratings available')).toBeInTheDocument();
    });
  });
});