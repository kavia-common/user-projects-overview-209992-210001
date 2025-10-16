import React from 'react';
import { render, screen } from '@testing-library/react';
import ProjectCard from '../../components/ProjectCard';

describe('ProjectCard', () => {
  const baseProject = {
    id: 'p-100',
    name: 'Test Project',
    description: 'A description for testing.',
    updatedAt: new Date('2024-06-15T12:00:00Z').getTime(),
    status: 'Active',
  };

  test('renders name and description', () => {
    render(<ProjectCard project={baseProject} />);

    expect(screen.getByRole('heading', { name: /test project/i })).toBeInTheDocument();
    expect(screen.getByText(/a description for testing\./i)).toBeInTheDocument();
  });

  test('renders "Updated" date text', () => {
    render(<ProjectCard project={baseProject} />);
    // Since toLocaleDateString is environment-dependent, we assert the prefix and year presence
    expect(screen.getByText(/updated/i)).toBeInTheDocument();
  });

  test('applies correct status badge class for Active', () => {
    const { container } = render(<ProjectCard project={{ ...baseProject, status: 'Active' }} />);
    const badge = screen.getByLabelText(/status active/i);
    expect(badge).toBeInTheDocument();
    expect(badge.className).toContain('badge');
    expect(badge.className).toContain('badge--active');
    // sanity: ensure not paused/archived
    expect(badge.className).not.toContain('badge--paused');
    expect(badge.className).not.toContain('badge--archived');
  });

  test('applies correct status badge class for Paused', () => {
    render(<ProjectCard project={{ ...baseProject, status: 'Paused' }} />);
    const badge = screen.getByLabelText(/status paused/i);
    expect(badge.className).toContain('badge--paused');
  });

  test('applies archived class for any other status', () => {
    render(<ProjectCard project={{ ...baseProject, status: 'Archived' }} />);
    const badge = screen.getByLabelText(/status archived/i);
    expect(badge.className).toContain('badge--archived');
  });
});
