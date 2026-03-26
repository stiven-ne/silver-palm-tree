const Transaction = require('../models/Transaction');

exports.getMonthlyComparison = async (req, res) => {
  const { month1, year1, month2, year2 } = req.query;
  
  const getStats = async (m, y) => {
    const start = new Date(y, m - 1, 1);
    const end = new Date(y, m, 0);
    const data = await Transaction.find({ user: req.user.id, date: { $gte: start, $lte: end } });
    const total = data.reduce((acc, curr) => acc + (curr.type === 'entrata' ? curr.amount : -curr.amount), 0);
    return { total, count: data.length };
  };

  const stats1 = await getStats(month1, year1);
  const stats2 = await getStats(month2, year2);
  res.json({ period1: stats1, period2: stats2, diff: stats1.total - stats2.total });
};