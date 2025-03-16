import React from 'react'
import AppHeader from '../components/AppHeader'
import AppSearchPanel from '../components/AppSearchPanel'
import AppFooter from '../components/AppFooter'
import SearchBar from '../components/search-bar/SearchBar'

const Search = () => {
  return (
    <>
      <AppHeader/>
      <div className='App-body'>
        <AppSearchPanel/>
        <SearchBar/>
      </div>
      <AppFooter/>      
    </>
  )
}

export default Search