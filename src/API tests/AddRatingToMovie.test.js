import addRatingToMovie from '../API/AddRatingToMovie';
import { collection, query, where, getDocs, updateDoc, doc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../firebase';

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDocs: jest.fn(),
  updateDoc: jest.fn(),
  doc: jest.fn(),
  arrayUnion: jest.fn(),
  arrayRemove: jest.fn(),
}));

jest.mock('../firebase', () => ({
  db: {},
}));

describe('addRatingToMovie', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('добавляет новый рейтинг, если его ещё нет', async () => {
    const mockUserDocRef = {};
    const mockQuerySnapshot = {
      empty: false,
      forEach: (callback) => {
        callback({
          id: 'user-id',
          data: () => ({ ratings: [] }),
        });
      },
    };

    collection.mockReturnValue({});
    query.mockReturnValue({});
    where.mockReturnValue({});
    getDocs.mockResolvedValue(mockQuerySnapshot);
    doc.mockReturnValue(mockUserDocRef);
    arrayUnion.mockReturnValue({ movieID: 'tt1234567', rating: 5, movieTitle: 'Test Movie' });

    const email = 'test@example.com';
    const movieID = 'tt1234567';
    const rating = 5;
    const movieTitle = 'Test Movie';

    await addRatingToMovie(email, movieID, rating, movieTitle);

    expect(collection).toHaveBeenCalledWith(db, 'users');
    expect(query).toHaveBeenCalledWith({}, where('email', '==', email));
    expect(getDocs).toHaveBeenCalledWith({});
    expect(doc).toHaveBeenCalledWith(db, 'users', 'user-id');
    expect(updateDoc).toHaveBeenCalledWith(mockUserDocRef, {
      ratings: arrayUnion({ movieID, rating, movieTitle }),
    });
  });

  it('обновляет существующий рейтинг, если он уже есть', async () => {
    const mockUserDocRef = {};
    const existingRating = { movieID: 'tt1234567', rating: 3, movieTitle: 'Old Movie' };
    const mockQuerySnapshot = {
      empty: false,
      forEach: (callback) => {
        callback({
          id: 'user-id',
          data: () => ({ ratings: [existingRating] }),
        });
      },
    };

    collection.mockReturnValue({});
    query.mockReturnValue({});
    where.mockReturnValue({});
    getDocs.mockResolvedValue(mockQuerySnapshot);
    doc.mockReturnValue(mockUserDocRef);
    arrayUnion.mockReturnValue({ movieID: 'tt1234567', rating: 5, movieTitle: 'Test Movie' });
    arrayRemove.mockReturnValue(existingRating);

    const email = 'test@example.com';
    const movieID = 'tt1234567';
    const rating = 5;
    const movieTitle = 'Test Movie';

    await addRatingToMovie(email, movieID, rating, movieTitle);

    expect(updateDoc).toHaveBeenCalledWith(mockUserDocRef, {
      ratings: arrayRemove(existingRating),
    });
    expect(updateDoc).toHaveBeenCalledWith(mockUserDocRef, {
      ratings: arrayUnion({ movieID, rating, movieTitle }),
    });
  });

  it('логирует сообщение, если пользователь не найден', async () => {
    const mockQuerySnapshot = { empty: true };
    collection.mockReturnValue({});
    query.mockReturnValue({});
    where.mockReturnValue({});
    getDocs.mockResolvedValue(mockQuerySnapshot);

    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => { });

    await addRatingToMovie('test@example.com', 'tt1234567', 5, 'Test Movie');

    expect(consoleLogSpy).toHaveBeenCalledWith('Пользователь с таким email не найден.');

    consoleLogSpy.mockRestore();
  });

  it('логирует ошибку, если возникает исключение', async () => {
    const error = new Error('Ошибка');
    getDocs.mockRejectedValue(error);

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

    await addRatingToMovie('test@example.com', 'tt1234567', 5, 'Test Movie');

    expect(consoleErrorSpy).toHaveBeenCalledWith('Ошибка при добавлении рейтинга:', error);

    consoleErrorSpy.mockRestore();
  });
});