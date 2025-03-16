import React from 'react'
import AppHeader from '../components/AppHeader'
import AppSearchPanel from '../components/AppSearchPanel'
import AppFooter from '../components/AppFooter'
import { Link } from 'react-router-dom'

const Contacts = () => {
    return (
        <>
            <AppHeader />
            <div className='App-body'>
                <AppSearchPanel />
                <div className='informationBlock'>
                    <span>Before contacting us, please see the answer to your question <Link to='/questions'>here</Link>.</span>
                    <br />
                    <br />
                    Contact the site administration:
                    <br />
                    E-mail - vladbas2408@gmail.com
                    <br />
                    telegram - @fogirtamo
                </div>
            </div>
            <AppFooter />
        </>
    )
}

export default Contacts
