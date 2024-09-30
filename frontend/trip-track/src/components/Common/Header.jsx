import React from 'react';
import './Header.css';
import Logo from '../../assets/images/logo.png'

const Header = () => {
    return (
        <div className='header-container'>
            <div className='logo'>
                <img src={Logo} alt='Logo'/>
                <p>Trip Track</p>
            </div>
            <hr style={{background: "#0066ff"}}/>
        </div>
    );
};

export default Header;