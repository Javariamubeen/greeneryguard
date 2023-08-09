import React from 'react';


//handle error/success notifications
const defaultErrorContext = {
    state: {
        error: false,
        message: null,
        success: false,
    },
    setError: () => { },
    setSuccess: () => { },
    setDefault: () => { }
};


export const ErrorContext = React.createContext(defaultErrorContext);
export const ErrorProvider = ErrorContext.Provider;
export const ErrorConsumer = ErrorContext.Consumer;