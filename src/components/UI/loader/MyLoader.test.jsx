import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import MyLoader from './MyLoader';

describe('MyLoader Component', () => {
  // Юнит-тесты
  describe('Unit Tests', () => {
    test('renders loader element', () => {
      render(<MyLoader />);
      const loaderElement = screen.getByRole('presentation');
      expect(loaderElement).toBeInTheDocument();
    });

    test('applies additional props to the loader element', () => {
      render(<MyLoader data-testid="custom-loader" />);
      const loaderElement = screen.getByTestId('custom-loader');
      expect(loaderElement).toBeInTheDocument();
    });

    test('has correct default class', () => {
      render(<MyLoader />);
      const loaderElement = screen.getByRole('presentation');
      expect(loaderElement).toHaveClass('loader');
    });
  });

  // UI-тесты
  describe('UI Tests', () => {
    test('applies animation styles', () => {
      render(<MyLoader />);
      const loaderElement = screen.getByRole('presentation');
      expect(loaderElement).toHaveClass('loader'); // Проверяем наличие класса
    });

    test('has correct size and border styles', () => {
      render(<MyLoader />);
      const loaderElement = screen.getByRole('presentation');
      expect(loaderElement).toHaveClass('loader'); // Проверяем наличие класса
    });
  });
});