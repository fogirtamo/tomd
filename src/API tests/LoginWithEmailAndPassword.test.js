import loginWithEmailAndPassword from '../API/LoginWithEmailAndPassword';
import { setAuthError, setRegState, setUser } from 'features/userSlice';
import { getModalState } from 'features/moviesSlice';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import getUserNickname from '../API/GetUserNickname';

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
}));

jest.mock('features/userSlice', () => ({
  setAuthError: jest.fn(),
  setRegState: jest.fn(),
  setUser: jest.fn(),
}));

jest.mock('features/moviesSlice', () => ({
  getModalState: jest.fn(),
}));

jest.mock('../API/GetUserNickname', () => jest.fn());

describe('loginWithEmailAndPassword', () => {
  let mockDispatch;
  let mockNavigate;

  beforeEach(() => {
    jest.clearAllMocks();
    mockDispatch = jest.fn();
    mockNavigate = jest.fn();
  });

  it('успешно логинит пользователя и вызывает необходимые действия', async () => {
    const mockUser = {
      email: 'test@example.com',
      uid: 'user-id',
      accessToken: 'test-token',
    };

    const auth = {};
    getAuth.mockReturnValue(auth);
    signInWithEmailAndPassword.mockResolvedValue({ user: mockUser });

    await loginWithEmailAndPassword('test@example.com', 'password123', mockDispatch, mockNavigate);

    expect(getAuth).toHaveBeenCalled();
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, 'test@example.com', 'password123');
    expect(mockDispatch).toHaveBeenCalledWith(setUser({
      email: 'test@example.com',
      id: 'user-id',
      token: 'test-token',
    }));
    expect(getUserNickname).toHaveBeenCalledWith('user-id', mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(getModalState(false));
    expect(mockDispatch).toHaveBeenCalledWith(setAuthError(null));
    expect(mockNavigate).toHaveBeenCalledWith('/', { replace: false });
    expect(mockDispatch).toHaveBeenCalledWith(setRegState());
  });

  it('обрабатывает ошибку "auth/invalid-email"', async () => {
    const auth = {};
    getAuth.mockReturnValue(auth);
    const error = { code: 'auth/invalid-email' };
    signInWithEmailAndPassword.mockRejectedValue(error);

    await loginWithEmailAndPassword('invalid-email', 'password123', mockDispatch, mockNavigate);

    expect(getAuth).toHaveBeenCalled();
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, 'invalid-email', 'password123');
    expect(mockDispatch).toHaveBeenCalledWith(setAuthError('invalid-email'));
  });

  it('обрабатывает ошибку "auth/invalid-credential"', async () => {
    const auth = {};
    getAuth.mockReturnValue(auth);
    const error = { code: 'auth/invalid-credential' };
    signInWithEmailAndPassword.mockRejectedValue(error);

    await loginWithEmailAndPassword('test@example.com', 'wrong-password', mockDispatch, mockNavigate);

    expect(getAuth).toHaveBeenCalled();
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, 'test@example.com', 'wrong-password');
    expect(mockDispatch).toHaveBeenCalledWith(setAuthError('invalid-credential'));
  });

  it('не обрабатывает неизвестные ошибки', async () => {
    const auth = {};
    getAuth.mockReturnValue(auth);
    const error = { code: 'auth/unknown-error' };
    signInWithEmailAndPassword.mockRejectedValue(error);

    await loginWithEmailAndPassword('test@example.com', 'password123', mockDispatch, mockNavigate);

    expect(getAuth).toHaveBeenCalled();
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, 'test@example.com', 'password123');
    expect(mockDispatch).not.toHaveBeenCalledWith(setAuthError('invalid-email'));
    expect(mockDispatch).not.toHaveBeenCalledWith(setAuthError('invalid-credential'));
  });
});