import React from 'react'
import Filters from '../filters/Filters'
import MovieList from '../movie-list/MovieList'
import Pagination from '../pagination/Pagination'
import { selectMovies, selectLoading } from '../../features/moviesSlice';
import { useSelector } from 'react-redux'
import MyLoader from '../UI/loader/MyLoader'
import ErrorRequest from '../request-error/ErrorRequest';


const SearchBar = () => {
  const isLoading = useSelector(selectLoading);
  const movies = useSelector(selectMovies);
  const hasError = movies && movies.Error;
  const hasSearch = movies && movies.Search;

  return (
    isLoading ? (
      <MyLoader style={{ marginTop: 250 }} />
    ) : hasError ? (
      <>
        <Filters />
        <ErrorRequest />
      </>
    ) : (
      <>
        <Filters />
        <MovieList data={hasSearch ? movies.Search : ''} />
        <Pagination />
      </>
    )
  );
}

export default SearchBar
