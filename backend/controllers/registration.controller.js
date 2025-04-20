const Registration = require('../models/registration.model');
const Event = require('../models/event.model');
const User = require('../models/user.model');

const register = async (req, res) => {
  try {
    const { id } = req.params; // eventId
    const userId = req.user.id;
    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    const existing = await Registration.findOne({ where: { userId, eventId: id } });
    if (existing) {
      return res.status(400).json({ message: 'Already registered for this event' });
    }
    const registration = await Registration.create({ userId, eventId: id });
    return res.status(201).json(registration);
  } catch (error) {
    console.error('Register Error:', error);
    return res.status(500).json({ message: 'Server error registering for event' });
  }
};

const unregister = async (req, res) => {
  try {
    const { id } = req.params; // eventId
    const userId = req.user.id;
    const registration = await Registration.findOne({ where: { userId, eventId: id } });
    if (!registration) {
      return res.status(404).json({ message: 'Not registered for this event' });
    }
    await registration.destroy();
    return res.json({ message: 'Unregistered from event' });
  } catch (error) {
    console.error('Unregister Error:', error);
    return res.status(500).json({ message: 'Server error unregistering from event' });
  }
};

const getEventRegistrations = async (req, res) => {
  try {
    if (req.user.role !== 'organizer') {
      return res.status(403).json({ message: 'Only organizers can view registrations' });
    }
    const { id } = req.params; // eventId
    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    if (event.userId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to view registrations for this event' });
    }
    const registrations = await Registration.findAll({
      where: { eventId: id },
      include: [{ model: User, attributes: ['full_name', 'email'] }]
    });
    return res.json(registrations);
  } catch (error) {
    console.error('Get Registrations Error:', error);
    return res.status(500).json({ message: 'Server error fetching registrations' });
  }
};

const confirmAttendance = async (req, res) => {
  try {
    const { id } = req.params; // eventId
    const userId = req.user.id;
    const registration = await Registration.findOne({ where: { userId, eventId: id } });
    if (!registration) {
      return res.status(404).json({ message: 'Not registered for this event' });
    }
    if (registration.confirmed) {
      return res.status(400).json({ message: 'Attendance already confirmed' });
    }
    await registration.update({ confirmed: true });
    return res.json({ message: 'Attendance confirmed' });
  } catch (error) {
    console.error('Confirm Attendance Error:', error);
    return res.status(500).json({ message: 'Server error confirming attendance' });
  }
};

module.exports = { register, unregister, getEventRegistrations, confirmAttendance };