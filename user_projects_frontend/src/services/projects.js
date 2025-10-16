const sampleProjects = [
  {
    id: 'p-001',
    name: 'Marketing Website Refresh',
    description: 'Revamp the landing pages with improved SEO and accessibility.',
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 1,
    status: 'Active'
  },
  {
    id: 'p-002',
    name: 'Mobile App Prototype',
    description: 'Low-fidelity prototype for the onboarding flow.',
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
    status: 'Paused'
  },
  {
    id: 'p-003',
    name: 'Data Pipeline V2',
    description: 'Introduce event-driven architecture for ingestion.',
    updatedAt: Date.now() - 1000 * 60 * 60 * 5,
    status: 'Active'
  },
  {
    id: 'p-004',
    name: 'Design System',
    description: 'Build reusable components and tokens.',
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 12,
    status: 'Archived'
  },
  {
    id: 'p-005',
    name: 'Internal Dashboard',
    description: 'Metrics and reporting for stakeholders.',
    updatedAt: Date.now() - 1000 * 60 * 60 * 48,
    status: 'Active'
  },
  {
    id: 'p-006',
    name: 'API Gateway',
    description: 'Consolidate microservice endpoints.',
    updatedAt: Date.now() - 1000 * 60 * 60 * 72,
    status: 'Paused'
  }
];

// Simulate API call with optional error toggle via querystring (?error=1) for testing states.
export function fetchProjects() {
  const shouldError = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('error');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldError) return reject(new Error('Mock API error while fetching projects.'));
      resolve([...sampleProjects]);
    }, 900);
  });
}

/**
 * PUBLIC_INTERFACE
 * useProjects is a React hook to fetch projects with loading and error state.
 */
export function useProjects() {
  const React = require('react');
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchProjects();
      setData(res);
    } catch (e) {
      setError(e);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => { load(); }, [load]);

  return { data, loading, error, refetch: load };
}
