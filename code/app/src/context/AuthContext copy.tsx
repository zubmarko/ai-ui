// @ts-nocheck
import React, { createContext, useReducer, useEffect, ReactNode } from 'react';

interface AuthState {
  isAuthenticated: boolean;
}

interface AuthAction {
  type: 'LOGIN' | 'LOGOUT';
}

const initialState: AuthState = {
  isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated') || 'false'),
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isAuthenticated: true };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
};

export const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch
}>();

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
