import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './test/AuthContext';

const LogoutButton = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('isAuthenticated'); // Clear auth state from localStorage
    navigate('/sign-in');
  };

  return (
    <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">
      Logout
    </button>
  );
};

export default LogoutButton;
