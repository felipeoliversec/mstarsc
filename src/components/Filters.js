import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Filters = ({ onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [months, setMonths] = useState([]);

  useEffect(() => {
    // Obter meses únicos dos dados
    const fetchMonths = async () => {
      try {
        const response = await api.get('/api/dados/meses');
        setMonths(response.data);
      } catch (error) {
        console.error('Erro ao buscar meses:', error);
      }
    };
    fetchMonths();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onFilter(event.target.value, selectedMonth);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    onFilter(searchTerm, event.target.value);
  };

  return (
    <div className="filters">
      <input 
        type="text" 
        placeholder="Buscar..." 
        value={searchTerm} 
        onChange={handleSearchChange} 
      />
      <select value={selectedMonth} onChange={handleMonthChange}>
        {months.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filters;
