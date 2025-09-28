import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
import LoginForm from './components/auth/LoginForm';
import PatientDashboard from './pages/PatientDashboard';
import FamilyDashboard from './pages/FamilyDashboard';
import HealthcareDashboard from './pages/HealthcareDashboard';
import EmergencyCenter from './pages/EmergencyCenter';
import HealthMonitoring from './pages/HealthMonitoring';
import NotFound from './pages/NotFound';
import Navigation from './components/Navigation';

interface User {
  email: string;
  role: 'patient' | 'family' | 'doctor';
  name: string;
}

// ✅ Wrapper to handle conditional Navigation
function AppLayout() {
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);

  // Hide Navigation on /login
  const hideNav = location.pathname === '/login';

  return (
    <>
      {!hideNav && <Navigation />}
      <Routes>
        {/* Login */}
        <Route
          path="/login"
          element={
            <LoginForm
              onLogin={(loggedInUser) => {
                setUser(loggedInUser);
              }}
            />
          }
        />

        {/* Dashboards */}
        <Route path="/patient" element={<PatientDashboard />} />
        <Route path="/family" element={<FamilyDashboard />} />
        <Route path="/healthcare" element={<HealthcareDashboard />} />

        {/* Common pages */}
        <Route path="/emergency" element={<EmergencyCenter />} />
        <Route path="/monitoring" element={<HealthMonitoring />} />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
