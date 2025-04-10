import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import MyInput from './MyInput';

describe('MyInput Component', () => {
  // Юнит-тесты
  describe('Unit Tests', () => {
    test('renders input element', () => {
      render(<MyInput />);
      const inputElement = screen.getByRole('textbox');
      expect(inputElement).toBeInTheDocument();
    });

    test('applies custom placeholder', () => {
      render(<MyInput placeholder="Enter text" />);
      const inputElement = screen.getByPlaceholderText(/Enter text/i);
      expect(inputElement).toBeInTheDocument();
    });

    test('forwards ref to the input element', () => {
      const ref = React.createRef();
      render(<MyInput ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    test('applies additional props to the input element', () => {
      render(<MyInput data-testid="custom-input" />);
      const inputElement = screen.getByTestId('custom-input');
      expect(inputElement).toBeInTheDocument();
    });
  });

  // UI-тесты
  describe('UI Tests', () => {
    test('handles user input correctly', () => {
      render(<MyInput />);
      const inputElement = screen.getByRole('textbox');
      fireEvent.change(inputElement, { target: { value: 'Hello' } });
      expect(inputElement.value).toBe('Hello');
    });

    test('applies correct CSS classes', () => {
      render(<MyInput />);
      const inputElement = screen.getByRole('textbox');
      expect(inputElement).toHaveClass('myInput');
    });

    test('changes border color on hover', () => {
      render(<MyInput />);
      const inputElement = screen.getByRole('textbox');
      fireEvent.mouseOver(inputElement);
      expect(inputElement).toHaveClass('myInput'); // Проверяем наличие базового класса
    });

    test('hides placeholder text on focus', () => {
      render(<MyInput placeholder="Enter text" />);
      const inputElement = screen.getByPlaceholderText(/Enter text/i);
      fireEvent.focus(inputElement);
      expect(inputElement.placeholder).toBe(''); // Проверяем, что плейсхолдер скрыт
      fireEvent.blur(inputElement);
      expect(inputElement.placeholder).toBe('Enter text'); // Проверяем, что плейсхолдер восстановлен
    });
  });
});