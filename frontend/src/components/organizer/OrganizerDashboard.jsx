// src/components/organizer/OrganizerDashboard.jsx
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import OrganizerEventList from './ OrganizerEventList.jsx';
import CreateEventForm from './CreateEventForm.jsx';
import { eventsAPI } from '../../services/api.js';
import LoadingSpinner from '../common/ LoadingSpinner.jsx';
import { useToast } from '../common/Toast.jsx';

const OrganizerDashboard = () => {
  const { user, getToken } = useAuth();
  const [events, setEvents] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const organizerEvents = await eventsAPI.getAllEvents(getToken());
        setEvents(organizerEvents);
      } catch (error) {
        showToast('Failed to load your events', 'error');
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchEvents();
  }, [user, getToken, showToast]);

  const handleEventCreated = async (newEvent) => {
    try {
      const createdEvent = await eventsAPI.createEvent(newEvent, getToken());
      setEvents([createdEvent, ...events]);
      setShowCreateForm(false);
      showToast('Event created successfully!', 'success');
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  const handleEventDeleted = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
    showToast('Event deleted successfully', 'success');
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Organizer Dashboard</h2>
            <p className="text-slate-600 mt-1">
              Manage your events and view attendee registrations
            </p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white transition-colors"
          >
            Create Event
          </button>
        </div>
      </div>

      {showCreateForm && (
        <CreateEventForm
          onCancel={() => setShowCreateForm(false)}
          onSuccess={handleEventCreated}
          organizerId={user.id}
        />
      )}

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-semibold text-slate-800 mb-4">Your Events</h3>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner size="large" />
          </div>
        ) : (
          <OrganizerEventList 
            events={events} 
            onEventDeleted={handleEventDeleted} 
          />
        )}
      </div>
    </div>
  );
};

export default OrganizerDashboard;