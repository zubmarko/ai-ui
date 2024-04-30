// @ts-nocheck
import React, { createContext, useReducer, useEffect, ReactNode } from 'react';

export interface AuthState {
  isAuthenticated: boolean;
  email: string | null; // Adding email to the state
}

interface AuthAction {
  type: 'LOGIN' | 'LOGOUT';
  email?: string; // Optional email for the LOGIN action
}

const initialState: AuthState = {
  isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated') || 'false'),
  email: null, // Initialize email as null
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      // Store email from action if provided
      return { ...state, isAuthenticated: true, email: action.email || null };
    case 'LOGOUT':
      // Clear email on logout
      return { ...state, isAuthenticated: false, email: null };
    default:
      return state;
  }
};


export type AuthContextType = {
  state: AuthState;
  dispatch: React.Dispatch
}

export const AuthContext = createContext<AuthContextType>();

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(state.isAuthenticated));
  }, [state.isAuthenticated]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
