// LandingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegistrationPage from './RegistrationPage';
import LoginPage from './LoginPage';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleRegisterSuccess = () => {
        navigate.push('/home'); 
    };

    const handleLoginSuccess = () => {
        navigate.push('/home'); 
    };

    return (
        <div>
            <h1>Welcome to My App</h1>
            <LoginPage onSuccess={handleLoginSuccess} />
            <RegistrationPage onSuccess={handleRegisterSuccess} />
        </div>
    );
};

export default LandingPage;
