const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { checkBudgetStatus } = require('../controllers/budgetController');

router.get('/status', protect, checkBudgetStatus);
// Aggiungi qui POST per creare budget e PUT per modificarlo

module.exports = router;