import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

// Registrazione dei componenti di Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [pieData, setPieData] = useState({ labels: [], datasets: [] });
  const [totals, setTotals] = useState({ income: 0, expenses: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/transactions');
        const data = res.data;

        // --- LOGICA PER IL GRAFICO A TORTA (Categorie) ---
        const categories = {};
        let inc = 0, exp = 0;

        data.forEach(t => {
          if (t.type === 'uscita') {
            categories[t.category] = (categories[t.category] || 0) + parseFloat(t.amount);
            exp += parseFloat(t.amount);
          } else {
            inc += parseFloat(t.amount);
          }
        });

        setTotals({ income: inc, expenses: exp });

        setPieData({
          labels: Object.keys(categories),
          datasets: [{
            data: Object.values(categories),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
          }]
        });

        // --- LOGICA PER IL GRAFICO A BARRE (Entrate vs Uscite) ---
        setChartData({
          labels: ['Riepilogo Mensile'],
          datasets: [
            { label: 'Entrate', data: [inc], backgroundColor: '#2ecc71' },
            { label: 'Uscite', data: [exp], backgroundColor: '#e74c3c' }
          ]
        });

      } catch (err) { console.error("Errore caricamento grafici", err); }
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>Cruscotto Finanziario</h1>
      
      {/* 1. Riepilogo Card (Punto 6.1) */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <div className="card" style={{ flex: 1, borderLeft: '5px solid #2ecc71' }}>
          <h3>Totale Entrate</h3>
          <p style={{ fontSize: '24px', color: '#2ecc71' }}>{totals.income} €</p>
        </div>
        <div className="card" style={{ flex: 1, borderLeft: '5px solid #e74c3c' }}>
          <h3>Totale Uscite</h3>
          <p style={{ fontSize: '24px', color: '#e74c3c' }}>{totals.expenses} €</p>
        </div>
        <div className="card" style={{ flex: 1, borderLeft: '5px solid #3498db' }}>
          <h3>Saldo Attuale</h3>
          <p style={{ fontSize: '24px' }}>{totals.income - totals.expenses} €</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        {/* 2. Grafico a Barre (Punto 6.2) */}
        <div className="card" style={{ flex: 1, minWidth: '300px' }}>
          <h3>Confronto Entrate/Uscite</h3>
          <Bar data={chartData} />
        </div>

        {/* 3. Grafico a Torta (Punto 6.2) */}
        <div className="card" style={{ flex: 1, minWidth: '300px' }}>
          <h3>Spese per Categoria</h3>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;