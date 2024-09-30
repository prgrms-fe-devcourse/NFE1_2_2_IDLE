import React from 'react';
import SignUp from '../components/Auth/SignUp';
import Logo from '../assets/images/logo.png'
import './SignUpPage.css'

const SignUpPage = () => {
    return (
        <>
        <div className='page-container'>
            <div className='logo'>
                <img src={Logo} alt='Logo'/>
            </div>
            <div className='form-section'>
                <SignUp/>
            </div>
        </div>
        </>
        
    );
};

export default SignUpPage;