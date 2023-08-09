import React, { useState } from 'react';
import { AuthProvider } from './AuthContext';
import { withRouter } from 'react-router';
import { TOKEN, PERMISSIONS, ISREMEMBERME, ID, USER } from '../../../modules/Enums/StorageEnums';


const AuthContextContainer = ({ children }) => {
    const defaultAuthState = {
        isAuthenticated: false,
        token: '',
        isRememberMe: false,
        permissions:[]
    }

    const [state, setState] = useState(defaultAuthState);

    const authenticateUser = (token, permissions, isRememberMe, _id, user) => {
        localStorage.setItem(TOKEN, token);
        localStorage.setItem(PERMISSIONS, JSON.stringify(permissions));
        localStorage.setItem(ISREMEMBERME, isRememberMe);
        localStorage.setItem(ID, _id);
        localStorage.setItem(USER, JSON.stringify(user));
        setState(prev => {
            return {
                ...prev,
                isAuthenticated: true,
                permissions: permissions,
                token: token,
                isRememberMe: isRememberMe,
            }
        })
    }

    const logoutUser = () => {
        localStorage.removeItem(TOKEN);
        localStorage.removeItem(USER);
        localStorage.removeItem(ID);
        localStorage.removeItem(PERMISSIONS);
        localStorage.removeItem(ISREMEMBERME);
        setState(prev => {
            return {
                ...prev,
                isAuthenticated: false,
            }
        });
    }

    const checkAuthentication = () => {
        let token = localStorage.getItem(TOKEN);
        if (token) {
            return true;
        }
        return false;
    }

    const checkIsRememberMe = () => {
        var value = localStorage.getItem(ISREMEMBERME);
        return value;
    }

    const authenticateRoute = (permission) => {
        let user = checkAuthentication();
        let claims = localStorage.getItem(PERMISSIONS);

        if (user) {
            if (claims.includes(permission)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    return (
        <AuthProvider
            value={{
                isAuthenticated: state.isAuthenticated,
                authenticateUser,
                logoutUser,
                checkAuthentication,
                authenticateRoute,
                checkIsRememberMe,
                permissions: state.permissions
            }}>
            {children}
        </AuthProvider>
    );
}

export default withRouter(AuthContextContainer);
