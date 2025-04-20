// src/components/attendee/MyEvents.jsx
import { useState, useEffect } from 'react';
import EventCard from '../common/EventCard.jsx';
import LoadingSpinner from '../common/ LoadingSpinner.jsx';
import { getMyEvents } from '../../services/mockAPI.js';

const MyEvents = ({ events: initialEvents }) => {
  const [events, setEvents] = useState(initialEvents || []);
  const [loading, setLoading] = useState(!initialEvents);
  const { user } = useAuth();

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        setLoading(true);
        const myEvents = await getMyEvents(user.id);
        setEvents(myEvents);
      } finally {
        setLoading(false);
      }
    };

    if (!initialEvents && user) {
      fetchMyEvents();
    }
  }, [user, initialEvents]);

  const handleUnregister = () => {
    // Trigger a refresh when an event is unregistered
    if (!initialEvents && user) {
      getMyEvents(user.id).then(setEvents);
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
    <div>
      {events.length === 0 ? (
        <div className="text-center py-8 text-slate-500">
          You haven't registered for any events yet
        </div>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              userId={user.id}
              onRegistrationChange={handleUnregister}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEvents;