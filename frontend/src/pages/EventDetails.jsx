// src/pages/EventDetails.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getEventById, registerForEvent, unregisterFromEvent } from '../services/mockAPI.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../components/common/Toast.jsx';
import LoadingSpinner from '../components/common/ LoadingSpinner.jsx';
import { motion } from 'framer-motion';

const EventDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const eventData = await getEventById(id);
        setEvent(eventData);
        // In a real app, we'd fetch attendee details
        setAttendees(Array(eventData.attendees.length).fill({ 
          name: 'Attendee', 
          avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}` 
        }))
      } catch (error) {
        showToast('Event not found', 'error');
        navigate('/events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, navigate, showToast]);

  const handleRegistration = async () => {
    if (!user) {
      showToast('Please login to register', 'error');
      navigate('/login');
      return;
    }

    setIsRegistering(true);
    try {
      if (event.attendees.includes(user.id)) {
        await unregisterFromEvent(event.id, user.id);
        setEvent(prev => ({
          ...prev,
          attendees: prev.attendees.filter(id => id !== user.id)
        }));
        showToast('Successfully unregistered', 'success');
      } else {
        await registerForEvent(event.id, user.id);
        setEvent(prev => ({
          ...prev,
          attendees: [...prev.attendees, user.id]
        }));
        showToast('Successfully registered', 'success');
      }
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setIsRegistering(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto py-4 sm:py-8 px-4"
    >
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 sm:p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">{event.title}</h1>
              <div className="flex flex-col sm:flex-row sm:items-center text-slate-500 gap-1 sm:gap-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>
                    {new Date(event.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{event.time}</span>
                </div>
              </div>
            </div>
            {user?.role !== 'organizer' && (
              <button
                onClick={handleRegistration}
                disabled={isRegistering}
                className={`px-4 py-2 sm:py-2.5 rounded-md font-medium ${
                  event.attendees.includes(user?.id)
                    ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                } transition-colors disabled:opacity-50 w-full sm:w-auto`}
              >
                {isRegistering ? (
                  <LoadingSpinner size="small" />
                ) : event.attendees.includes(user?.id) ? (
                  'Registered'
                ) : (
                  'Register Now'
                )}
              </button>
            )}
          </div>

          <div className="flex items-center text-slate-600 mb-6">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{event.location}</span>
          </div>

          <div className="prose max-w-none text-slate-700 mb-8">
            <p className="whitespace-pre-line">{event.description}</p>
          </div>

          <div className="border-t border-slate-200 pt-6">
            <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-4">
              Attendees ({event.attendees.length}/{event.maxAttendees})
            </h3>
            {event.attendees.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {attendees.map((attendee, index) => (
                  <div key={index} className="flex items-center space-x-2 bg-slate-50 rounded-full px-3 py-1">
                    <img 
                      src={attendee.avatar} 
                      alt={attendee.name} 
                      className="w-6 h-6 rounded-full" 
                    />
                    <span className="text-sm text-slate-700">{attendee.name} {index + 1}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500">No attendees yet. Be the first to register!</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventDetails;