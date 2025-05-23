import registerWithEmailAndPassword from '../API/RegisterWithEmailAndPassword';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { setRegError, setRegState, setUser } from 'features/userSlice';
import addNewUser from '../API/AddNewUser';

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
}));

jest.mock('features/userSlice', () => ({
  setRegError: jest.fn(),
  setRegState: jest.fn(),
  setUser: jest.fn(),
}));

jest.mock('../API/AddNewUser', () => jest.fn());

describe('registerWithEmailAndPassword', () => {
  let mockDispatch;

  beforeEach(() => {
    jest.clearAllMocks();
    mockDispatch = jest.fn();
  });

  it('успешно регистрирует пользователя и вызывает необходимые действия', async () => {
    const mockUser = {
      email: 'test@example.com',
      accessToken: 'test-token',
      uid: 'user-id',
    };

    const auth = {};
    getAuth.mockReturnValue(auth);
    createUserWithEmailAndPassword.mockResolvedValue({ user: mockUser });

    await registerWithEmailAndPassword('test@example.com', 'password123', 'testuser', mockDispatch);

    expect(getAuth).toHaveBeenCalled();
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, 'test@example.com', 'password123');
    expect(mockDispatch).toHaveBeenCalledWith(setUser({
      email: 'test@example.com',
      token: 'test-token',
      id: 'user-id',
      nickname: 'testuser',
    }));
    expect(addNewUser).toHaveBeenCalledWith('test@example.com', 'testuser', 'user-id');
    expect(mockDispatch).toHaveBeenCalledWith(setRegState());
  });

  it('обрабатывает ошибку "auth/email-already-in-use"', async () => {
    const auth = {};
    getAuth.mockReturnValue(auth);
    const error = { code: 'auth/email-already-in-use' };
    createUserWithEmailAndPassword.mockRejectedValue(error);

    await registerWithEmailAndPassword('test@example.com', 'password123', 'testuser', mockDispatch);

    expect(getAuth).toHaveBeenCalled();
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, 'test@example.com', 'password123');
    expect(mockDispatch).toHaveBeenCalledWith(setRegError('email-already-in-use'));
  });

  it('обрабатывает ошибку "auth/invalid-email"', async () => {
    const auth = {};
    getAuth.mockReturnValue(auth);
    const error = { code: 'auth/invalid-email' };
    createUserWithEmailAndPassword.mockRejectedValue(error);

    await registerWithEmailAndPassword('invalid-email', 'password123', 'testuser', mockDispatch);

    expect(getAuth).toHaveBeenCalled();
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, 'invalid-email', 'password123');
    expect(mockDispatch).toHaveBeenCalledWith(setRegError('invalid-email'));
  });

  it('обрабатывает ошибку "auth/weak-password"', async () => {
    const auth = {};
    getAuth.mockReturnValue(auth);
    const error = { code: 'auth/weak-password' };
    createUserWithEmailAndPassword.mockRejectedValue(error);

    await registerWithEmailAndPassword('test@example.com', '123', 'testuser', mockDispatch);

    expect(getAuth).toHaveBeenCalled();
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, 'test@example.com', '123');
    expect(mockDispatch).toHaveBeenCalledWith(setRegError('weak-password'));
  });

  it('обрабатывает неизвестную ошибку', async () => {
    const auth = {};
    getAuth.mockReturnValue(auth);
    const error = { code: 'auth/unknown-error' };
    createUserWithEmailAndPassword.mockRejectedValue(error);

    await registerWithEmailAndPassword('test@example.com', 'password123', 'testuser', mockDispatch);

    expect(getAuth).toHaveBeenCalled();
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, 'test@example.com', 'password123');
    expect(mockDispatch).toHaveBeenCalledWith(setRegError('unknown-error'));
  });
});