// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import Header from './components/common/Header.jsx';
import Home from './pages/Home.jsx';
import Events from './pages/Events.jsx';
import Login from './components/auth/Login.jsx';
import Register from './components/auth/Register.jsx';
import AttendeeDashboard from './components/attendee/AttendeeDashboard.jsx';
import OrganizerDashboard from './components/organizer/OrganizerDashboard.jsx';
import { ToastContainer } from './components/common/Toast.jsx';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-slate-50 flex flex-col">
          <Header />
          <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<AttendeeDashboard />} />
              <Route path="/organizer-dashboard" element={<OrganizerDashboard />} />
            </Routes>
          </main>
          <ToastContainer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;