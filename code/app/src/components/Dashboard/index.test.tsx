// @ts-nocheck
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { fetchFrameworks } from '../../api/fakeRequest';
import Index from './index';

// Assuming fetchFrameworks is properly mocked as previously discussed
jest.mock('../../api/fakeRequest', () => ({
  fetchFrameworks: jest.fn()
}));

jest.mock('../LogoutButton', () => () => <div>LogoutButton</div>);

describe('Index component tests', () => {
  beforeEach(() => {
    // Assuming fetchFrameworks is mocked to resolve with an array of frameworks
    fetchFrameworks.mockResolvedValue([{ id: 1, name: 'React' }]);
    jest.clearAllMocks();
  });

  test('renders the table correctly', async () => {
    const { findByText } = render(<Index />);
    await waitFor(async () => {
      const item = await findByText('React');
      expect(item).toBeInTheDocument();
    });
  });

  test('toggle edit mode', async () => {
    const { getByTestId, findByText } = render(<Index />);
    await waitFor(async () => {
      const toggleButton = getByTestId('toggle-edit');
      userEvent.click(toggleButton);
      const editMode = await findByText('Exit Edit Mode');
      expect(editMode).toBeInTheDocument();
    });
  });

  test('add new framework', async () => {
    const { getByTestId, findByText } = render(<Index />);

    await waitFor(async () => {
      // First ensure the component is in edit mode
      const toggleButton = getByTestId('toggle-edit');
      userEvent.click(toggleButton);
      const editMode = await findByText('Exit Edit Mode');
      expect(editMode).toBeInTheDocument();
    });

    await waitFor(async () => {
      const addButton = getByTestId('add-framework-button');
      userEvent.click(addButton);
      const newFramework = await findByText('Add Framework');
      expect(newFramework).toBeInTheDocument();
    });
  });

  test('toggle edit mode and remove framework from table', async () => {
    const { getByTestId, queryByText, findByText } = render(<Index />);
    await waitFor(async () => {
      // First ensure the component is in edit mode
      const toggleButton = getByTestId('toggle-edit');
      userEvent.click(toggleButton);
      const editMode = await findByText('Exit Edit Mode');
      expect(editMode).toBeInTheDocument();
    });

    // Then interact with the delete button
    await waitFor(() => {
      const deleteButton = getByTestId('delete-framework-1');
      userEvent.click(deleteButton);
      const framework = queryByText('React');
      expect(framework).not.toBeInTheDocument();
    });

  });

  test('displays "Loading..." text while fetching data', async () => {
    // Mock fetchFrameworks to delay its response to simulate loading
    fetchFrameworks.mockImplementation(() =>
      new Promise(resolve =>
        setTimeout(() => resolve([{ id: 1, name: 'React' }]), 500)
      )
    );

    const { findByText } = render(<Index />);
    const loadingText = await findByText('Loading...');
    expect(loadingText).toBeInTheDocument();

    // After the "Loading..." text, check that the actual data is rendered
    const item = await findByText('React');
    expect(item).toBeInTheDocument();
  });

  test('displays "Enter Edit Mode" text initially', async () => {
    const { findByText, getByTestId } = render(<Index />);
    const enterEditModeButton = await findByText('Enter Edit Mode');
    expect(enterEditModeButton).toBeInTheDocument();

    // Optionally, test the toggle functionality in the same test
    userEvent.click(enterEditModeButton);
    const exitEditMode = await findByText('Exit Edit Mode');
    expect(exitEditMode).toBeInTheDocument();
  });

});
