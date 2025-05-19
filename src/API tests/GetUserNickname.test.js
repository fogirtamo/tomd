import getUserNickname from '../API/GetUserNickname';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { setUser } from 'features/userSlice';
import { db } from '../firebase';

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDocs: jest.fn(),
}));

jest.mock('../firebase', () => ({
  db: {},
}));

jest.mock('features/userSlice', () => ({
  setUser: jest.fn(),
}));

describe('getUserNickname', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('получает nickname пользователя и диспатчит его в Redux', async () => {
    const mockDispatch = jest.fn();
    const mockQuerySnapshot = {
      empty: false,
      docs: [
        {
          data: () => ({
            nickname: 'testuser',
            email: 'test@example.com',
          }),
        },
      ],
    };

    collection.mockReturnValue({});
    query.mockReturnValue({});
    where.mockReturnValue({});
    getDocs.mockResolvedValue(mockQuerySnapshot);

    await getUserNickname('user-id', mockDispatch);

    expect(collection).toHaveBeenCalledWith(db, 'users');
    expect(query).toHaveBeenCalledWith({}, where('userId', '==', 'user-id'));
    expect(getDocs).toHaveBeenCalledWith({});
    expect(mockDispatch).toHaveBeenCalledWith(
      setUser({
        nickname: 'testuser',
        email: 'test@example.com',
        id: 'user-id',
      })
    );
  });

  it('логирует сообщение, если пользователь не найден', async () => {
    const mockDispatch = jest.fn();
    const mockQuerySnapshot = { empty: true };

    collection.mockReturnValue({});
    query.mockReturnValue({});
    where.mockReturnValue({});
    getDocs.mockResolvedValue(mockQuerySnapshot);

    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => { });

    await getUserNickname('user-id', mockDispatch);

    expect(collection).toHaveBeenCalledWith(db, 'users');
    expect(query).toHaveBeenCalledWith({}, where('userId', '==', 'user-id'));
    expect(getDocs).toHaveBeenCalledWith({});
    expect(consoleLogSpy).toHaveBeenCalledWith('No user found with the given userId');

    consoleLogSpy.mockRestore();
  });

  it('логирует ошибку, если возникает исключение', async () => {
    const mockDispatch = jest.fn();
    const error = new Error('Ошибка');
    getDocs.mockRejectedValue(error);

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

    await getUserNickname('user-id', mockDispatch);

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error getting user document:', error);

    consoleErrorSpy.mockRestore();
  });
});