import React, { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext, AuthContextType } from '../../context/AuthContext';

// Define the props for the AuthGuard component
interface AuthGuardProps {
    children: ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
    // Use the AuthContext with proper typing
    const { state: { isAuthenticated } } = useContext<AuthContextType>(AuthContext);

    // Redirect to sign-in if not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/sign-in" replace />;
    }

    return <>{children}</>;
}

export default AuthGuard;
