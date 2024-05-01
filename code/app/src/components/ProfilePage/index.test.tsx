import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ProfilePage from './index'; // Adjust the import path as necessary
import userEvent from '@testing-library/user-event';
import { AuthContext } from '../../context/AuthContext';

// Mock context data
const mockAuthContext = {
    state: {
        email: 'user@example.com',
        username: 'user123',
        isAuthenticated: true
    },
    // If there are functions that update these values or perform actions, you can mock them as well:
    dispatch: jest.fn()
};


describe('ProfilePage Component', () => {

    beforeEach(() => {
        // Reset all mocks before each test if any method from context is mocked
        jest.clearAllMocks();
    });

    it('renders without crashing', () => {
        render(<AuthContext.Provider value={mockAuthContext}><ProfilePage /></AuthContext.Provider>);
    });

    it('should display a user profile form', () => {
        render(<AuthContext.Provider value={mockAuthContext}><ProfilePage /></AuthContext.Provider>);
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /save changes/i })).toBeInTheDocument();
    });

    it('allows entering a username', () => {
        render(<AuthContext.Provider value={mockAuthContext}><ProfilePage /></AuthContext.Provider>);
        const input: HTMLInputElement = screen.getByLabelText(/username/i);
        fireEvent.change(input, { target: { value: 'newUsername' } });
        expect(input.value).toBe('newUsername');
    });

    it('allows submission with valid data', async () => {
        const { getByLabelText, getByText } = render(
            <AuthContext.Provider value={mockAuthContext}>
                <ProfilePage />
            </AuthContext.Provider>
        );

        // Assume we are using async operations
        userEvent.type(getByLabelText(/username/i), 'john_doe');
        const email = getByLabelText(/email/i);
        fireEvent.change(email, { target: { value: 'john@example.com' } });

        const saveChangesButton = getByText('Save Changes');
        userEvent.click(saveChangesButton);

        // Check for a successful submission message
        expect(await screen.findByText(/profile updated successfully/i)).toBeInTheDocument();
    });

    it('shows error messages for invalid data', async () => {
        const { getByLabelText, getByText } = render(
            <AuthContext.Provider value={mockAuthContext}>
                <ProfilePage />
            </AuthContext.Provider>
        );

        userEvent.type(getByLabelText(/username/i), ''); // Leave username empty
        userEvent.type(getByLabelText(/email/i), 'john@'); // Enter an invalid email
        const saveChangesButton = getByText('Save Changes');
        userEvent.click(saveChangesButton);

        // Check for error messages
        expect(await screen.findByText(/Username is required/i)).toBeInTheDocument();
        expect(await screen.findByText(/Must be a valid email/i)).toBeInTheDocument();
    });

});
