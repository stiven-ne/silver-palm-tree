import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const ExportButtons = ({ data }) => {

  // --- FUNZIONE ESPORTAZIONE PDF (Punto 8.1 & 8.3) ---
  const exportPDF = () => {
    const doc = new jsPDF();
    
    // Intestazione del file
    doc.setFontSize(18);
    doc.text("Report Finanziario - Silver Palm Tree", 14, 20);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Generato il: ${new Date().toLocaleString()}`, 14, 30);

    // Tabella Dati
    const tableColumn = ["Data", "Categoria", "Descrizione", "Tipo", "Importo (€)"];
    const tableRows = [];

    data.forEach(t => {
      const transactionData = [
        new Date(t.date).toLocaleDateString(),
        t.category,
        t.description || "-",
        t.type.toUpperCase(),
        t.amount.toFixed(2)
      ];
      tableRows.push(transactionData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      theme: 'striped',
      headStyles: { fillColor: [46, 204, 113] } // Colore Verde come la tua app
    });

    doc.save(`report_finanziario_${new Date().getTime()}.pdf`);
  };

  // --- FUNZIONE ESPORTAZIONE CSV (Punto 8.1) ---
  const exportCSV = () => {
    const csvRows = [];
    const headers = ["Data", "Categoria", "Descrizione", "Tipo", "Importo"];
    csvRows.push(headers.join(','));

    data.forEach(t => {
      const row = [
        new Date(t.date).toLocaleDateString(),
        t.category,
        t.description,
        t.type,
        t.amount
      ];
      csvRows.push(row.join(','));
    });

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transazioni_silver_palm.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div style={{ margin: '20px 0', display: 'flex', gap: '10px' }}>
      <button onClick={exportPDF} style={{ backgroundColor: '#e74c3c' }}>
        📄 Scarica PDF
      </button>
      <button onClick={exportCSV} style={{ backgroundColor: '#3498db' }}>
        📊 Scarica CSV
      </button>
    </div>
  );
};

export default ExportButtons;