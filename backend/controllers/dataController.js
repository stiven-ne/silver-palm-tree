const db = require('../config/db');

// VISTA 1: DASHBOARD (Riepilogo Totale)
exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;
        const [transactions] = await db.execute(
            'SELECT type, SUM(amount) as total FROM transactions WHERE user_id = ? GROUP BY type', [userId]
        );
        const [reminders] = await db.execute(
            'SELECT * FROM reminders WHERE user_id = ? AND is_paid = FALSE ORDER BY due_date ASC LIMIT 5', [userId]
        );
        res.json({ stats: transactions, recentReminders: reminders });
    } catch (err) { res.status(500).json(err); }
};

// VISTA 2: TRANSAZIONI (Lista Completa)
exports.getAllTransactions = async (req, res) => {
    const [rows] = await db.execute('SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC', [req.user.id]);
    res.json(rows);
};

// VISTA 3: BUDGET (Controllo Spese)
exports.getBudgets = async (req, res) => {
    const [rows] = await db.execute('SELECT * FROM budgets WHERE user_id = ?', [req.user.id]);
    res.json(rows);
};

// VISTA 4: PROMEMORIA (Calendario)
exports.getReminders = async (req, res) => {
    const [rows] = await db.execute('SELECT * FROM reminders WHERE user_id = ?', [req.user.id]);
    res.json(rows);
};

// VISTA 5: ADMIN / PROFILO (Gestione Utenti)
exports.getUsersAdmin = async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).send("Vietato");
    const [rows] = await db.execute('SELECT id, email, role, permissions FROM users');
    res.json(rows);
};