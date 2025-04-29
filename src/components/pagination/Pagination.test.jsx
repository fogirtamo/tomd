import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Pagination from './Pagination';

// Мокируем все зависимости
jest.mock('../UI/button/MyButton', () => ({ children, style, onMouseDown }) => (
  <button
    style={style}
    onMouseDown={onMouseDown}
    data-testid="pagination-button"
  >
    {children}
  </button>
));

jest.mock('../../action-creators/movies', () => ({
  getMoviesData: jest.fn(),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));

const mockStore = configureStore([]);

describe('Pagination Component', () => {
  let store;
  const mockDispatch = jest.fn();

  beforeEach(() => {
    store = mockStore({});
    jest.clearAllMocks();
  });

  // Тесты с пагинацией
  describe('when has pagination', () => {
    const mockState = {
      searchTitle: 'test',
      totalResults: 30,
      currentPage: 2,
      movieType: { value: 'movie' },
      movieYear: '2023'
    };

    beforeEach(() => {
      require('react-redux').useSelector.mockImplementation(selector => {
        if (selector.name === 'selectTitle') return mockState.searchTitle;
        if (selector.name === 'selectTotalResults') return mockState.totalResults;
        if (selector.name === 'selectCurrentPage') return mockState.currentPage;
        if (selector.name === 'selectMovieType') return mockState.movieType;
        if (selector.name === 'selectMovieYear') return mockState.movieYear;
        return {};
      });
    });

    it('renders correct pagination info', () => {
      render(
        <Provider store={store}>
          <Pagination />
        </Provider>
      );

      expect(screen.getByText('Страница 2 из 3')).toBeInTheDocument();
      expect(screen.getAllByTestId('pagination-button')).toHaveLength(3);
    });

    it('renders active button with correct styles', () => {
      render(
        <Provider store={store}>
          <Pagination />
        </Provider>
      );

      const activeButton = screen.getByText('2').closest('button');
      expect(activeButton).toHaveStyle({
        border: '1px solid gray',
        background: 'rgba(25, 25, 25, 1.00)'
      });
    });

    it('calls getMoviesData with correct params when button clicked', () => {
      render(
        <Provider store={store}>
          <Pagination />
        </Provider>
      );

      fireEvent.mouseDown(screen.getByText('3'));
      expect(require('../../action-creators/movies').getMoviesData).toHaveBeenCalledWith(
        expect.any(Function),
        'test',
        3,
        'movie',
        '2023'
      );
    });
  });

  // Тесты без пагинации
  describe('when no pagination needed', () => {
    beforeEach(() => {
      require('react-redux').useSelector.mockImplementation(selector => {
        if (selector.name === 'selectTotalResults') return 0;
        return {};
      });
    });

    it('renders nothing when totalResults is 0', () => {
      const { container } = render(
        <Provider store={store}>
          <Pagination />
        </Provider>
      );
      // Исправленная проверка для пустого компонента
      expect(container.firstChild).not.toBeInTheDocument();
    });

    it('renders nothing when totalResults is undefined', () => {
      require('react-redux').useSelector.mockImplementation(selector => {
        if (selector.name === 'selectTotalResults') return undefined;
        return {};
      });

      const { container } = render(
        <Provider store={store}>
          <Pagination />
        </Provider>
      );
      expect(container.firstChild).not.toBeInTheDocument();
    });
  });
});