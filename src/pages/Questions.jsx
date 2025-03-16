import React from 'react'
import AppHeader from '../components/AppHeader'
import AppSearchPanel from '../components/AppSearchPanel'
import AppFooter from '../components/AppFooter'

const Questions = () => {
    return (
        <>
            <AppHeader />
            <div className='App-body'>
                <AppSearchPanel />
                <div className='informationBlock'>
                    Frequently asked questions:
                    <br />
                    <br />
                    1. Why do I need to register?
                    <br />
                    - full participation in commenting
                    <br />
                    - participation in rating films
                    <br />
                    - using the "favorites" function
                    <br />
                    <br />
                    2. I don't receive an email after registration
                    <br />
                    Check your "spam" or "junk" folder in your email, it could have ended up there by mistake
                    <br />
                    <br />
                    3. Can't log in with your username and password?
                    <br />
                    Clear your browser history. You can do this in its settings (quick menu call: Ctrl+Shift+Del)
                    <br />
                    <br />
                    4. Are you a registered user, but you constantly need to "log in" to the site?
                    <br />
                    First, clear your browser history, then, when you log in to the site, check the "remember" box
                    <br />
                    <br />
                    5. Why don't my comments appear on the site?
                    <br />
                    All comments are manually moderated.
                    <br />
                    Comments will not be posted:
                    <br />
                    1) not related to the film;
                    <br />
                    2) profanity;
                    <br />
                    3) insults to other users;
                    <br />
                    4) discussion of advertising, as well as any kind of advertising of third-party resources;
                    <br />
                    5) statements aimed at inciting ethnic hatred, manifestations of racism, extremism, slander, and other statements that may violate the laws of countries;
                    <br />
                    6) the commentator's nickname contains: the name of the site, a swear word, names of public figures, mentions of country names.
                </div>
            </div>
            <AppFooter />
        </>
    )
}

export default Questions
