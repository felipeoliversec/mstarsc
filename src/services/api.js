import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7008/api/entradas',
});

export default api;
