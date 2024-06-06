import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Menu from './components/Menu';
import Home from './pages/Home';
import EntradasP from './pages/EntradasP';
import MercadoriasP from './pages/MercadoriasP';
import SaidasP from './pages/SaidasP';
import VerGraficos from './pages/VerGraficos';
import './App.css';

const App = () => {
  return (
    <Router>
      <Header />
      <div className="sidebar">
        <Menu />
      </div>
      <div className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/entradas" element={<EntradasP />} />
          <Route path="/mercadorias" element={<MercadoriasP />} />
          <Route path="/saidas" element={<SaidasP />} />
          <Route path="/vergraficos" element={<VerGraficos />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
