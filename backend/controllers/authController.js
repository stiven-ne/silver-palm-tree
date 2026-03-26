const db = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];

    if (user && (await bcrypt.compare(password, user.password))) {
      // Token Accesso (10 minuti) con ID e Ruolo
      const accessToken = jwt.sign(
        { id: user.id, role: user.role }, 
        process.env.JWT_SECRET, 
        { expiresIn: '10m' }
      );

      // Refresh Token (7 giorni)
      const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_SECRET, { expiresIn: '7d' });

      // Salviamo il Refresh Token nel DB per sicurezza
      await db.execute('UPDATE users SET refresh_token = ? WHERE id = ?', [refreshToken, user.id]);

      res.json({ accessToken, refreshToken, role: user.role });
    } else {
      res.status(401).json({ message: "Credenziali errate" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};