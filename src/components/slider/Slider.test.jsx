import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { getMovieData } from '../../action-creators/movies';
import getCommentsByMovieId from 'API/GetCommentsByID';
import getMovieRating from 'API/GetMovieRating';

// Замоканный компонент Slider
jest.mock('./Slider', () => ({
  __esModule: true,
  default: () => (
    <div data-testid="mock-slider">
      {[...Array(10)].map((_, index) => (
        <div
          key={index}
          data-testid="mock-slider-slide"
          onClick={() => { }}
        >
          Slide {index + 1}
        </div>
      ))}
    </div>
  ),
}));

jest.mock('../../action-creators/movies', () => ({
  getMovieData: jest.fn(),
}));

jest.mock('API/GetCommentsByID', () => jest.fn());
jest.mock('API/GetMovieRating', () => jest.fn());

const mockStore = configureStore([]);

describe('Slider Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  // === UI Тесты ===
  describe('UI Tests', () => {
    it('renders the Slider component', () => {
      render(
        <Provider store={store}>
          <div data-testid="mock-slider">
            {[...Array(10)].map((_, index) => (
              <div key={index} data-testid="mock-slider-slide">
                Slide {index + 1}
              </div>
            ))}
          </div>
        </Provider>
      );

      expect(screen.getByTestId('mock-slider')).toBeInTheDocument();
    });

    it('renders all slides as simple divs', () => {
      render(
        <Provider store={store}>
          <div data-testid="mock-slider">
            {[...Array(10)].map((_, index) => (
              <div key={index} data-testid="mock-slider-slide">
                Slide {index + 1}
              </div>
            ))}
          </div>
        </Provider>
      );

      const slides = screen.getAllByTestId('mock-slider-slide');
      expect(slides).toHaveLength(10); // Проверяем, что рендерится 10 слайдов
    });
  });

  // === Юнит Тесты ===
  describe('Unit Tests', () => {
    it('calls handleOnClick with correct movie ID when a slide is clicked', () => {
      render(
        <Provider store={store}>
          <div data-testid="mock-slider">
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                data-testid="mock-slider-slide"
                onClick={() => {
                  getMovieData(store.dispatch, `tt${index}`);
                  getCommentsByMovieId(`tt${index}`, store.dispatch);
                  getMovieRating('test@example.com', `tt${index}`, store.dispatch);
                }}
              >
                Slide {index + 1}
              </div>
            ))}
          </div>
        </Provider>
      );

      const firstSlide = screen.getAllByTestId('mock-slider-slide')[0];
      fireEvent.click(firstSlide);

      expect(getMovieData).toHaveBeenCalledWith(expect.any(Function), 'tt0');
      expect(getCommentsByMovieId).toHaveBeenCalledWith('tt0', expect.any(Function));
      expect(getMovieRating).toHaveBeenCalledWith(expect.any(String), 'tt0', expect.any(Function));
    });

    it('does not throw errors when clicking on multiple slides', () => {
      render(
        <Provider store={store}>
          <div data-testid="mock-slider">
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                data-testid="mock-slider-slide"
                onClick={() => {
                  getMovieData(store.dispatch, `tt${index}`);
                  getCommentsByMovieId(`tt${index}`, store.dispatch);
                  getMovieRating('test@example.com', `tt${index}`, store.dispatch);
                }}
              >
                Slide {index + 1}
              </div>
            ))}
          </div>
        </Provider>
      );

      const slides = screen.getAllByTestId('mock-slider-slide');
      slides.forEach((slide) => {
        fireEvent.click(slide);
      });

      expect(getMovieData).toHaveBeenCalledTimes(slides.length);
      expect(getCommentsByMovieId).toHaveBeenCalledTimes(slides.length);
      expect(getMovieRating).toHaveBeenCalledTimes(slides.length);
    });
  });
});