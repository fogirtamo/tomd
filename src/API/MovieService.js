import axios from "axios"

export default class MovieService {
    static async getAll(title, page = 1, type = '', year = '') {
        const response = await axios.get('https://www.omdbapi.com/?apikey=c83521aa&s=' + `${title}` + '&page=' + `${page}` + '&type=' + `${type}` + '&y=' + `${year}`
        );
        return response.data;
    }
    static async getOne(id) {
        const response = await axios.get('https://www.omdbapi.com/?apikey=c83521aa&plot=full&i=' + `${id}`
        );
        return response.data;
    }
}