const db = require('../config/db');

exports.addTransaction = async (req, res) => {
  const { type, amount, category, description } = req.body;
  const userId = req.user.id; // Preso dal JWT

  try {
    await db.execute(
      'INSERT INTO transactions (user_id, type, amount, category, description) VALUES (?, ?, ?, ?, ?)',
      [userId, type, amount, category, description]
    );
    res.status(201).json({ message: "Transazione registrata" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC', [req.user.id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};