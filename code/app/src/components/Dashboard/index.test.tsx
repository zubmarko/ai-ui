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
    fetchFrameworks.mockResolvedValue([{
      id: 1, name: 'React', type: 'Library', githubStars: 20000,
      type: "Library",
      pros: "Reusable components, large community",
      cons: "High pace of changes, JSX as a barrier",
    }]);
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


  test('search filters frameworks correctly', async () => {
    const { getByPlaceholderText, findAllByText, findByText } = render(<Index />);
    await waitFor(async () => {
      const searchInput = getByPlaceholderText('Search by name...');

      // Simulate typing into the search field
      fireEvent.change(searchInput, { target: { value: 'React' } });
      // Assuming only 'React' contains the text and others like 'Vue' do not
      const filteredItems = await findAllByText('React');
      expect(filteredItems).toHaveLength(1); // Assuming React appears once in your mocked data
    });
  });

  // Fake TEST
  test.skip('error handling on fetch failure', async () => {
    fetchFrameworks.mockRejectedValue(new Error('Network Error'));
    const { findByText } = render(<Index />);
    const errorText = await findByText('Failed to fetch frameworks');
    expect(errorText).toBeInTheDocument();
  });

  // Current Test 
  // User Press Enter Edit Mode
  // than can see add-framework-button
  // Chat GPT added submit-new-framework - non existing selector
  test('validates new framework details before adding', async () => {
    const { getByTestId, findByText, getByText } = render(<Index />);

    const enterEditModeButton = await findByText('Enter Edit Mode');
    fireEvent.click(enterEditModeButton);

    const addButton = getByTestId('add-framework-button');
    fireEvent.click(addButton);

    // Input for the framework name with an invalid entry
    const frameworkNameInput = getByTestId('frameworks.1.name');
    fireEvent.change(frameworkNameInput, { target: { value: 'A' } });

    // Input for the framework type with an invalid entry
    const frameworkTypeInput = getByTestId('frameworks.1.type');
    fireEvent.change(frameworkTypeInput, { target: { value: '' } }); // Assuming the type requires at least some characters

    // Input for the GitHub Stars with an invalid entry
    const frameworkGithubStarsInput = getByTestId('frameworks.1.githubStars');
    fireEvent.change(frameworkGithubStarsInput, { target: { value: '' } }); // Assuming GitHub Stars cannot be empty

    // Simulate saving the new framework
    const saveChangesButton = getByText('Save Changes');
    fireEvent.click(saveChangesButton);

    // Check for validation error messages
    const validationErrorName = await findByText('Name must be at least 2 characters long');
    const validationErrorType = await findByText('Type must be at least 2 characters long'); // Adjust this text based on your actual validation message
    // const validationErrorType = await findByText('Type is required'); // Adjust this text based on your actual validation message
    const validationErrorGithubStars = await findByText('GitHub Stars are required'); // Adjust this text based on your actual validation message

    expect(validationErrorName).toBeInTheDocument();
    expect(validationErrorType).toBeInTheDocument();
    expect(validationErrorGithubStars).toBeInTheDocument();

  });

});
