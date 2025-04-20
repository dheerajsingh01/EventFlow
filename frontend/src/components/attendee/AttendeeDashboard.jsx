// src/components/attendee/AttendeeDashboard.jsx
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import EventList from './EventList.jsx';
import MyEvents from './MyEvents.jsx';
import { eventsAPI } from '../../services/api.js';
import LoadingSpinner from '../common/ LoadingSpinner.jsx';
import { useToast } from '../common/Toast.jsx';

const AttendeeDashboard = () => {
  const { user, getToken } = useAuth();
  const [events, setEvents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const allEvents = await eventsAPI.getAllEvents(getToken());
        setEvents(allEvents);
        
        // Filter events where user is registered
        // Note: You'll need to implement proper registration tracking
        const registeredEvents = allEvents.filter(event => 
          event.attendees?.some(attendee => attendee.id === user.id)
        );
        setMyEvents(registeredEvents);
      } catch (error) {
        showToast('Failed to load events', 'error');
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchData();
  }, [user, getToken, showToast]);

  const handleEventUpdated = () => {
    // Refresh events after update
    fetchData();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Welcome back, {user.full_name}!</h2>
        <p className="text-slate-600">
          Browse upcoming events and manage your registrations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Upcoming Events</h3>
          <EventList 
            events={events} 
            onEventUpdated={handleEventUpdated}
          />
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">My Registered Events</h3>
          <MyEvents 
            events={myEvents} 
            onEventUpdated={handleEventUpdated}
          />
        </div>
      </div>
    </div>
  );
};

export default AttendeeDashboard;