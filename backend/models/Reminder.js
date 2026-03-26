const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  amount: { type: Number },
  dueDate: { type: Date, required: true },
  isPaid: { type: Boolean, default: false }
});

module.exports = mongoose.model('Reminder', reminderSchema);