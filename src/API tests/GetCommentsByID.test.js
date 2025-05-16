import getCommentsByMovieId from '../API/GetCommentsByID';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { setComments } from 'features/userSlice';
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
  setComments: jest.fn(),
}));

describe('getCommentsByMovieId', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('получает комментарии и диспатчит их в Redux', async () => {
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
            userId: 'user2',
            movieId: 'movie1',
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

    await getCommentsByMovieId('movie1', mockDispatch);

    expect(collection).toHaveBeenCalledWith(db, 'comments');
    expect(query).toHaveBeenCalledWith({}, where('movieId', '==', 'movie1'));
    expect(getDocs).toHaveBeenCalledWith({});
    expect(mockDispatch).toHaveBeenCalledWith(
      setComments([
        {
          id: 'comment2',
          userId: 'user2',
          movieId: 'movie1',
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

  it('возвращает пустой массив и логирует ошибку при исключении', async () => {
    const mockDispatch = jest.fn();
    const error = new Error('Ошибка');
    getDocs.mockRejectedValue(error);

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

    const result = await getCommentsByMovieId('movie1', mockDispatch);

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error getting documents: ', error);
    expect(result).toEqual([]);
    consoleErrorSpy.mockRestore();
  });
});