import addNewUser from '../API/AddNewUser';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  addDoc: jest.fn(),
}));

jest.mock('../firebase', () => ({
  db: {},
}));

describe('addNewUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('корректно вызывает addDoc с нужными аргументами', async () => {
    const mockCollectionRef = {};
    collection.mockReturnValue(mockCollectionRef);
    addDoc.mockResolvedValue({ id: 'test-id' });

    const email = 'test@example.com';
    const nickname = 'testuser';
    const userId = 'user-id';

    await addNewUser(email, nickname, userId);

    expect(collection).toHaveBeenCalledWith(db, 'users');
    expect(addDoc).toHaveBeenCalledWith(mockCollectionRef, {
      email,
      nickname,
      userId,
      ratings: [],
    });
  });

  it('логирует ошибку, если addDoc выбрасывает исключение', async () => {
    const error = new Error('fail');
    collection.mockReturnValue({});
    addDoc.mockRejectedValue(error);
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

    await addNewUser('test@example.com', 'testuser', 'user-id');

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error adding document: ', error);

    consoleErrorSpy.mockRestore();
  });
});