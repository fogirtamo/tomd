import addCommentToMovie from '../API/AddCommentToMovie';

jest.mock('firebase/firestore', () => ({
  addDoc: jest.fn(),
  collection: jest.fn(),
}));
jest.mock('../firebase', () => ({
  db: {},
}));

const { addDoc, collection } = require('firebase/firestore');

describe('addCommentToMovie', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('корректно вызывает addDoc с нужными аргументами', async () => {
    const mockCollectionRef = {};
    collection.mockReturnValue(mockCollectionRef);
    addDoc.mockResolvedValue({ id: 'test-id' });

    const nickname = 'user';
    const id = 'user-id';
    const comment = 'test comment';
    const imdbID = 'tt1234567';
    const title = 'Test Movie';

    const dateNow = Date.now;
    Date.now = jest.fn(() => 1234567890);

    await addCommentToMovie(nickname, id, comment, imdbID, title);

    expect(collection).toHaveBeenCalledWith({}, 'comments');
    expect(addDoc).toHaveBeenCalledWith(mockCollectionRef, expect.objectContaining({
      nickname,
      userId: id,
      movieId: imdbID,
      comment,
      movieTitle: title,
      date: 1234567890,
      formattedDate: expect.any(String),
    }));

    Date.now = dateNow;
  });

  it('логирует ошибку, если addDoc выбрасывает исключение', async () => {
    const error = new Error('fail');
    collection.mockReturnValue({});
    addDoc.mockRejectedValue(error);
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await addCommentToMovie('nick', 'id', 'comment', 'imdb', 'title');

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error adding document: ', error);

    consoleErrorSpy.mockRestore();
  });
});