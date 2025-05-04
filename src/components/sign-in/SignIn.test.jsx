import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import SignIn from './SignIn';
import '@testing-library/jest-dom';

// Мокируем все зависимости
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

jest.mock('API/LoginWithEmailAndPassword', () => jest.fn());

jest.mock('../UI/input/MyInput', () => (props) => (
  <input
    data-testid={`mock-input-${props.placeholder}`}
    onChange={(e) => props.onChange(e)}
    placeholder={props.placeholder}
  />
));

jest.mock('../UI/button/MyButton', () => (props) => (
  <button
    data-testid="mock-button"
    onMouseDown={props.onMouseDown}
    style={props.style}
  >
    {props.children}
  </button>
));

// Мокируем CSS модуль
jest.mock('./SignIn.module.css', () => ({
  modal: 'modal',
  active: 'active',
  modalContent: 'modalContent',
}));

// Мок хранилища Redux
const createMockStore = (modalState = true, authError = null) =>
  configureStore({
    reducer: {
      movies: () => ({ modalState }),
      user: () => ({ authError }),
    },
  });

describe('SignIn Component', () => {
  afterEach(() => {
    cleanup();
    document.body.style.overflow = '';
  });

  it('renders modal when modalState is true', () => {
    render(
      <Provider store={createMockStore()}>
        <SignIn />
      </Provider>
    );
    expect(screen.getByText('User authorization')).toBeInTheDocument();
  });

  it('does not render modal when modalState is false', () => {
    const { container } = render(
      <Provider store={createMockStore(false)}>
        <SignIn />
      </Provider>
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('updates email and password on input change', () => {
    render(
      <Provider store={createMockStore()}>
        <SignIn />
      </Provider>
    );

    const emailInput = screen.getByTestId('mock-input-E-mail');
    const passwordInput = screen.getByTestId('mock-input-Password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  it('calls loginWithEmailAndPassword on button click', () => {
    const mockLogin = jest.requireMock('API/LoginWithEmailAndPassword');
    render(
      <Provider store={createMockStore()}>
        <SignIn />
      </Provider>
    );

    fireEvent.mouseDown(screen.getByTestId('mock-button'));
    expect(mockLogin).toHaveBeenCalled();
  });

  describe('body overflow behavior', () => {
    beforeEach(() => {
      document.body.style.overflow = '';
    });

    it('sets overflow to hidden when modal opens', () => {
      render(
        <Provider store={createMockStore(true)}>
          <SignIn />
        </Provider>
      );
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('sets overflow to auto when modal closes', () => {
      const { rerender } = render(
        <Provider store={createMockStore(true)}>
          <SignIn />
        </Provider>
      );

      rerender(
        <Provider store={createMockStore(false)}>
          <SignIn />
        </Provider>
      );

      expect(document.body.style.overflow).toBe('auto');
    });

    it('sets overflow to auto when component unmounts', () => {
      const { unmount } = render(
        <Provider store={createMockStore(true)}>
          <SignIn />
        </Provider>
      );

      unmount();
      expect(document.body.style.overflow).toBe('auto');
    });
  });
});