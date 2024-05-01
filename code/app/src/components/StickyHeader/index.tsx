import React, { useContext, useState } from 'react';
import { AuthContext, AuthContextType } from '../../context/AuthContext';
import Logo from '../Logo';
import { Link } from 'react-router-dom';

const StickyHeader = () => {
    const { state, dispatch } = useContext<AuthContextType>(AuthContext);
    const { isAuthenticated, email } = state;
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        setDropdownOpen(false); // Close dropdown on logout
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="bg-white shadow-md sticky top-0 z-50 p-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <Logo maxWidth='60px' />
                    <nav>
                        <Link to="/dashboard" className="text-blue-500 hover:text-blue-700 ml-10">Dashboard</Link>  {/* Increased margin left */}
                    </nav>
                </div>
                <div className='flex items-center mr-2'>
                    <div className="relative">
                        <div onClick={toggleDropdown} className="px-4 py-2 rounded cursor-pointer">
                            {isAuthenticated && <span>Welcome, {email}</span>}
                        </div>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg">
                                <Link to="/dashboard" className='block text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full mb-1'>Dashboard</Link> {/* Dashboard link */}
                                <Link to="/profile" className='block text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full mb-1'>Profile</Link> {/* Profile link */}
                                <button onClick={handleLogout} className="block text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full">Logout</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StickyHeader;
