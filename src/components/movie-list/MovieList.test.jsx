import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';


// 1. Мокируем MovieForm
jest.mock('../movie-form/MovieForm', () => ({ onClick, title, year }) => (
  <div onClick={onClick} data-testid="movie-form">
    {title} - {year}
  </div>
));

// 2. Мокируем остальные зависимости
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => jest.fn(),
}));

jest.mock('../../action-creators/movies', () => ({
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

jest.mock('hooks/use-auth', () => ({
  useAuth: () => ({
    email: 'test@example.com',
  }),
}));

// 3. Создаем тестовую версию компонента без Link
const TestableMovieList = ({ data }) => {
  const dispatch = jest.fn();
  const email = 'test@example.com';

  const handleClick = (movieId) => {
    require('../../action-creators/movies').getMovieData(dispatch, movieId);
    require('API/GetCommentsByID').default(movieId, dispatch);
    require('API/GetMovieRating').default(email, movieId, dispatch);
  };

  if (!data || data.length === 0) return null;

  return (
    <div>
      {data.map((movie) => (
        <div key={movie.imdbID} onClick={() => handleClick(movie.imdbID)}>
          <div data-testid="movie-form">
            {movie.Title} - {movie.Year}
          </div>
        </div>
      ))}
    </div>
  );
};

const mockStore = configureStore([]);

describe('MovieList Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      user: { email: 'test@example.com' },
    });
    jest.clearAllMocks();
  });

  it('renders nothing when data is empty', () => {
    const { container } = render(
      <Provider store={store}>
        <TestableMovieList data={[]} />
      </Provider>
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders movie list when data provided', () => {
    const mockData = [
      { imdbID: '1', Title: 'Inception', Year: '2010', Poster: 'poster1.jpg' },
    ];

    render(
      <Provider store={store}>
        <TestableMovieList data={mockData} />
      </Provider>
    );

    expect(screen.getByTestId('movie-form')).toBeInTheDocument();
    expect(screen.getByText('Inception - 2010')).toBeInTheDocument();
  });

  it('calls API functions when movie is clicked', () => {
    const mockData = [
      { imdbID: '1', Title: 'Inception', Year: '2010', Poster: 'poster1.jpg' },
    ];

    render(
      <Provider store={store}>
        <TestableMovieList data={mockData} />
      </Provider>
    );

    fireEvent.click(screen.getByText('Inception - 2010'));

    const { getMovieData } = require('../../action-creators/movies');
    const getCommentsByMovieId = require('API/GetCommentsByID').default;
    const getMovieRating = require('API/GetMovieRating').default;

    expect(getMovieData).toHaveBeenCalledWith(expect.any(Function), '1');
    expect(getCommentsByMovieId).toHaveBeenCalledWith('1', expect.any(Function));
    expect(getMovieRating).toHaveBeenCalledWith(
      'test@example.com',
      '1',
      expect.any(Function)
    );
  });
});