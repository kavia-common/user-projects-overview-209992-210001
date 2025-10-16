import React from 'react';
import './App.css';
import './index.css';
import Navbar from './components/Navbar';
import ProjectsPage from './pages/ProjectsPage';
import { AuthProvider } from './context/AuthContext';

/**
 * PUBLIC_INTERFACE
 * App is the root component rendering the Ocean Professional themed UI
 * with a top navbar and the projects listing page.
 */
function App() {
  return (
    <AuthProvider>
      <div className="App" style={{ minHeight: '100vh' }}>
        <Navbar />
        <main className="container" aria-label="Projects">
          <ProjectsPage />
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
