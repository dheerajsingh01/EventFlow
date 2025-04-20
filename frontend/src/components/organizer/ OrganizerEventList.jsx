// src/components/organizer/OrganizerEventList.jsx
import { useState } from 'react';
import EventCard from '../common/EventCard.jsx';
import { deleteEvent } from '../../services/mockAPI.js';
import { useToast } from '../common/Toast.jsx';
// import LoadingSpinner from '../common/LoadingSpinner';

const OrganizerEventList = ({ events, onEventDeleted }) => {
  const [deletingId, setDeletingId] = useState(null);
  const { showToast } = useToast();

  const handleDelete = async (eventId) => {
    try {
      setDeletingId(eventId);
      await deleteEvent(eventId);
      onEventDeleted(eventId);
    } catch (error) {
      showToast('Failed to delete event', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      {events.length === 0 ? (
        <div className="text-center py-8 text-slate-500">
          You haven't created any events yet
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onDelete={handleDelete}
              isDeleting={deletingId === event.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrganizerEventList;