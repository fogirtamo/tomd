import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorRequest from './ErrorRequest';

describe('ErrorRequest', () => {
  // === UI Тесты ===
  describe('UI Tests', () => {
    it('renders the error message', () => {
      render(<ErrorRequest />);
      expect(screen.getByText('Movie not found, try changing your request.')).toBeInTheDocument();
    });

    it('applies custom props to the component', () => {
      render(<ErrorRequest data-testid="error-request" />);
      const errorElement = screen.getByTestId('error-request');
      expect(errorElement).toBeInTheDocument();
    });

    it('applies the correct CSS class', () => {
      render(<ErrorRequest />);
      const errorElement = screen.getByText('Movie not found, try changing your request.');
      expect(errorElement).toHaveClass('errorRequest'); // Проверяем наличие CSS-класса
    });
  });

  // === Юнит Тесты ===
  describe('Unit Tests', () => {
    it('renders with additional props', () => {
      render(<ErrorRequest id="custom-id" />);
      const errorElement = screen.getByText('Movie not found, try changing your request.');
      expect(errorElement).toHaveAttribute('id', 'custom-id');
    });

    it('renders without crashing', () => {
      const { container } = render(<ErrorRequest />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});