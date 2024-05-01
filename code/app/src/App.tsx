// App.tsx
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';
import AuthGuard from './components/AuthGuard';
import ProfilePage from './components/ProfilePage';
import StickyHeader from './components/StickyHeader';
import NotFoundPage from './components/NotFoundPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/sign-in" element={<LoginForm />} />
          <Route path="/profile" element={
             <AuthGuard>
             <>
             <StickyHeader />
             <ProfilePage />
             </>
           </AuthGuard>
          } />
          <Route path="/dashboard" element={
            <AuthGuard>
              <>
              <StickyHeader />
              <Dashboard />
              </>
            </AuthGuard>
          } />
          {/* Additional routes here */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
