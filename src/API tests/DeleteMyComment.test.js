import deleteMyComment from '../API/DeleteMyComment';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { setMyComments } from 'features/userSlice';
import { db } from '../firebase';

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDocs: jest.fn(),
  deleteDoc: jest.fn(),
  doc: jest.fn(),
}));

jest.mock('../firebase', () => ({
  db: {},
}));

jest.mock('features/userSlice', () => ({
  setMyComments: jest.fn(),
}));

describe('deleteMyComment', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('удаляет комментарий и обновляет список комментариев', async () => {
    const mockDispatch = jest.fn();
    const mockQuerySnapshot = {
      empty: false,
      docs: [
        {
          id: 'comment-id',
          data: () => ({
            userId: 'user-id',
            movieId: 'movie-id',
            comment: 'test comment',
            date: 1234567890,
          }),
        },
      ],
    };

    const updatedCommentsSnapshot = {
      docs: [
        {
          id: 'updated-comment-id',
          data: () => ({
            userId: 'user-id',
            movieId: 'movie-id',
            comment: 'updated comment',
            date: 1234567891,
          }),
        },
      ],
    };

    collection.mockReturnValue({});
    query.mockReturnValue({});
    where.mockReturnValue({});
    getDocs
      .mockResolvedValueOnce(mockQuerySnapshot) // Для поиска комментария
      .mockResolvedValueOnce(updatedCommentsSnapshot); // Для обновления списка комментариев
    doc.mockReturnValue({});
    deleteDoc.mockResolvedValue();

    await deleteMyComment('user-id', 'movie-id', 'test comment', 1234567890, mockDispatch);

    expect(collection).toHaveBeenCalledWith(db, 'comments');
    expect(query).toHaveBeenCalledTimes(2);
    expect(getDocs).toHaveBeenCalledTimes(2);
    expect(doc).toHaveBeenCalledWith(db, 'comments', 'comment-id');
    expect(deleteDoc).toHaveBeenCalledWith({});
    expect(mockDispatch).toHaveBeenCalledWith(
      setMyComments([
        {
          id: 'updated-comment-id',
          userId: 'user-id',
          movieId: 'movie-id',
          comment: 'updated comment',
          date: 1234567891,
        },
      ])
    );
  });

  it('логирует сообщение, если комментарий не найден', async () => {
    const mockDispatch = jest.fn();
    const mockQuerySnapshot = { empty: true };

    collection.mockReturnValue({});
    query.mockReturnValue({});
    where.mockReturnValue({});
    getDocs.mockResolvedValue(mockQuerySnapshot);

    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => { });

    await deleteMyComment('user-id', 'movie-id', 'test comment', 1234567890, mockDispatch);

    expect(consoleLogSpy).toHaveBeenCalledWith('Комментарий не найден');

    consoleLogSpy.mockRestore();
  });

  it('логирует ошибку, если возникает исключение', async () => {
    const mockDispatch = jest.fn();
    const error = new Error('Ошибка');

    collection.mockReturnValue({});
    query.mockReturnValue({});
    where.mockReturnValue({});
    getDocs.mockRejectedValue(error);

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

    await deleteMyComment('user-id', 'movie-id', 'test comment', 1234567890, mockDispatch);

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error deleting document: ', error);

    consoleErrorSpy.mockRestore();
  });
});