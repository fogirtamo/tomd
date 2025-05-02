import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorRequest from '../request-error/ErrorRequest';

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
      expect(errorElement).toHaveClass('errorRequest'); // Проверяем наличие класса
    });
  });

  // === Юнит Тесты ===
  describe('Unit Tests', () => {
    it('renders with default props', () => {
      const { container } = render(<ErrorRequest />);
      expect(container.firstChild).toHaveClass('errorRequest');
    });

    it('renders custom attributes passed as props', () => {
      render(<ErrorRequest id="custom-id" />);
      const errorElement = screen.getByText('Movie not found, try changing your request.');
      expect(errorElement).toHaveAttribute('id', 'custom-id');
    });
  });
});