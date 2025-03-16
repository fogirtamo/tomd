import React from 'react'
import AppHeader from '../components/AppHeader'
import AppSearchPanel from '../components/AppSearchPanel'
import AppFooter from '../components/AppFooter'
import SignUp from '../components/sign-up/SignUp'

const Registration = () => {
  return (
    <>
      <AppHeader/>
      <div className='App-body'>
        <AppSearchPanel/>
        <SignUp/>
      </div>
      <AppFooter/>      
    </>
  )
}

export default Registration