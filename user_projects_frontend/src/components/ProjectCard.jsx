import React from 'react';

/**
 * PUBLIC_INTERFACE
 * ProjectCard renders a single project with name, description, updated time, and status badge.
 */
export default function ProjectCard({ project }) {
  const { name, description, updatedAt, status } = project;

  const badgeClass = (() => {
    const s = (status || '').toLowerCase();
    if (s === 'active') return 'badge badge--active';
    if (s === 'paused') return 'badge badge--paused';
    return 'badge badge--archived';
  })();

  return (
    <article
      className="card"
      role="article"
      tabIndex={0}
      aria-label={`Project ${name}`}
      style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 12 }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          // Placeholder for open action
        }
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <h3 style={{ margin: 0, fontSize: 16, lineHeight: 1.4 }}>{name}</h3>
        <span className={badgeClass} aria-label={`Status ${status}`}>
          <span style={{ width: 8, height: 8, borderRadius: 999, background: 'currentColor', display: 'inline-block' }} />
          {status}
        </span>
      </div>
      <p style={{ margin: 0, color: 'var(--color-secondary)', fontSize: 14 }}>
        {description}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
        <time dateTime={new Date(updatedAt).toISOString()} style={{ fontSize: 12, color: '#6b7280' }}>
          Updated {new Date(updatedAt).toLocaleDateString()}
        </time>
        <button
          type="button"
          className="card__btn"
          aria-label={`Open ${name}`}
          style={{
            background: 'var(--color-primary)',
            color: 'white',
            border: 0,
            padding: '8px 12px',
            borderRadius: 10,
            boxShadow: '0 8px 16px rgba(59,130,246,0.25)',
            cursor: 'pointer',
            transition: 'transform .15s ease, box-shadow .15s ease'
          }}
          onMouseDown={(e) => e.currentTarget.style.transform = 'translateY(0) scale(0.98)'}
          onMouseUp={(e) => e.currentTarget.style.transform = ''}
          onMouseLeave={(e) => e.currentTarget.style.transform = ''}
          onClick={() => {}}
        >
          Open
        </button>
      </div>
    </article>
  );
}
