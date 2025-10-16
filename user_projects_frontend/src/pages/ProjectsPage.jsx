import React from 'react';
import { useProjects } from '../services/projects';
import ProjectCard from '../components/ProjectCard';

/**
 * PUBLIC_INTERFACE
 * ProjectsPage fetches and renders a responsive grid of project cards.
 */
export default function ProjectsPage() {
  const { data, loading, error, refetch } = useProjects();

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 16
  };

  // Responsive columns via inline container query-ish approach
  const responsiveGridStyle = {
    ...gridStyle
  };

  // Skeleton items
  const SkeletonCard = () => (
    <div className="card" style={{ padding: 18 }}>
      <div className="skeleton" style={{ width: '50%', height: 16, marginBottom: 12 }} />
      <div className="skeleton" style={{ width: '85%', height: 12, marginBottom: 8 }} />
      <div className="skeleton" style={{ width: '70%', height: 12, marginBottom: 16 }} />
      <div className="skeleton" style={{ width: '30%', height: 10 }} />
    </div>
  );

  React.useEffect(() => {
    const onResize = () => {
      const root = document.getElementById('projects-grid');
      if (!root) return;
      const w = root.clientWidth;
      if (w >= 980) {
        root.style.gridTemplateColumns = 'repeat(3, 1fr)';
      } else if (w >= 680) {
        root.style.gridTemplateColumns = 'repeat(2, 1fr)';
      } else {
        root.style.gridTemplateColumns = '1fr';
      }
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  if (error) {
    return (
      <section style={{ padding: '24px 0' }}>
        <div className="card" role="alert" style={{ padding: 24 }}>
          <h2 style={{ margin: '0 0 8px 0' }}>Something went wrong</h2>
          <p style={{ margin: 0, color: 'var(--color-secondary)' }}>{String(error)}</p>
          <button
            type="button"
            onClick={refetch}
            style={{
              marginTop: 16,
              background: 'var(--color-primary)',
              color: 'white',
              border: 0,
              padding: '10px 14px',
              borderRadius: 10,
              cursor: 'pointer'
            }}
          >
            Try again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding: '24px 0 48px' }}>
      <div style={{ marginBottom: 16, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 22 }}>Your Projects</h2>
          <p style={{ margin: '6px 0 0 0', color: 'var(--color-secondary)' }}>
            Manage and keep track of your work in one place.
          </p>
        </div>
        <button
          type="button"
          aria-label="Create project (disabled placeholder)"
          disabled
          style={{
            background: 'linear-gradient(135deg, var(--color-primary), #60a5fa)',
            color: 'white',
            opacity: 0.7,
            border: 0,
            padding: '10px 14px',
            borderRadius: 12,
            cursor: 'not-allowed',
            boxShadow: '0 10px 24px rgba(59,130,246,0.35)'
          }}
        >
          + New Project
        </button>
      </div>

      <div id="projects-grid" style={responsiveGridStyle} aria-live="polite">
        {loading && (
          <>
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </>
        )}

        {!loading && data.length === 0 && (
          <div className="card" style={{ padding: 24, textAlign: 'center' }}>
            <div className="skeleton" style={{ width: 64, height: 64, margin: '0 auto 12px', borderRadius: 12 }} />
            <h3 style={{ marginTop: 0 }}>No projects yet</h3>
            <p style={{ marginTop: 8, color: 'var(--color-secondary)' }}>
              Get started by creating your first project.
            </p>
            <button
              type="button"
              disabled
              aria-disabled="true"
              style={{
                marginTop: 8,
                background: 'var(--color-primary)',
                color: 'white',
                border: 0,
                padding: '10px 14px',
                borderRadius: 10,
                cursor: 'not-allowed',
                opacity: 0.7
              }}
            >
              Create Project
            </button>
          </div>
        )}

        {!loading && data.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}
