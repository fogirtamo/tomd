import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovieForm from './MovieForm';

describe('MovieForm', () => {
  // === UI Тесты ===
  describe('UI Tests', () => {
    it('renders the movie poster, title, and year', () => {
      render(
        <MovieForm
          title="Inception"
          year="2010"
          posterURL="https://example.com/inception.jpg"
          id="1"
          onClick={jest.fn()}
        />
      );

      expect(screen.getByRole('img')).toHaveAttribute('src', 'https://example.com/inception.jpg');
      expect(screen.getByText('Inception')).toBeInTheDocument();
      expect(screen.getByText('2010')).toBeInTheDocument();
    });

    it('applies the correct CSS classes', () => {
      render(
        <MovieForm
          title="Inception"
          year="2010"
          posterURL="https://example.com/inception.jpg"
          id="1"
          onClick={jest.fn()}
        />
      );

      expect(screen.getByRole('img')).toHaveClass('moviePoster');
      expect(screen.getByText('Inception')).toHaveClass('movieTitle');
    });
  });

  // === Юнит Тесты ===
  describe('Unit Tests', () => {
    it('calls onClick when the movie form is clicked', () => {
      const mockOnClick = jest.fn();
      render(
        <MovieForm
          title="Inception"
          year="2010"
          posterURL="https://example.com/inception.jpg"
          id="1"
          onClick={mockOnClick}
        />
      );

      const movieForm = screen.getByText('Inception').closest('div');
      fireEvent.click(movieForm);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('renders unique movie forms based on their content', () => {
      const { container } = render(
        <>
          <MovieForm
            title="Inception"
            year="2010"
            posterURL="https://example.com/inception.jpg"
            id="1"
            onClick={jest.fn()}
          />
          <MovieForm
            title="Interstellar"
            year="2014"
            posterURL="https://example.com/interstellar.jpg"
            id="2"
            onClick={jest.fn()}
          />
        </>
      );

      const movieForms = container.querySelectorAll('.movieForm');
      expect(movieForms.length).toBe(2);

      // Проверяем содержимое каждого элемента
      expect(movieForms[0].textContent).toContain('Inception');
      expect(movieForms[0].textContent).toContain('2010');
      expect(movieForms[1].textContent).toContain('Interstellar');
      expect(movieForms[1].textContent).toContain('2014');
    });
  });
});