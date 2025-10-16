import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders the main heading "Your Projects"', async () => {
    render(<App />);
    // The ProjectsPage renders "Your Projects" heading
    const heading = await screen.findByRole('heading', { name: /your projects/i });
    expect(heading).toBeInTheDocument();
  });
});
