import getMyRatings from '../API/GetMyRatings';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { setMyRatings } from 'features/userSlice';
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
  setMyRatings: jest.fn(),
}));

describe('getMyRatings', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('получает рейтинги пользователя и диспатчит их в Redux', async () => {
    const mockDispatch = jest.fn();
    const mockQuerySnapshot = {
      empty: false,
      docs: [
        {
          data: () => ({
            email: 'test@example.com',
            ratings: [
              { movieID: 'tt1234567', rating: 5 },
              { movieID: 'tt7654321', rating: 3 },
            ],
          }),
        },
      ],
    };

    collection.mockReturnValue({});
    query.mockReturnValue({});
    where.mockReturnValue({});
    getDocs.mockResolvedValue(mockQuerySnapshot);

    await getMyRatings('test@example.com', mockDispatch);

    expect(collection).toHaveBeenCalledWith(db, 'users');
    expect(query).toHaveBeenCalledWith({}, where('email', '==', 'test@example.com'));
    expect(getDocs).toHaveBeenCalledWith({});
    expect(mockDispatch).toHaveBeenCalledWith(
      setMyRatings([
        { movieID: 'tt1234567', rating: 5 },
        { movieID: 'tt7654321', rating: 3 },
      ])
    );
  });

  it('диспатчит пустой массив, если пользователь не найден', async () => {
    const mockDispatch = jest.fn();
    const mockQuerySnapshot = { empty: true };

    collection.mockReturnValue({});
    query.mockReturnValue({});
    where.mockReturnValue({});
    getDocs.mockResolvedValue(mockQuerySnapshot);

    await getMyRatings('test@example.com', mockDispatch);

    expect(collection).toHaveBeenCalledWith(db, 'users');
    expect(query).toHaveBeenCalledWith({}, where('email', '==', 'test@example.com'));
    expect(getDocs).toHaveBeenCalledWith({});
    expect(mockDispatch).toHaveBeenCalledWith(setMyRatings([]));
  });

  it('диспатчит пустой массив и логирует ошибку при исключении', async () => {
    const mockDispatch = jest.fn();
    const error = new Error('Ошибка');
    getDocs.mockRejectedValue(error);

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

    await getMyRatings('test@example.com', mockDispatch);

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching user document: ', error);
    expect(mockDispatch).toHaveBeenCalledWith(setMyRatings([]));

    consoleErrorSpy.mockRestore();
  });
});