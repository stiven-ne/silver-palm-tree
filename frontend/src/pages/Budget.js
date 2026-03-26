import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Budget = () => {
  const [budgets, setBudgets] = useState([]);
  const [limit, setLimit] = useState('');
  const [category, setCategory] = useState('Cibo');

  const saveBudget = async () => {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    await api.post('/budget', { category, limit, month, year });
    alert("Budget salvato!");
  };

  return (
    <div>
      <h2>Impostazione Budget Mensile</h2>
      <div className="card">
        <select onChange={e => setCategory(e.target.value)}>
          <option value="Cibo">Cibo</option>
          <option value="Trasporti">Trasporti</option>
          <option value="Svago">Svago</option>
        </select>
        <input type="number" placeholder="Limite mensile €" onChange={e => setLimit(e.target.value)} />
        <button onClick={saveBudget}>Imposta Limite</button>
      </div>
    </div>
  );
};

export default Budget;