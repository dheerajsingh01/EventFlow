import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`fixed w-full z-50 transition-all ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 backdrop-blur-sm py-4'
      } ${mobileMenuOpen ? 'bg-white' : ''}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm sm:text-xl">EF</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-indigo-600">EventFlow</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-center flex-1 space-x-4">
            <Link
              to="/"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                isActive('/') ? 'text-indigo-600 bg-indigo-50' : 'text-slate-700 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              Home
            </Link>
            <Link
              to="/events"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                isActive('/events') ? 'text-indigo-600 bg-indigo-50' : 'text-slate-700 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              Events
            </Link>
            {user && (
              <Link
                to={user.role === 'organizer' ? '/organizer-dashboard' : '/dashboard'}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive('/dashboard') || isActive('/organizer-dashboard')
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-slate-700 hover:text-indigo-600 hover:bg-indigo-50'
                }`}
              >
                Dashboard
              </Link>
            )}
          </nav>

          {/* Right Section */}
          {user ? (
            <div className="hidden md:flex items-center ml-4 relative group">
              <button className="flex items-center space-x-2 focus:outline-none">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-indigo-600 font-medium text-sm">
                    {user.email.charAt(0).toUpperCase()}
                  </span>
                </div>
                <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 invisible group-hover:visible transition-all duration-200">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex space-x-2 ml-4">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors"
              >
                Sign up
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-slate-700 hover:text-indigo-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'max-h-96 py-4 opacity-100' : 'max-h-0 py-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="pt-4 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-100"
            >
              Home
            </Link>
            <Link
              to="/events"
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-100"
            >
              Events
            </Link>
            {user ? (
              <>
                <Link
                  to={user.role === 'organizer' ? '/organizer-dashboard' : '/dashboard'}
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-100"
                >
                  Dashboard
                </Link>
                <div className="border-t border-slate-200 mt-2 pt-2">
                  <div className="flex items-center px-3 py-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                      <span className="text-indigo-600 font-medium text-sm">
                        {user.email.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">{user.email}</p>
                      <p className="text-xs text-slate-500">
                        {user.role === 'organizer' ? 'Organizer' : 'Attendee'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-100 mt-1"
                  >
                    Sign out
                  </button>
                </div>
              </>
            ) : (
              <div className="pt-2 space-y-2">
                <Link
                  to="/login"
                  className="block w-full text-center px-3 py-2 rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="block w-full text-center px-3 py-2 rounded-md text-base font-medium bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
