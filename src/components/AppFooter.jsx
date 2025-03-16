import React from 'react'
import { Link } from 'react-router-dom'

const AppFooter = () => {
  return (
    <div className='App-footer'>
      <Link to='/'>
        <div className='App-copyright'>
          ©
          <span> The Open Movie Database</span>
        </div>
      </Link>

      <div className='App-info'>
        <Link to='/appendix'>
          <span>Appendix </span>
        </Link>
        ♦
        <Link to='/rights'>
          <span> Rights </span>
        </Link>
        ♦
        <Link to='/contacts'>
          <span> Contacts</span>
        </Link>
      </div>
    </div>
  )
}

export default AppFooter
