import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import LoginForm from '@/components/auth/LoginForm';
import LunchReminder from '@/components/reminders/LunchReminder';
import SOSButton from '@/components/emergency/SOSButton';

// Updated Pages with Authentication
import PatientDashboard from '@/pages/PatientDashboard';
import HealthcareDashboard from '@/pages/HealthcareDashboard';
import FamilyDashboard from '@/pages/FamilyDashboard';
import EmergencyCenter from '@/pages/EmergencyCenter';
import HealthMonitoring from '@/pages/HealthMonitoring';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';

interface User {
  email: string;
  role: 'patient' | 'family' | 'doctor';
  name: string;
}

const AuthenticatedApp = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  // If not authenticated, show login
  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  // Role-based routing
  const getDefaultRoute = () => {
    switch (user.role) {
      case 'patient': return '/patient';
      case 'family': return '/family';
      case 'doctor': return '/healthcare';
      default: return '/';
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navigation />
        
        {/* Global Components */}
        {user.role === 'patient' && (
          <>
            <LunchReminder />
            <SOSButton variant="floating" patientName={user.name} />
          </>
        )}
        
        <Routes>
          {/* Default redirect based on role */}
          <Route path="/" element={<Navigate to={getDefaultRoute()} replace />} />
          
          {/* Patient Routes */}
          {user.role === 'patient' && (
            <>
              <Route path="/patient" element={<PatientDashboard />} />
              <Route path="/monitoring" element={<HealthMonitoring />} />
              <Route path="/emergency" element={<EmergencyCenter />} />
            </>
          )}
          
          {/* Family Routes */}
          {user.role === 'family' && (
            <>
              <Route path="/family" element={<FamilyDashboard />} />
              <Route path="/patient" element={<PatientDashboard />} />
              <Route path="/monitoring" element={<HealthMonitoring />} />
              <Route path="/emergency" element={<EmergencyCenter />} />
            </>
          )}
          
          {/* Doctor Routes */}
          {user.role === 'doctor' && (
            <>
              <Route path="/healthcare" element={<HealthcareDashboard />} />
              <Route path="/patient" element={<PatientDashboard />} />
              <Route path="/family" element={<FamilyDashboard />} />
              <Route path="/monitoring" element={<HealthMonitoring />} />
              <Route path="/emergency" element={<EmergencyCenter />} />
            </>
          )}
          
          {/* Common Routes */}
          <Route path="/home" element={<Index />} />
          
          {/* Catch all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AuthenticatedApp;