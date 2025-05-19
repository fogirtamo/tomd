import MovieService from '../API/MovieService';
import axios from 'axios';

jest.mock('axios');

describe('MovieService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('успешно получает список фильмов', async () => {
      const mockResponse = {
        data: {
          Search: [
            { Title: 'Movie 1', Year: '2021', imdbID: 'tt1234567' },
            { Title: 'Movie 2', Year: '2020', imdbID: 'tt7654321' },
          ],
          totalResults: '2',
          Response: 'True',
        },
      };

      axios.get.mockResolvedValue(mockResponse);

      const result = await MovieService.getAll('Batman', 1, 'movie', '2021');

      expect(axios.get).toHaveBeenCalledWith(
        'https://www.omdbapi.com/?apikey=c83521aa&s=Batman&page=1&type=movie&y=2021'
      );
      expect(result).toEqual(mockResponse.data);
    });

    it('возвращает ошибку, если запрос не удался', async () => {
      const mockError = new Error('Network Error');
      axios.get.mockRejectedValue(mockError);

      await expect(MovieService.getAll('Batman')).rejects.toThrow('Network Error');
      expect(axios.get).toHaveBeenCalledWith(
        'https://www.omdbapi.com/?apikey=c83521aa&s=Batman&page=1&type=&y='
      );
    });
  });

  describe('getOne', () => {
    it('успешно получает данные о фильме', async () => {
      const mockResponse = {
        data: {
          Title: 'Movie 1',
          Year: '2021',
          imdbID: 'tt1234567',
          Plot: 'This is a test plot.',
        },
      };

      axios.get.mockResolvedValue(mockResponse);

      const result = await MovieService.getOne('tt1234567');

      expect(axios.get).toHaveBeenCalledWith(
        'https://www.omdbapi.com/?apikey=c83521aa&plot=full&i=tt1234567'
      );
      expect(result).toEqual(mockResponse.data);
    });

    it('возвращает ошибку, если запрос не удался', async () => {
      const mockError = new Error('Network Error');
      axios.get.mockRejectedValue(mockError);

      await expect(MovieService.getOne('tt1234567')).rejects.toThrow('Network Error');
      expect(axios.get).toHaveBeenCalledWith(
        'https://www.omdbapi.com/?apikey=c83521aa&plot=full&i=tt1234567'
      );
    });
  });
});