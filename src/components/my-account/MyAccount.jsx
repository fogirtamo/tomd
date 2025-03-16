import React, { useState } from 'react'
import classes from './MyAccount.module.css'
import MyButton from 'components/UI/button/MyButton'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from 'hooks/use-auth'
import MyCommentsAndRatings from 'components/my-comments-and-ratings/MyCommentsAndRatings'


const MyAccount = () => {
    const navigate = useNavigate();
    const { isAuth, email, nickname } = useAuth();
    const [activeSection, setActiveSection] = useState(true);

    return (
        isAuth ?
            <div className={classes.myAccount}>
                <div className={classes.backButton}>
                    <Link to={'/'}>
                        <MyButton style={{ width: 90, height: 25, borderRadius: 5 }}>≪ Back</MyButton>
                    </Link>
                </div>
                <div className={classes.myAccountContainer}>
                    <div className={classes.myAccountEmail}>E-mail: {email}</div>
                    <div className={classes.myAccountLogin}>Nickname: {nickname} </div>
                    <div className={classes.myAccountActions}>
                        <MyButton
                            onMouseDown={() => setActiveSection(true)}
                            style={{
                                width: 150,
                                borderRadius: 5,
                                marginRight: 20,
                                border: activeSection && '1px solid gray',
                                background: activeSection && 'rgba(20, 20, 20, 1.00)'
                            }}
                        >MY COMMENTS</MyButton>
                        <MyButton
                            onMouseDown={() => setActiveSection(false)}
                            style={{
                                width: 150,
                                borderRadius: 5,
                                marginLeft: 20,
                                border: !activeSection && '1px solid gray',
                                background: !activeSection && 'rgba(20, 20, 20, 1.00)'
                            }}
                        >MY RATINGS</MyButton>
                    </div>
                    <MyCommentsAndRatings
                        activeSection={activeSection}
                    />
                </div>
            </div>
            :
            navigate('/', { replace: false })
    )
}

export default MyAccount
