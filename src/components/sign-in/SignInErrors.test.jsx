import React from 'react';
import { render, screen } from '@testing-library/react';
import SignInErrors from './SignInErrors';
import '@testing-library/jest-dom';

describe('SignInErrors Component', () => {
  it('renders nothing when authError is null', () => {
    const { container } = render(<SignInErrors authError={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders "Invalid email" when authError is "invalid-email"', () => {
    render(<SignInErrors authError="invalid-email" />);
    expect(screen.getByText('Error:')).toBeInTheDocument();
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('renders "Incorrect email or password" when authError is "invalid-credential"', () => {
    render(<SignInErrors authError="invalid-credential" />);
    expect(screen.getByText('Error:')).toBeInTheDocument();
    expect(screen.getByText('Incorrect email or password')).toBeInTheDocument();
  });
});