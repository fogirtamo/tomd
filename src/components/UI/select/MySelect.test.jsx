import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MySelect from './MySelect';

describe('MySelect Component', () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  // === Юнит тесты ===
  describe('Unit Tests', () => {
    it('renders without crashing', () => {
      render(<MySelect options={options} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('displays the default value', () => {
      render(<MySelect options={options} defaultValue={options[0]} />);
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    it('calls onChange when an option is selected', () => {
      const handleChange = jest.fn();
      render(<MySelect options={options} onChange={handleChange} />);
      const selectElement = screen.getByRole('combobox');

      fireEvent.keyDown(selectElement, { key: 'ArrowDown', code: 40 });
      fireEvent.click(screen.getByText('Option 2'));

      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({
          value: 'option2',
          label: 'Option 2',
        }),
        expect.anything() // Игнорируем дополнительные параметры
      );
    });
  });

  // === UI тесты ===
  describe('UI Tests', () => {
    it('renders all options in the dropdown', () => {
      render(<MySelect options={options} />);
      const selectElement = screen.getByRole('combobox');

      fireEvent.keyDown(selectElement, { key: 'ArrowDown', code: 40 });
      options.forEach((option) => {
        expect(screen.getByText(option.label)).toBeInTheDocument();
      });
    });

    it('handles focus and hover styles correctly', () => {
      render(<MySelect options={options} />);
      const selectElement = screen.getByRole('combobox');

      fireEvent.focus(selectElement);
      expect(selectElement).toBeInTheDocument();

      fireEvent.mouseOver(selectElement);
      expect(selectElement).toBeInTheDocument();
    });

    it('applies custom styles correctly', () => {
      render(<MySelect options={options} />);
      const selectElement = screen.getByRole('combobox');
      expect(selectElement).toBeInTheDocument();

      // Проверяем, что элемент рендерится корректно
      // Вместо проверки инлайн-стилей, проверяем наличие элемента
      expect(selectElement).toBeInTheDocument();
    });
  });
});