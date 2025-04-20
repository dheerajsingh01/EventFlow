// src/components/common/EventCard.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { eventsAPI } from '../../services/api.js';
import { useToast } from './Toast.jsx';
import LoadingSpinner from './ LoadingSpinner.jsx';

const EventCard = ({ event, onEventUpdated, onEventDeleted }) => {
  const { user, getToken } = useAuth();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false); // You'll need to track registration state

  const handleRegistration = async () => {
    setIsLoading(true);
    try {
      if (isRegistered) {
        await eventsAPI.unregisterFromEvent(event.id, getToken());
        showToast('Successfully unregistered from event', 'success');
        setIsRegistered(false);
      } else {
        await eventsAPI.registerForEvent(event.id, getToken());
        showToast('Successfully registered for event', 'success');
        setIsRegistered(true);
      }
      onEventUpdated?.();
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await eventsAPI.deleteEvent(event.id, getToken());
      showToast('Event deleted successfully', 'success');
      onEventDeleted?.(event.id);
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-slate-100 hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-slate-800">{event.title}</h3>
            <p className="text-sm text-slate-500 mt-1">
              {new Date(event.date).toLocaleDateString()} • {event.time}
            </p>
          </div>
          {user?.role !== 'organizer' && (
            <button
              onClick={handleRegistration}
              disabled={isLoading}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                isRegistered
                  ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              } transition-colors disabled:opacity-50`}
            >
              {isLoading ? (
                <LoadingSpinner size="small" />
              ) : isRegistered ? (
                'Registered'
              ) : (
                'Register'
              )}
            </button>
          )}
        </div>
        
        <p className="mt-3 text-slate-600 text-sm">{event.description}</p>
        
        <div className="mt-4 flex items-center justify-between text-sm">
          <div className="flex items-center text-slate-500">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{event.location}</span>
          </div>
          <div className="text-slate-500">
            {event.attendees?.length || 0} attendees
          </div>
        </div>
        
        {user?.role === 'organizer' && user.id === event.userId && (
          <div className="mt-4 pt-4 border-t border-slate-100 flex justify-end space-x-2">
            <Link
              to={`/organizer-dashboard/edit/${event.id}`}
              className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-md text-sm font-medium text-slate-700 transition-colors"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="px-3 py-1 bg-red-100 hover:bg-red-200 rounded-md text-sm font-medium text-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;