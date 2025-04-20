const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const feedbackController = require('../controllers/feedback.controller');

router.post('/', auth, feedbackController.submitFeedback);

module.exports = router;