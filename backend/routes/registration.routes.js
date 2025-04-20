const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const regController = require('../controllers/registration.controller');

router.post('/:id/register', auth, regController.register);
router.post('/:id/unregister', auth, regController.unregister);

module.exports = router;
