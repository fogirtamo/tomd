import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { useDispatch } from 'react-redux';
import Filters from './Filters';
import '@testing-library/jest-dom';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

const mockStore = configureStore([]);
const mockDispatch = jest.fn();

describe('Filters Component', () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
    jest.clearAllMocks();
  });

  it('renders correctly with initial state', () => {
    const store = mockStore({
      movies: {
        title: '',
        movieType: '',
        movieYear: '',
      },
    });

    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <Filters />
      </Provider>
    );

    expect(getByPlaceholderText('Release year...')).toBeInTheDocument();
    expect(getByText('Apply')).toBeInTheDocument();
    expect(getByText('FILTERS :')).toBeInTheDocument();
  });

  it('calls dispatch when type is changed', () => {
    const store = mockStore({
      movies: {
        title: '',
        movieType: '',
        movieYear: '',
      },
    });

    const { getByRole } = render(
      <Provider store={store}>
        <Filters />
      </Provider>
    );

    fireEvent.mouseDown(getByRole('combobox')); // Открываем выпадающий список
    fireEvent.click(screen.getByText('Movie')); // Выбираем опцию "Movie"

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'movies/getMovieType',
      payload: { value: 'Movie', label: 'Movie' },
    });
  });

  it('calls dispatch when year is changed', () => {
    const store = mockStore({
      movies: {
        title: '',
        movieType: '',
        movieYear: '',
      },
    });

    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <Filters />
      </Provider>
    );

    const yearInput = getByPlaceholderText('Release year...');
    fireEvent.change(yearInput, { target: { value: '2022' } });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'movies/getMovieYear',
      payload: '2022',
    });
  });

  it('calls getMoviesData on Apply button click', () => {
    const store = mockStore({
      movies: {
        title: 'Test',
        movieType: { value: 'Movie', label: 'Movie' },
        movieYear: '2022',
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <Filters />
      </Provider>
    );

    fireEvent.mouseDown(getByText('Apply'));

    expect(mockDispatch).toHaveBeenCalled();
  });
});