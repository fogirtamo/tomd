import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Provider, useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import SignUp from './SignUp';
import '@testing-library/jest-dom';

// Мокируем все зависимости
jest.mock('react-router-dom', () => ({
  Link: ({ children, to }) => <a href={to}>{children}</a>,
}));

jest.mock('API/RegisterWithEmailAndPassword', () => jest.fn());

jest.mock('../UI/input/MyInput', () => (props) => (
  <input
    data-testid={`mock-input-${props.placeholder ? props.placeholder.replace(/\s+/g, '-').toLowerCase() : 'default'}`}
    onChange={(e) => props.onChange(e)}
    placeholder={props.placeholder || ''}
  />
));

jest.mock('../UI/button/MyButton', () => (props) => (
  <button
    data-testid={props['data-testid'] || 'mock-button'}
    onMouseDown={props.onMouseDown}
    style={props.style}
  >
    {props.children}
  </button>
));

jest.mock('./SignUp.module.css', () => ({
  signUpContainer: 'signUpContainer',
  backButton: 'backButton',
  signUp: 'signUp',
  signUpSuccess: 'signUpSuccess',
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

// Мок хранилища Redux
const createMockStore = (regState = false, regError = null) =>
  configureStore({
    reducer: {
      user: () => ({ regState, regError }),
    },
  });

describe('SignUp Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders registration success message when regState is true', () => {
    render(
      <Provider store={createMockStore(true)}>
        <SignUp />
      </Provider>
    );

    expect(
      screen.getByText(
        'Registration was successful, now you can access comments and ratings.'
      )
    ).toBeInTheDocument();
  });

  it('renders registration form when regState is false', () => {
    render(
      <Provider store={createMockStore(false)}>
        <SignUp />
      </Provider>
    );

    expect(screen.getByText('Hello!')).toBeInTheDocument();
    expect(screen.getByText('E-Mail:')).toBeInTheDocument();
    expect(screen.getByText('Login:')).toBeInTheDocument();
    expect(screen.getByText('Password:')).toBeInTheDocument();
    expect(screen.getByText('Repeat password:')).toBeInTheDocument();
  });

  it('updates input fields on change', () => {
    render(
      <Provider store={createMockStore(false)}>
        <SignUp />
      </Provider>
    );

    const emailInput = screen.getByTestId('mock-input-e-mail');
    const loginInput = screen.getByTestId('mock-input-login');
    const passwordInput = screen.getByTestId('mock-input-password');
    const repeatedPasswordInput = screen.getByTestId('mock-input-repeat-password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(loginInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(repeatedPasswordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(loginInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('password123');
    expect(repeatedPasswordInput.value).toBe('password123');
  });

  it('dispatches "short-nickname" error when nickname is too short', () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    render(
      <Provider store={createMockStore(false)}>
        <SignUp />
      </Provider>
    );

    const loginInput = screen.getByTestId('mock-input-login');
    const submitButton = screen.getByTestId('submit-button');

    fireEvent.change(loginInput, { target: { value: 'ab' } });
    fireEvent.mouseDown(submitButton);

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'user/setRegError', payload: 'short-nickname' });
  });

  it('dispatches "unequal-password" error when passwords do not match', () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    render(
      <Provider store={createMockStore(false)}>
        <SignUp />
      </Provider>
    );

    const loginInput = screen.getByTestId('mock-input-login');
    const passwordInput = screen.getByTestId('mock-input-password');
    const repeatedPasswordInput = screen.getByTestId('mock-input-repeat-password');
    const submitButton = screen.getByTestId('submit-button');

    // Устанавливаем корректное значение для nickname
    fireEvent.change(loginInput, { target: { value: 'validNickname' } });

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(repeatedPasswordInput, { target: { value: 'password456' } });
    fireEvent.mouseDown(submitButton);

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'user/setRegError', payload: 'unequal-password' });
  });
});