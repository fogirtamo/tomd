import getMyComments from '../API/GetMyComments';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { setMyComments } from 'features/userSlice';
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
  setMyComments: jest.fn(),
}));

describe('getMyComments', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('получает комментарии пользователя и диспатчит их в Redux', async () => {
    const mockDispatch = jest.fn();
    const mockQuerySnapshot = {
      docs: [
        {
          id: 'comment1',
          data: () => ({
            userId: 'user1',
            movieId: 'movie1',
            comment: 'Great movie!',
            date: 1234567890,
          }),
        },
        {
          id: 'comment2',
          data: () => ({
            userId: 'user1',
            movieId: 'movie2',
            comment: 'Not bad!',
            date: 1234567891,
          }),
        },
      ],
    };

    collection.mockReturnValue({});
    query.mockReturnValue({});
    where.mockReturnValue({});
    getDocs.mockResolvedValue(mockQuerySnapshot);

    await getMyComments('user1', mockDispatch);

    expect(collection).toHaveBeenCalledWith(db, 'comments');
    expect(query).toHaveBeenCalledWith({}, where('userId', '==', 'user1'));
    expect(getDocs).toHaveBeenCalledWith({});
    expect(mockDispatch).toHaveBeenCalledWith(
      setMyComments([
        {
          id: 'comment2',
          userId: 'user1',
          movieId: 'movie2',
          comment: 'Not bad!',
          date: 1234567891,
        },
        {
          id: 'comment1',
          userId: 'user1',
          movieId: 'movie1',
          comment: 'Great movie!',
          date: 1234567890,
        },
      ])
    );
  });

  it('диспатчит пустой массив, если комментарии не найдены', async () => {
    const mockDispatch = jest.fn();
    const mockQuerySnapshot = { docs: [] };

    collection.mockReturnValue({});
    query.mockReturnValue({});
    where.mockReturnValue({});
    getDocs.mockResolvedValue(mockQuerySnapshot);

    await getMyComments('user1', mockDispatch);

    expect(collection).toHaveBeenCalledWith(db, 'comments');
    expect(query).toHaveBeenCalledWith({}, where('userId', '==', 'user1'));
    expect(getDocs).toHaveBeenCalledWith({});
    expect(mockDispatch).toHaveBeenCalledWith(setMyComments([]));
  });

  it('диспатчит пустой массив и логирует ошибку при исключении', async () => {
    const mockDispatch = jest.fn();
    const error = new Error('Ошибка');
    getDocs.mockRejectedValue(error);

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

    await getMyComments('user1', mockDispatch);

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error getting documents: ', error);
    expect(mockDispatch).toHaveBeenCalledWith(setMyComments([]));

    consoleErrorSpy.mockRestore();
  });
});