import { useAuth } from '../context/AuthContext.jsx';
import { Link } from 'react-router-dom';
import PricingSection from './PricingSection.jsx';
import TestimonialsSection from './TestimonialsSection.jsx';
import Footer from './Footer.jsx';
import image from '../assets/event.avif'

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header/Nav */}
      <header className="w-full py-4 px-6 bg-white shadow-sm flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-600">EventFlow</h1>
        <nav className="space-x-4">
          <Link to="/events" className="text-slate-700 hover:text-indigo-600">Events</Link>
          {!user ? (
            <>
              <Link to="/login" className="text-slate-700 hover:text-indigo-600">Login</Link>
              <Link to="/register" className="text-slate-700 hover:text-indigo-600">Register</Link>
            </>
          ) : (
            <Link
              to={user.role === 'organizer' ? '/organizer-dashboard' : '/dashboard'}
              className="text-slate-700 hover:text-indigo-600"
            >
              Dashboard
            </Link>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Text */}
        <div>
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            Welcome to <span className="text-indigo-600">EventFlow</span>
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            The easiest way to discover and manage events.
          </p>
          {!user ? (
            <div className="space-x-4">
              <Link
                to="/register"
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium transition-colors"
              >
                Get Started
              </Link>
              <Link
                to="/events"
                className="px-6 py-3 bg-white hover:bg-slate-100 rounded-lg text-indigo-600 font-medium border border-indigo-600 transition-colors"
              >
                Browse Events
              </Link>
            </div>
          ) : (
            <Link
              to={user.role === 'organizer' ? '/organizer-dashboard' : '/dashboard'}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium transition-colors"
            >
              Go to Dashboard
            </Link>
          )}
        </div>

        <div className="flex justify-center relative">
  <div className="relative w-full max-w-md rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4">
    <img
      src={image}
      alt="Event illustration"
      className="w-full h-auto object-cover rounded-lg"
    />
  </div>
</div>
      </section>

      {/* Features Section */}
      <section className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8 px-6 max-w-7xl mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Discover Events</h3>
          <p className="text-slate-600">
            Find exciting events happening near you or online. Filter by category, date, or location.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Easy Management</h3>
          <p className="text-slate-600">
            Organizers can easily create, update, and track attendance for their events.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Connect</h3>
          <p className="text-slate-600">
            Meet new people who share your interests and grow your community.
          </p>
        </div>
      </section>

      {/* Testimonial Section */}
      <TestimonialsSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Home;
