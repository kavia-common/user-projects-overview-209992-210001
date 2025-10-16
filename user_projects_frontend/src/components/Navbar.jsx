import React from 'react';
import { useAuth } from '../context/AuthContext';

/**
 * PUBLIC_INTERFACE
 * Navbar shows the application title and the current user's avatar initials.
 */
export default function Navbar() {
  const { user } = useAuth();
  const initials = user?.name
    ? user.name.split(' ').map(p => p[0]).slice(0,2).join('').toUpperCase()
    : 'US';

  return (
    <header
      className="navbar-wrapper"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 20,
        background:
          'linear-gradient(90deg, rgba(59,130,246,0.08), rgba(249,250,251,1))',
        borderBottom: '1px solid rgba(17,24,39,0.06)',
        backdropFilter: 'saturate(180%) blur(6px)'
      }}
    >
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div aria-hidden="true" style={{
            width: 28, height: 28, borderRadius: 8,
            background: 'var(--color-primary)'
          }} />
          <h1 style={{
            margin: 0,
            fontSize: 18,
            letterSpacing: 0.2,
            color: 'var(--color-text)'
          }}>
            Projects Overview
          </h1>
        </div>

        <div
          aria-label="User menu"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') e.currentTarget.click(); }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '6px 10px',
            borderRadius: 999,
            background: 'var(--color-surface)',
            border: '1px solid rgba(17,24,39,0.06)',
            boxShadow: 'var(--shadow-sm)',
            cursor: 'default'
          }}
        >
          <span style={{ fontSize: 13, color: 'var(--color-secondary)' }}>
            {user?.name || 'User'}
          </span>
          <div aria-hidden="true" style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--color-primary), #60a5fa)',
            color: 'white',
            display: 'grid',
            placeItems: 'center',
            fontWeight: 700,
            fontSize: 12,
            boxShadow: '0 6px 18px rgba(59,130,246,0.35)'
          }}>
            {initials}
          </div>
        </div>
      </div>
    </header>
  );
}
