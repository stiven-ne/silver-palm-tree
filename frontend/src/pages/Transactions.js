import React, { useState, useEffect } from 'react';
import api from '../services/api';
import ExportButtons from '../components/ExportButtons'; // 1. IMPORTA I BOTTONI

const Transactions = () => {
  const [list, setList] = useState([]);
  const [formData, setFormData] = useState({ 
    amount: '', 
    category: 'Cibo', 
    type: 'uscita', 
    description: '' 
  });

  const loadData = async () => {
    try {
      const res = await api.get('/transactions');
      setList(res.data);
    } catch (err) {
      console.error("Errore nel caricamento dati", err);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/transactions', formData);
      setFormData({ amount: '', category: 'Cibo', type: 'uscita', description: '' });
      loadData(); 
    } catch (err) {
      alert("Errore durante l'inserimento");
    }
  };

  const deleteItem = async (id) => {
    if(window.confirm("Sei sicuro di voler eliminare questa transazione?")) {
      await api.delete(`/transactions/${id}`);
      loadData();
    }
  };

  return (
    <div className="container">
      <h2>Gestione Transazioni</h2>

      {/* FORM DI INSERIMENTO */}
      <div className="card">
        <form onSubmit={handleSubmit}>
          <input 
            type="number" 
            placeholder="Importo" 
            value={formData.amount} 
            onChange={e => setFormData({...formData, amount: e.target.value})} 
            required 
          />
          <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
            <option value="Cibo">Cibo</option>
            <option value="Affitto">Affitto</option>
            <option value="Trasporti">Trasporti</option>
            <option value="Salute">Salute</option>
            <option value="Extra">Entrata Extra</option>
          </select>
          <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
            <option value="uscita">Uscita</option>
            <option value="entrata">Entrata</option>
          </select>
          <button type="submit">Aggiungi</button>
        </form>
      </div>

      <hr />

      {/* 2. AGGIUNGI I BOTTONI DI ESPORTAZIONE QUI */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Storico Movimenti</h3>
        <ExportButtons data={list} /> 
      </div>

      {/* TABELLA DATI */}
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Categoria</th>
              <th>Importo</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {list.map(t => (
              <tr key={t.id}> {/* Nota: t.id per MySQL */}
                <td>{new Date(t.date).toLocaleDateString()}</td>
                <td>{t.category}</td>
                <td style={{ fontWeight: 'bold', color: t.type === 'uscita' ? '#e74c3c' : '#2ecc71' }}>
                  {t.type === 'uscita' ? '-' : '+'}{t.amount}€
                </td>
                <td>
                  <button 
                    onClick={() => deleteItem(t.id)} 
                    style={{ backgroundColor: '#e74c3c', padding: '5px 10px' }}
                  >
                    Elimina
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;