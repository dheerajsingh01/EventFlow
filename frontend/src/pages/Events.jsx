// src/pages/Events.jsx
import { useState, useEffect } from 'react';
import { getEvents } from '../services/mockAPI.js';
import EventCard from '../components/common/EventCard.jsx';
import LoadingSpinner from '../components/common/ LoadingSpinner.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const { user } = useAuth();

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
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-800">All Events</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-md ${filter === 'all' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-3 py-1 rounded-md ${filter === 'upcoming' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'}`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setFilter('past')}
            className={`px-3 py-1 rounded-md ${filter === 'past' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'}`}
          >
            Past
          </button>
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
            <EventCard 
              key={event.id} 
              event={event} 
              userId={user?.id} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;