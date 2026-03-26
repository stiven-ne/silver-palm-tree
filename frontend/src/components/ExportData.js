import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const ExportData = ({ data }) => {
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Report Transazioni Silver Palm Tree", 20, 10);
    autoTable(doc, {
      head: [['Data', 'Categoria', 'Importo', 'Tipo']],
      body: data.map(t => [t.date, t.category, t.amount, t.type]),
    });
    doc.save("report.pdf");
  };

  return <button onClick={downloadPDF}>Esporta in PDF</button>;
};