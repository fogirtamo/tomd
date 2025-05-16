import getMovieRating from '../API/GetMovieRating';
import { collection, getDocs } from 'firebase/firestore';
import { setCurrentRating } from 'features/userSlice';
import { db } from '../firebase';

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
}));

jest.mock('../firebase', () => ({
  db: {},
}));

jest.mock('features/userSlice', () => ({
  setCurrentRating: jest.fn(),
}));

describe('getMovieRating', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('диспатчит рейтинг фильма, если пользователь и рейтинг найдены', async () => {
    const mockDispatch = jest.fn();
    const mockQuerySnapshot = {
      forEach: (callback) => {
        callback({
          data: () => ({
            email: 'test@example.com',
            ratings: [
              { movieID: 'tt1234567', rating: 5 },
              { movieID: 'tt7654321', rating: 3 },
            ],
          }),
        });
      },
    };

    collection.mockReturnValue({});
    getDocs.mockResolvedValue(mockQuerySnapshot);

    await getMovieRating('test@example.com', 'tt1234567', mockDispatch);

    expect(collection).toHaveBeenCalledWith(db, 'users');
    expect(getDocs).toHaveBeenCalledWith({});
    expect(mockDispatch).toHaveBeenCalledWith(setCurrentRating(5));
  });

  it('диспатчит 0, если фильм не найден в рейтингах пользователя', async () => {
    const mockDispatch = jest.fn();
    const mockQuerySnapshot = {
      forEach: (callback) => {
        callback({
          data: () => ({
            email: 'test@example.com',
            ratings: [
              { movieID: 'tt7654321', rating: 3 },
            ],
          }),
        });
      },
    };

    collection.mockReturnValue({});
    getDocs.mockResolvedValue(mockQuerySnapshot);

    await getMovieRating('test@example.com', 'tt1234567', mockDispatch);

    expect(collection).toHaveBeenCalledWith(db, 'users');
    expect(getDocs).toHaveBeenCalledWith({});
    expect(mockDispatch).toHaveBeenCalledWith(setCurrentRating(0));
  });

  it('диспатчит 0, если пользователь не найден', async () => {
    const mockDispatch = jest.fn();
    const mockQuerySnapshot = {
      forEach: jest.fn(), // Не вызывает callback, так как пользователь не найден
    };

    collection.mockReturnValue({});
    getDocs.mockResolvedValue(mockQuerySnapshot);

    await getMovieRating('test@example.com', 'tt1234567', mockDispatch);

    expect(collection).toHaveBeenCalledWith(db, 'users');
    expect(getDocs).toHaveBeenCalledWith({});
    expect(mockDispatch).toHaveBeenCalledWith(setCurrentRating(0));
  });

  it('диспатчит 0 и логирует ошибку при исключении', async () => {
    const mockDispatch = jest.fn();
    const error = new Error('Ошибка');
    getDocs.mockRejectedValue(error);

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

    await getMovieRating('test@example.com', 'tt1234567', mockDispatch);

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching rating: ', error);
    expect(mockDispatch).toHaveBeenCalledWith(setCurrentRating(0));

    consoleErrorSpy.mockRestore();
  });
});