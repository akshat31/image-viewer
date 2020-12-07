import React, { useState, Fragment } from 'react';
import Avatar from '@material-ui/core/Avatar';
import './header.css';
import AvatarImage from '../../assets/images/avatar.jpg'

const Header = (props) => {
    const isAuth = sessionStorage.getItem("access-token");
    const [toggler, setToggler] = useState(false);

    const handleClick = () => {
        setToggler(!toggler);
    }

    const handleLogout = () => {
        sessionStorage.clear();
        props.history.push('/');
    }

    const handleRedirect = () => {
        if (props.history.location.pathname !== '/profile') {
            props.history.push('/profile');
        }
    }

    const currentPage = props.history && props.history.location.pathname;

    console.log('currentPage currentPage', currentPage)

    return (
        <div className='header-bg'>
            <span className='head-logo'>Image Viewer</span>
            {
                isAuth ? (
                    <Fragment>
                        <div className={`d-flex ${currentPage !== '/profile' ? 'w-30' : ''}`}>
                            {
                                currentPage !== '/profile' && (
                                    <div className="has-search w-75">
                                        <span className="fa fa-search text-dark form-control-feedback"></span>
                                        <input type="text" className="form-control" placeholder="Search..." />
                                    </div>
                                )
                            }
                            <Avatar onClick={handleClick} className='cursor-pointer mx-4 border border-light' alt="Remy Sharp" src={AvatarImage} />
                            {toggler && (
                                <ul className='popup-container'>
                                    { currentPage !== '/profile' && <li
                                        className='border-btm'
                                        onClick={handleRedirect}>
                                        My Account
                                    </li>}
                                    <li onClick={handleLogout}>Logout</li>
                                </ul>
                            )}
                        </div>
                    </Fragment>
                ) : null
            }            
        </div>
    )
}

export { Header };
