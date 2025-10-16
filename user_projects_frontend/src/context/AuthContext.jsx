import React, { createContext, useContext } from 'react';

const AuthContext = createContext(null);

/**
 * PUBLIC_INTERFACE
 * AuthProvider supplies a mock authenticated user for the app.
 */
export function AuthProvider({ children }) {
  const user = {
    id: 'user-123',
    name: 'Avery Stone',
    email: 'avery.stone@example.com'
  };

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * PUBLIC_INTERFACE
 * useAuth returns the mock authenticated user context.
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  return ctx;
}
