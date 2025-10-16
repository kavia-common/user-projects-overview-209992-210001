import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectsPage from '../ProjectsPage';
import { AuthProvider } from '../../context/AuthContext';

// Mock the services module for controlled scenarios
jest.mock('../../services/projects', () => {
  const actual = jest.requireActual('../../services/projects');
  return {
    ...actual,
    fetchProjects: jest.fn(),
    useProjects: jest.fn(), // We will mock the hook behavior to control states precisely
  };
});

const { fetchProjects, useProjects } = require('../../services/projects');

function renderWithProviders(ui) {
  return render(<AuthProvider>{ui}</AuthProvider>);
}

describe('ProjectsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('shows loading skeletons initially', () => {
    // Simulate loading state from useProjects
    useProjects.mockReturnValue({
      data: [],
      loading: true,
      error: null,
      refetch: jest.fn(),
    });

    renderWithProviders(<ProjectsPage />);

    // Expect multiple skeletons rendered
    const grid = screen.getByRole('region', { hidden: true, name: '' }) || document.getElementById('projects-grid');
    // Query by skeleton class inside the container
    const skeletons = document.querySelectorAll('.skeleton');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  test('renders empty state when there is no data after loading', () => {
    useProjects.mockReturnValue({
      data: [],
      loading: false,
      error: null,
      refetch: jest.fn(),
    });

    renderWithProviders(<ProjectsPage />);

    expect(screen.getByRole('heading', { name: /no projects yet/i })).toBeInTheDocument();
    expect(screen.getByText(/get started by creating your first project/i)).toBeInTheDocument();
  });

  test('renders success state with cards when data exists', () => {
    const projects = [
      {
        id: 'p-1',
        name: 'Alpha',
        description: 'First project',
        updatedAt: Date.now(),
        status: 'Active',
      },
      {
        id: 'p-2',
        name: 'Beta',
        description: 'Second project',
        updatedAt: Date.now(),
        status: 'Paused',
      },
    ];

    useProjects.mockReturnValue({
      data: projects,
      loading: false,
      error: null,
      refetch: jest.fn(),
    });

    renderWithProviders(<ProjectsPage />);

    // Headline present
    expect(screen.getByRole('heading', { name: /your projects/i })).toBeInTheDocument();

    // Cards rendered with headings for each name
    expect(screen.getByRole('heading', { name: /alpha/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /beta/i })).toBeInTheDocument();

    // Status badges visible
    expect(screen.getByLabelText(/status active/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status paused/i)).toBeInTheDocument();
  });

  test('renders error state and retry triggers refetch that leads to success', async () => {
    const user = userEvent.setup();

    // We simulate the hook changing behavior across retry.
    // First call: error shown with a refetch function we capture
    let refetchHandler;
    useProjects.mockImplementation(() => {
      return {
        data: [],
        loading: false,
        error: new Error('Mock API error while fetching projects.'),
        refetch: jest.fn().mockImplementation(() => {
          // After refetch is triggered, update the mock to return success
          useProjects.mockReturnValue({
            data: [
              {
                id: 'p-10',
                name: 'Recovered Project',
                description: 'Appears after retry',
                updatedAt: Date.now(),
                status: 'Active',
              },
            ],
            loading: false,
            error: null,
            refetch: jest.fn(),
          });
        }),
      };
    });

    renderWithProviders(<ProjectsPage />);

    // Error UI visible
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/mock api error/i)).toBeInTheDocument();

    // Click Try again
    await user.click(screen.getByRole('button', { name: /try again/i }));

    // Re-render to reflect updated hook return (since our mock modifies its return)
    // In real usage, the state update would cause a render, but in this controlled
    // environment we can call render again with same component to simulate
    renderWithProviders(<ProjectsPage />);

    // Now success content should be present
    expect(await screen.findByRole('heading', { name: /recovered project/i })).toBeInTheDocument();
  });
});
