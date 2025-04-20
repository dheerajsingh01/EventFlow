const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/auth/register', authController.registerUser);
router.post('/auth/login', authController.loginUser);

module.exports = router;