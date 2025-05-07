import React from 'react';
import { render, screen } from '@testing-library/react';
import SignUpErrors from './SignUpErrors';
import '@testing-library/jest-dom';

describe('SignUpErrors Component', () => {
  it('renders nothing when regError is null', () => {
    const { container } = render(<SignUpErrors regError={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders "The passwords entered do not match" when regError is "unequal-password"', () => {
    render(<SignUpErrors regError="unequal-password" />);
    expect(screen.getByText('Error:')).toBeInTheDocument();
    expect(screen.getByText('The passwords entered do not match')).toBeInTheDocument();
  });

  it('renders "This email is already in use" when regError is "email-already-in-use"', () => {
    render(<SignUpErrors regError="email-already-in-use" />);
    expect(screen.getByText('Error:')).toBeInTheDocument();
    expect(screen.getByText('This email is already in use')).toBeInTheDocument();
  });

  it('renders "Enter your email" when regError is "missing-email"', () => {
    render(<SignUpErrors regError="missing-email" />);
    expect(screen.getByText('Error:')).toBeInTheDocument();
    expect(screen.getByText('Enter your email')).toBeInTheDocument();
  });

  it('renders "Invalid email" when regError is "invalid-email"', () => {
    render(<SignUpErrors regError="invalid-email" />);
    expect(screen.getByText('Error:')).toBeInTheDocument();
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('renders "Enter your password" when regError is "missing-password"', () => {
    render(<SignUpErrors regError="missing-password" />);
    expect(screen.getByText('Error:')).toBeInTheDocument();
    expect(screen.getByText('Enter your password')).toBeInTheDocument();
  });

  it('renders "Weak password (must contain at least 6 symbols)" when regError is "weak-password"', () => {
    render(<SignUpErrors regError="weak-password" />);
    expect(screen.getByText('Error:')).toBeInTheDocument();
    expect(screen.getByText('Weak password (must contain at least 6 symbols)')).toBeInTheDocument();
  });

  it('renders "Short nickname (must contain at least 3 symbols)" when regError is "short-nickname"', () => {
    render(<SignUpErrors regError="short-nickname" />);
    expect(screen.getByText('Error:')).toBeInTheDocument();
    expect(screen.getByText('Short nickname (must contain at least 3 symbols)')).toBeInTheDocument();
  });
});