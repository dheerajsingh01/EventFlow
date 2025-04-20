// src/components/attendee/EventList.jsx
import { useState } from 'react';
import EventCard from '../common/EventCard';
import LoadingSpinner from '../common/ LoadingSpinner.jsx';

const EventList = ({ events, userId }) => {
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    if (events) {
      let filtered = events;
      
      // Apply search filter
      if (searchTerm) {
        filtered = filtered.filter(event => 
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.location.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      // Apply time filter
      if (activeFilter === 'upcoming') {
        filtered = filtered.filter(event => new Date(event.date) > new Date());
      } else if (activeFilter === 'past') {
        filtered = filtered.filter(event => new Date(event.date) <= new Date());
      }
      
      setFilteredEvents(filtered);
      setLoading(false);
    }
  }, [events, searchTerm, activeFilter]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search events..."
            className="w-full pl-4 pr-10 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute right-3 top-2.5 text-slate-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 text-xs sm:text-sm rounded-md ${activeFilter === 'all' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            All
          </button>
          <button
            onClick={() => setActiveFilter('upcoming')}
            className={`px-3 py-1.5 text-xs sm:text-sm rounded-md ${activeFilter === 'upcoming' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveFilter('past')}
            className={`px-3 py-1.5 text-xs sm:text-sm rounded-md ${activeFilter === 'past' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            Past
          </button>
        </div>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="text-center py-8 text-slate-500">
          {searchTerm ? 'No events match your search' : 'No events available'}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              userId={userId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventList;