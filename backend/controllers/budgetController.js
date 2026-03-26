const Budget = require('../models/Budget'); // Crea il modello Budget (vedi sotto)
const Transaction = require('../models/Transaction');

exports.checkBudgetStatus = async (req, res) => {
  try {
    const { category, month, year } = req.query;
    const budget = await Budget.findOne({ user: req.user.id, category, month, year });
    
    if (!budget) return res.json({ msg: "Nessun budget impostato" });

    // Calcola quanto è stato speso per questa categoria nel mese
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const expenses = await Transaction.find({
      user: req.user.id,
      category,
      type: 'uscita',
      date: { $gte: startDate, $lte: endDate }
    });

    const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);
    const percentage = (totalSpent / budget.limit) * 100;

    let alert = null;
    if (percentage >= 100) alert = "ATTENZIONE: Budget Superato!";
    else if (percentage >= 75) alert = "AVVISO: Hai superato il 75% del budget";

    res.json({ totalSpent, limit: budget.limit, percentage, alert });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};