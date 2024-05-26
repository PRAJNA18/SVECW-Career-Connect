import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegistrationPage from './RegistrationPage';
import LoginPage from './LoginPage';

const LandingPage = () => {
    const [isLoginPage, setIsLoginPage] = useState(true);
    const navigate = useNavigate();

    const handleRegisterSuccess = () => {
        navigate('/home'); 
    };

    const handleLoginSuccess = () => {
        navigate('/home'); 
    };

    const togglePage = () => {
        setIsLoginPage(!isLoginPage);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6 lg:p-8">
            <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 bg-white p-6 sm:p-8 lg:p-10 rounded-lg shadow-md">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6">Welcome to My App</h1>
                {isLoginPage ? (
                    <>
                        <LoginPage onSuccess={handleLoginSuccess} />
                        <p className="mt-4 text-center">
                            New to this app? 
                            <button onClick={togglePage} className="ml-2 text-blue-500 hover:text-blue-700 font-semibold">
                                Register here
                            </button>
                        </p>
                    </>
                ) : (
                    <>
                        <RegistrationPage onSuccess={handleRegisterSuccess} />
                        <p className="mt-4 text-center">
                            Already have an account? 
                            <button onClick={togglePage} className="ml-2 text-blue-500 hover:text-blue-700 font-semibold">
                                Login here
                            </button>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default LandingPage;
