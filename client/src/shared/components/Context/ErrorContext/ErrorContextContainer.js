import React, { useState } from 'react';
import { ErrorProvider } from '../ErrorContext';


const ErrorContextContainer = ({ children }) => {

    const [state, setState] = useState({
        error: false,
        success: false,
        message: ''
    });

    const setError = (error, message) => {
        setState({
            error: error,
            message: message,
            success: false
        })
    };

    const setSuccess = (success, message) => {
        setState({
            error: false,
            success: success,
            message: message
        })
    }

    const setDefault = () => {
        setState({
            error: false,
            message: '',
            success: false
        })
    }

    return (
        <ErrorProvider
            value={{
                state,
                setSuccess,
                setError,
                setDefault
            }}
        >
            {children}
        </ErrorProvider>
    )
}


export default ErrorContextContainer;