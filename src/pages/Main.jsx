import React from 'react'
import AppHeader from '../components/AppHeader'
import AppSearchPanel from '../components/AppSearchPanel'
import AppFooter from '../components/AppFooter'
import Slider from '../components/slider/Slider'
import SearchBar from '../components/search-bar/SearchBar'

const Main = () => {
  return (
    <>
      <AppHeader />
      <div className='App-body'>
        <AppSearchPanel />
        <Slider />
      </div>
      <AppFooter />
    </>
  )
}

export default Main

