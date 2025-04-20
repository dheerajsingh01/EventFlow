const Event = require('../models/event.model');
const User = require('../models/user.model');
const Registration = require('../models/registration.model');
const Feedback = require('../models/feedback.model');

const calculateEngagementScore = async (eventId) => {
  try {
    const registrationCount = await Registration.count({ where: { eventId } });
    const registrationScore = registrationCount > 10 ? 2 : registrationCount >= 5 ? 1 : 0;

    const confirmedCount = await Registration.count({ where: { eventId, confirmed: true } });
    const confirmationRate = registrationCount > 0 ? confirmedCount / registrationCount : 0;
    const confirmationScore = confirmationRate > 0.75 ? 2 : confirmationRate >= 0.5 ? 1 : 0;

    const responsivenessScore = Math.random() >= 0.2 ? 1 : 0;

    const feedback = await Feedback.findAll({ where: { eventId } });
    const feedbackCount = feedback.length;
    const avgRating = feedbackCount > 0 ? feedback.reduce((sum, f) => sum + f.rating, 0) / feedbackCount : 0;
    const feedbackScore = feedbackCount >= 5 && avgRating >= 4 ? 1 : 0;

    const totalScore = registrationScore + confirmationScore + responsivenessScore + feedbackScore;
    return totalScore;
  } catch (error) {
    console.error('Calculate Engagement Score Error:', error);
    return 0;
  }
};

const createEvent = async (req, res) => {
  try {
    if (req.user.role !== 'organizer') {
      return res.status(403).json({ message: 'Only organizers can create events' });
    }
    const { title, description, date } = req.body;
    if (!title || !description || !date) {
      return res.status(400).json({ message: 'Title, description, and date are required' });
    }
    const event = await Event.create({
      title,
      description,
      date,
      userId: req.user.id,
      engagementScore: 0
    });
    return res.status(201).json(event);
  } catch (error) {
    console.error('Create Event Error:', error);
    return res.status(500).json({ message: 'Server error creating event' });
  }
};

const updateEvent = async (req, res) => {
  try {
    if (req.user.role !== 'organizer') {
      return res.status(403).json({ message: 'Only organizers can update events' });
    }
    const { id } = req.params;
    const { title, description, date } = req.body;
    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    if (event.userId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this event' });
    }
    await event.update({ title, description, date });
    const engagementScore = await calculateEngagementScore(id);
    await event.update({ engagementScore });
    return res.json(event);
  } catch (error) {
    console.error('Update Event Error:', error);
    return res.status(500).json({ message: 'Server error updating event' });
  }
};

const deleteEvent = async (req, res) => {
  try {
    if (req.user.role !== 'organizer') {
      return res.status(403).json({ message: 'Only organizers can delete events' });
    }
    const { id } = req.params;
    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    if (event.userId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this event' });
    }
    await event.destroy();
    return res.json({ message: 'Event deleted' });
  } catch (error) {
    console.error('Delete Event Error:', error);
    return res.status(500).json({ message: 'Server error deleting event' });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const where = req.user?.role === 'organizer' ? { userId: req.user.id } : {};
    const events = await Event.findAll({
      where,
      include: [{ model: User, attributes: ['full_name'], as: 'organizer' }] // Changed alias to 'organizer'
    });
    for (let event of events) {
      const engagementScore = await calculateEngagementScore(event.id);
      await event.update({ engagementScore });
    }
    return res.json(events);
  } catch (error) {
    console.error('Get All Events Error:', error);
    return res.status(500).json({ message: 'Server error fetching events' });
  }
};

const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByPk(id, {
      include: [{ model: User, attributes: ['full_name'], as: 'organizer' }] // Changed alias to 'organizer'
    });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    const engagementScore = await calculateEngagementScore(id);
    await event.update({ engagementScore });
    return res.json(event);
  } catch (error) {
    console.error('Get Event By ID Error:', error);
    return res.status(500).json({ message: 'Server error fetching event' });
  }
};

module.exports = {
  createEvent,
  updateEvent,
  deleteEvent,
  getAllEvents,
  getEventById
};