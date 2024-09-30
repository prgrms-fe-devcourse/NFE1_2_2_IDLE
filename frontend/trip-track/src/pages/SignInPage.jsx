import React from 'react';
import Logo from '../assets/images/logo.png'
import './SignInPage.css'
import SignIn from '../components/Auth/SignIn';
import { Link } from 'react-router-dom';

const SignInPage = () => {
    return (
        <>
        <div className='page-container'>
            <div className='logo'>
                <img src={Logo} alt='Logo'/>
            </div>
            <div className='form-section'>
                <SignIn/>
                <br/>
                <p>don't have account? <Link to='/SignUp'>Sign Up!</Link></p>
            </div>
        </div>
        </>
        
    );
};

export default SignInPage;