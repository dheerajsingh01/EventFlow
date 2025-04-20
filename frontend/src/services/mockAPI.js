// src/services/mockAPI.js
let events = JSON.parse(localStorage.getItem('eventflow_events')) || [];
let users = JSON.parse(localStorage.getItem('eventflow_users')) || [
  { id: 1, email: 'attendee@test.com', password: 'password', role: 'attendee' },
  { id: 2, email: 'organizer@test.com', password: 'password', role: 'organizer' }
];

const saveData = () => {
  localStorage.setItem('eventflow_events', JSON.stringify(events));
  localStorage.setItem('eventflow_users', JSON.stringify(users));
};

// Simulate API delay
const delay = () => new Promise(resolve => setTimeout(resolve, 500));

export const mockLogin = async (email, password, role) => {
  await delay();
  const user = users.find(u => u.email === email && u.password === password && u.role === role);
  if (!user) throw new Error('Invalid credentials or role');
  return { id: user.id, email: user.email, role: user.role };
};

export const mockRegister = async (email, password, role) => {
  await delay();
  if (users.some(u => u.email === email)) {
    throw new Error('Email already registered');
  }
  const newUser = { id: users.length + 1, email, password, role };
  users.push(newUser);
  saveData();
  return { id: newUser.id, email: newUser.email, role: newUser.role };
};

export const getEvents = async () => {
  await delay();
  return [...events];
};

export const getEventById = async (id) => {
  await delay();
  const event = events.find(e => e.id === id);
  if (!event) throw new Error('Event not found');
  return { ...event };
};

export const createEvent = async (eventData, organizerId) => {
  await delay();
  const newEvent = {
    id: events.length + 1,
    ...eventData,
    organizerId,
    attendees: [],
    createdAt: new Date().toISOString()
  };
  events.push(newEvent);
  saveData();
  return newEvent;
};

export const updateEvent = async (id, eventData) => {
  await delay();
  const index = events.findIndex(e => e.id === id);
  if (index === -1) throw new Error('Event not found');
  events[index] = { ...events[index], ...eventData };
  saveData();
  return events[index];
};

export const deleteEvent = async (id) => {
  await delay();
  events = events.filter(e => e.id !== id);
  saveData();
};

export const registerForEvent = async (eventId, userId) => {
  await delay();
  const event = events.find(e => e.id === eventId);
  if (!event) throw new Error('Event not found');
  if (event.attendees.includes(userId)) throw new Error('Already registered');
  if (event.attendees.length >= event.maxAttendees) throw new Error('Event is full');
  event.attendees.push(userId);
  saveData();
  return event;
};

export const unregisterFromEvent = async (eventId, userId) => {
  await delay();
  const event = events.find(e => e.id === eventId);
  if (!event) throw new Error('Event not found');
  event.attendees = event.attendees.filter(id => id !== userId);
  saveData();
  return event;
};

export const getMyEvents = async (userId) => {
  await delay();
  return events.filter(e => e.attendees.includes(userId));
};

export const getOrganizerEvents = async (organizerId) => {
  await delay();
  return events.filter(e => e.organizerId === organizerId);
};