import React from 'react'
import AppHeader from '../components/AppHeader'
import AppSearchPanel from '../components/AppSearchPanel'
import AppFooter from '../components/AppFooter'

const Appendix = () => {
    return (
        <>
            <AppHeader />
            <div className='App-body'>
                <AppSearchPanel />
                <div className='informationBlock'>
                    Dear visitors!
                    <br />
                    <br />
                    We have not created applications for iPad, iPhone App or Android mobile devices, and are not responsible for such on the Internet.
                    <br />
                    <br />
                    Any application for mobile devices that you find on the Internet, in Apple or Android stores offering viewing TOMD, you install at
                    your own risk, and for the safety of your tablets and mobiles, we strongly recommend that you do not try to install such applications,
                    even if it says that it is official and there is a link to our site.
                    <br />
                    <br />
                    Best regards, site administration
                </div>
            </div>
            <AppFooter />
        </>
    )
}

export default Appendix
