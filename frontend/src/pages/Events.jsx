// src/pages/Events.jsx
import { useState, useEffect } from 'react';
import { getEvents } from '../services/mockAPI.js';
import EventCard from '../components/common/EventCard.jsx';
import LoadingSpinner from '../components/common/ LoadingSpinner.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const allEvents = await getEvents();
        setEvents(allEvents);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event => {
    if (filter === 'upcoming') {
      return new Date(event.date) > new Date();
    } else if (filter === 'past') {
      return new Date(event.date) <= new Date();
    }
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-800">All Events</h1>
        <div className="flex space-x-2">
          {['all', 'upcoming', 'past'].map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
                filter === type
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="large" />
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-500 text-lg">No events found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map(event => (
            <div key={event.id} className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                {event.title}
              </h3>
              <p className="text-slate-600 mb-2">
                📍 {event.location} | 📅 {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="text-slate-500 text-sm mb-4">{event.description}</p>

              <button
                onClick={() =>
                  user
                    ? navigate(`/events/${event.id}/register`)
                    : navigate('/login')
                }
                className="mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
              >
                {user ? 'Register' : 'Login to Register'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
