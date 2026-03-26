const Reminder = require('../models/Reminder');

exports.addReminder = async (req, res) => {
  try {
    const { title, amount, dueDate } = req.body;
    const reminder = new Reminder({ user: req.user.id, title, amount, dueDate });
    await reminder.save();
    res.status(201).json(reminder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find({ user: req.user.id }).sort({ dueDate: 1 });
    res.json(reminders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};