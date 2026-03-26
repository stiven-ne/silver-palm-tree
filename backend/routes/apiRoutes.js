const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const dataCtrl = require('../controllers/dataController');

router.get('/dashboard', protect, dataCtrl.getDashboardData);
router.get('/transactions', protect, dataCtrl.getAllTransactions);
router.get('/budgets', protect, dataCtrl.getBudgets);
router.get('/reminders', protect, dataCtrl.getReminders);
router.get('/admin/users', protect, dataCtrl.getUsersAdmin);

module.exports = router;