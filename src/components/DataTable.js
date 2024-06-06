import React, { useEffect, useState } from 'react';

const DataTable = () => {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/dados/dadosTabela');
      const data = await response.json();
      setDados(data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Mês</th>
          <th>Nome da Mercadoria</th>
          <th>Entrada</th>
          <th>Saída</th>
          <th>Relatório</th>
        </tr>
      </thead>
      <tbody>
        {dados.map((item, index) => (
          <tr key={index}>
            <td>{item.mes}</td>
            <td>{item.nomeMercadoria}</td>
            <td>{item.entrada}</td>
            <td>{item.saida}</td>
            <td><button>Baixar Relatório</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
