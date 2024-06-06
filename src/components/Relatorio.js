import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import api from '../services/api';

const Relatorio = () => {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/api/movimentacoes'); 
        setDados(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados para o relatório:', error);
      }
    };
    fetchData();
  }, []);

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Mês', 'Entradas', 'Saídas']],
      body: dados.map(d => [d.mes, d.entradas, d.saidas]),
    });
    doc.save('relatorio.pdf');
  };

  return (
    <div>
      <button onClick={exportPDF}>Exportar Relatório</button>
    </div>
  );
};

export default Relatorio;
