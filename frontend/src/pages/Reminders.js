import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Reminders = () => {
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState({ title: '', amount: '', dueDate: '' });

  const loadReminders = async () => {
    const res = await api.get('/reminders');
    setReminders(res.data);
  };

  useEffect(() => { loadReminders(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    await api.post('/reminders', newReminder);
    setNewReminder({ title: '', amount: '', dueDate: '' });
    loadReminders();
  };

  return (
    <div className="container">
      <h2>Pianificazione Pagamenti Ricorrenti</h2>
      <div className="card">
        <form onSubmit={handleAdd}>
          <input type="text" placeholder="Nome Scadenza (es. Affitto)" 
            onChange={e => setNewReminder({...newReminder, title: e.target.value})} required />
          <input type="number" placeholder="Importo" 
            onChange={e => setNewReminder({...newReminder, amount: e.target.value})} />
          <input type="date" 
            onChange={e => setNewReminder({...newReminder, dueDate: e.target.value})} required />
          <button type="submit">Aggiungi Promemoria</button>
        </form>
      </div>

      <div className="calendar-view">
        <h3>Prossime Scadenze</h3>
        {reminders.map(r => {
          const isUrgent = new Date(r.dueDate) < new Date(Date.now() + 2*24*60*60*1000); // 2 giorni (Punto 5.2)
          return (
            <div key={r._id} className={`card ${isUrgent ? 'border-danger' : ''}`} 
                 style={{borderLeft: isUrgent ? '5px solid red' : '5px solid green'}}>
              <p><strong>{r.title}</strong> - {new Date(r.dueDate).toLocaleDateString()}</p>
              <p>Importo: {r.amount}€</p>
              {isUrgent && <span style={{color: 'red'}}>⚠️ SCADENZA IMMINENTE</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Reminders;