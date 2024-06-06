import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import api from '../services/api';

const Grafico = () => {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/api/dados/grafico');
        setDados(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados para o gráfico:', error);
      }
    };
    fetchData();
  }, []);

  const data = {
    labels: dados.map(d => d.mes),
    datasets: [
      {
        label: 'Entradas',
        data: dados.map(d => d.entradas),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Saídas',
        data: dados.map(d => d.saidas),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  return <Bar data={data} />;
};

export default Grafico;
