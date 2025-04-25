import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import MoviePage from './MoviePage';

// Мокируем все дочерние компоненты и зависимости
jest.mock('../UI/button/MyButton', () => ({ children, style }) => (
  <button style={style} data-testid="my-button">{children}</button>
));

jest.mock('../request-error/ErrorRequest', () => ({ style }) => (
  <div style={style} data-testid="error-request">Error Request</div>
));

jest.mock('components/rating/MyRating', () => () => (
  <div data-testid="my-rating">Rating Component</div>
));

jest.mock('components/comment-form/CommentForm', () => () => (
  <div data-testid="comment-form">Comment Form</div>
));

jest.mock('components/comments-list/CommentsList', () => () => (
  <div data-testid="comments-list">Comments List</div>
));

jest.mock('react-router-dom', () => ({
  Link: ({ children, to }) => <a href={to} data-testid="link">{children}</a>,
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

const mockStore = configureStore([]);

describe('MoviePage Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    jest.clearAllMocks();
  });

  // UI тесты
  describe('UI Tests', () => {
    it('renders error when no movie data', () => {
      require('react-redux').useSelector.mockImplementation(selector => {
        if (selector.name === 'selectMovie') return null;
        if (selector.name === 'selectMovies') return null;
        return {};
      });

      render(
        <Provider store={store}>
          <MoviePage />
        </Provider>
      );

      expect(screen.getByTestId('error-request')).toBeInTheDocument();
      expect(screen.getByTestId('my-button')).toHaveTextContent('≪ Back');
    });

    it('renders full movie page when data exists', () => {
      const mockMovie = {
        Poster: 'test-poster.jpg',
        Title: 'Test Movie',
        Year: '2023',
        Type: 'movie',
        Rated: 'PG-13',
        Runtime: '120 min',
        Genre: 'Action, Adventure',
        Director: 'Test Director',
        Writer: 'Test Writer',
        Actors: 'Actor 1, Actor 2',
        Country: 'USA',
        Language: 'English',
        Awards: 'Oscar',
        BoxOffice: '$100M',
        Ratings: [
          { Source: 'IMDb', Value: '8.5/10' },
          { Source: 'Rotten Tomatoes', Value: '90%' }
        ],
        Plot: 'Test plot description'
      };

      require('react-redux').useSelector.mockImplementation(selector => {
        if (selector.name === 'selectMovie') return mockMovie;
        if (selector.name === 'selectMovies') return [];
        return {};
      });

      render(
        <Provider store={store}>
          <MoviePage />
        </Provider>
      );

      expect(screen.getByText('Test Movie')).toBeInTheDocument();
      expect(screen.getByText('2023')).toBeInTheDocument();
      expect(screen.getByText('movie')).toBeInTheDocument();
      expect(screen.getByText('PG-13')).toBeInTheDocument();
      expect(screen.getByText('120 min')).toBeInTheDocument();
      expect(screen.getByText('Action, Adventure')).toBeInTheDocument();
      expect(screen.getByText('Test Director')).toBeInTheDocument();
      expect(screen.getByText('Test Writer')).toBeInTheDocument();
      expect(screen.getByText('Actor 1, Actor 2')).toBeInTheDocument();
      expect(screen.getByText('USA')).toBeInTheDocument();
      expect(screen.getByText('English')).toBeInTheDocument();
      expect(screen.getByText('Oscar')).toBeInTheDocument();
      expect(screen.getByText('$100M')).toBeInTheDocument();
      expect(screen.getByText('IMDb: 8.5/10, Rotten Tomatoes: 90%, Metacritic: N/A')).toBeInTheDocument();
      expect(screen.getByText('Test plot description')).toBeInTheDocument();
      expect(screen.getByTestId('my-rating')).toBeInTheDocument();
      expect(screen.getByTestId('comment-form')).toBeInTheDocument();
      expect(screen.getByTestId('comments-list')).toBeInTheDocument();
    });
  });

  // Юнит тесты
  describe('Unit Tests', () => {
    it('renders back button with correct link when moviesData is null', () => {
      require('react-redux').useSelector.mockImplementation(selector => {
        if (selector.name === 'selectMovie') return null;
        if (selector.name === 'selectMovies') return null;
        return {};
      });

      render(
        <Provider store={store}>
          <MoviePage />
        </Provider>
      );

      expect(screen.getByTestId('link')).toHaveAttribute('href', '/');
    });

    it('renders back button with search link when moviesData exists', () => {
      require('react-redux').useSelector.mockImplementation(selector => {
        if (selector.name === 'selectMovie') return null;
        if (selector.name === 'selectMovies') return [{}, {}];
        return {};
      });

      render(
        <Provider store={store}>
          <MoviePage />
        </Provider>
      );

      expect(screen.getByTestId('link')).toHaveAttribute('href', '/search');
    });
  });
});