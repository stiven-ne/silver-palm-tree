const express = require('express');
const router = express.Router();
const { register, login, refresh } = require('../controllers/authController');
const User = require('../models/User');
const { protect, authorizeAdmin } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refresh);

// Endpoint API REST per acquisire permessi (richiesto)
router.get('/me/permissions', protect, async (req, res) => {
  const user = await User.findById(req.user.id).select('permissions role');
  res.json(user);
});

// CRUD Permessi (Solo Admin)
router.put('/admin/update-permissions/:id', protect, authorizeAdmin, async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, { permissions: req.body.permissions }, { new: true });
  res.json(updatedUser);
});

module.exports = router;