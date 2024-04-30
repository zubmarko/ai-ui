// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';
import AuthGuard from './components/AuthGuard';
import StickyHeader from './components/StickyHeader';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/sign-in" element={<LoginForm />} />
          <Route path="/dashboard" element={
            <AuthGuard>
              <>
              <StickyHeader />
              <Dashboard />
              </>
            </AuthGuard>
          } />
          {/* Additional routes here */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
