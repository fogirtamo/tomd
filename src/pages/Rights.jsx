import React from 'react'
import AppHeader from '../components/AppHeader'
import AppSearchPanel from '../components/AppSearchPanel'
import AppFooter from '../components/AppFooter'

const Rights = () => {
    return (
        <>
            <AppHeader />
            <div className='App-body'>
                <AppSearchPanel />
                <div className='informationBlock'>
                    The TOMD website is an information and advisory non-commercial service.
                    <br />
                    <br />
                    We hereby notify you that the internal resources of the website do not
                    store content that contains copyrighted objects and violates copyright laws.
                    The website administration also does not carry out activities related to the publication
                    of unlicensed content that was illegally stolen and protected by copyright holders.
                    <br />
                    <br />
                    The TOMD website is always open for cooperation with copyright holders. If your exclusive
                    rights to copyrighted objects are violated in any way using this website, the administration is
                    ready to assist you and remove the corresponding links from the website.
                    <br />
                    <br />
                    Best regards, site administration
                </div>
            </div>
            <AppFooter />
        </>
    )
}

export default Rights
