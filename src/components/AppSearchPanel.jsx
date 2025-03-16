import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import MyButton from './UI/button/MyButton'
import MyInput from './UI/input/MyInput'
import { Link, useNavigate } from 'react-router-dom';
import { getMoviesData } from '../action-creators/movies';
import { getMovieType, getMovieYear, getTitle, selectTitle } from '../features/moviesSlice';

const AppSearchPanel = () => {
  const navigate = useNavigate();
  const searchTitle = useSelector(selectTitle);
  const currentPage = 1;
  const dispatch = useDispatch();

  function handleMouseDown() {
    dispatch(getMovieType(''));
    dispatch(getMovieYear(''));
    getMoviesData(dispatch, searchTitle, currentPage);
  }

  function handleOnChangeTitle(title) {
    dispatch(getTitle(title));
  }

  return (
    <div className='App-search__panel'>
      <MyInput
        value={searchTitle}
        onChange={e => {
          handleOnChangeTitle(e.target.value);
        }}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            navigate('/search', { replace: false });
            handleMouseDown();
          }
        }}
        id='searchInput'
        style={{ width: 350 }}
        placeholder="Movie title..."
        type="text"
        autoComplete='off'
      />
      <Link to='/search'>
        <MyButton
          onMouseDown={handleMouseDown}
          style={{ width: 100 }}>Search
        </MyButton>
      </Link>
    </div>

  )
}

export default AppSearchPanel
