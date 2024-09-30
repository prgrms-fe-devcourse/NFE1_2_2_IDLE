import React from 'react';
import Logo from '../assets/images/logo.png'
import './SignInPage.css'
import SignIn from '../components/Auth/SignIn';

const SignUpPage = () => {
    return (
        <>
        <header/>
        <div className='page-container'>
            <div className='logo'>
                <img src={Logo} alt='Logo'/>
            </div>
            <div className='form-section'>
                <SignIn/>
            </div>
        </div>
        </>
        
    );
};

export default SignUpPage;