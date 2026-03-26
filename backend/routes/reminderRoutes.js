const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { addReminder, getReminders } = require('../controllers/reminderController');

router.post('/', protect, addReminder);
router.get('/', protect, getReminders);

module.exports = router;