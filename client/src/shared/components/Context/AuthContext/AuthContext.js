import React from 'react';

const defaultAuthContext = {
    isAuthenticated: false,
    authenticateUser: (token, permissions, isRememberMe,_id) => { },
    logoutUser: () => { },
    checkAuthentication: () => false,
    checkIsRememberMe: () => false,
    authenticateRoute: (permission) => false
}
export const AuthContext = React.createContext(defaultAuthContext);
export const AuthProvider = AuthContext.Provider;
export const AuthConsumer = AuthContext.Consumer;