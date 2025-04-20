const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const requireOrganizer = require('../middleware/requireOrganizer');
const eventController = require('../controllers/event.controller');

router.post('/', authMiddleware, requireOrganizer, eventController.createEvent);
router.put('/:id', authMiddleware, requireOrganizer, eventController.updateEvent);
router.delete('/:id', authMiddleware, requireOrganizer, eventController.deleteEvent);
router.get('/', authMiddleware, eventController.getAllEvents);
router.get('/:id', authMiddleware, eventController.getEventById);
router.post('/:id/register', authMiddleware, eventController.registerForEvent);
router.post('/:id/unregister', authMiddleware, eventController.unregisterFromEvent);
router.post('/:id/confirm', authMiddleware, eventController.confirmAttendance);
router.post('/feedback', authMiddleware, eventController.submitFeedback);
router.get('/:id/registrations', authMiddleware, requireOrganizer, eventController.getEventRegistrations);

module.exports = router;