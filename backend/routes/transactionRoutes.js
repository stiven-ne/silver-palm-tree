const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
  addTransaction, 
  getTransactions, 
  updateTransaction, 
  deleteTransaction 
} = require('../controllers/transactionController');

// Tutte le rotte delle transazioni richiedono il login (protect)
router.use(protect);

router.post('/', addTransaction);
router.get('/', getTransactions);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);

module.exports = router;