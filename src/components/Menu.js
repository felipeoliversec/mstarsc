import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <nav className="menu">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/mercadorias">Cadastrar Mercadoria</Link></li>
        <li><Link to="/entradas">Entrada de Mercadoria</Link></li>
        <li><Link to="/saidas">Saída de Mercadoria</Link></li>
        <li><Link to="/ver-graficos">Ver Gráficos</Link></li>
      </ul>
    </nav>
  );
};

export default Menu;
