require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connessione Database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connesso con successo'))
  .catch(err => console.error('Errore connessione DB:', err));

// Rotte principali
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server in esecuzione sulla porta ${PORT}`));
// ... altre importazioni
const budgetRoutes = require('./routes/budgetRoutes');

// ... dopo app.use('/api/transactions', ...)
app.use('/api/budget', budgetRoutes);