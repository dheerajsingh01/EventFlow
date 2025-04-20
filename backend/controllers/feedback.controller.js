const Feedback = require('../models/feedback.model');
const Event = require('../models/event.model');

const submitFeedback = async (req, res) => {
  try {
    const { eventId, rating } = req.body;
    const userId = req.user.id;
    if (!eventId || !rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Event ID and valid rating (1-5) required' });
    }
    const event = await Event.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    const feedback = await Feedback.create({ userId, eventId, rating });
    return res.status(201).json(feedback);
  } catch (error) {
    console.error('Submit Feedback Error:', error);
    return res.status(500).json({ message: 'Server error submitting feedback' });
  }
};

module.exports = { submitFeedback };