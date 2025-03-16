import React from 'react'
import logo from '../logo.png'
import { Link } from 'react-router-dom'
import AppAuth from './AppAuth'


const AppHeader = () => {
  return (
    <div className='App-header'>
      <Link to='/'>
        <img src={logo} className='App-logo' alt='logo' />
      </Link>
      <AppAuth />
    </div>
  )
}

export default AppHeader
