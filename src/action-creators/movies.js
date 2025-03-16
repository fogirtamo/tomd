import MovieService from "../API/MovieService";
import { getCurrentPage, getMovies, getMoviesError, getMoviesSuccess, getTitle, getMovie, getMovieSuccess, getMovieError } from "../features/moviesSlice";

//Redux Thunk
export async function getMoviesData(dispatch, title, page, type, year) {
    dispatch(getMovies());
    try {
        const data = await MovieService.getAll(title, page, type, year);
        dispatch(getMoviesSuccess(data));
        dispatch(getTitle(title));
        dispatch(getCurrentPage(page));
    } catch (error) {
        dispatch(getMoviesError(error))
    };
};

export async function getMovieData(dispatch, id) {
    dispatch(getMovie());
    try {
        const data = await MovieService.getOne(id);
        dispatch(getMovieSuccess(data));
    } catch (error) {
        dispatch(getMovieError(error))
    };
};
