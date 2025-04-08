import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import MyButton from './MyButton';

describe('MyButton Component', () => {
  // Юнит-тесты
  describe('Unit Tests', () => {
    test('renders button with given children', () => {
      render(<MyButton>Click Me</MyButton>);
      const buttonElement = screen.getByText(/Click Me/i);
      expect(buttonElement).toBeInTheDocument();
    });

    test('button is disabled when disable prop is true', () => {
      render(<MyButton disable={true}>Click Me</MyButton>);
      const buttonElement = screen.getByText(/Click Me/i);
      expect(buttonElement).toBeDisabled();
    });

    test('button calls onClick handler when clicked', () => {
      const handleClick = jest.fn();
      render(<MyButton onClick={handleClick}>Click Me</MyButton>);
      const buttonElement = screen.getByText(/Click Me/i);
      fireEvent.click(buttonElement);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('button displays correct text', () => {
      render(<MyButton>Submit</MyButton>);
      const buttonElement = screen.getByText(/Submit/i);
      expect(buttonElement).toBeInTheDocument();
    });
  });

  // UI-тесты
  describe('UI Tests', () => {
    test('button handles click event and updates state', () => {
      jest.useFakeTimers();
      render(<MyButton>Click Me</MyButton>);
      const buttonElement = screen.getByText(/Click Me/i);
      fireEvent.click(buttonElement);
      expect(buttonElement).toHaveClass('transformed');

      act(() => {
        jest.runAllTimers();
      });

      expect(buttonElement).not.toHaveClass('transformed');
    });

    test('button applies correct CSS classes based on state', () => {
      jest.useFakeTimers();
      render(<MyButton>Click Me</MyButton>);
      const buttonElement = screen.getByText(/Click Me/i);
      expect(buttonElement).toHaveClass('myBtn');
      fireEvent.click(buttonElement);
      expect(buttonElement).toHaveClass('transformed');

      act(() => {
        jest.runAllTimers();
      });

      expect(buttonElement).not.toHaveClass('transformed');
    });

    test('button does not handle click event when disabled', () => {
      jest.useFakeTimers();
      render(<MyButton disable={true}>Click Me</MyButton>);
      const buttonElement = screen.getByText(/Click Me/i);
      fireEvent.click(buttonElement);
      expect(buttonElement).not.toHaveClass('transformed');
    });
  });
});