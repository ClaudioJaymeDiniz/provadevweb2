import React from 'react';
import './App.css';
import Equipe from './components/equipe/equipe';
import Jogo from './components/jogo/jogo';
import Campeonatos from './components/campeonato/campeonato';

function App() {
  return (
    <div className="app-container">
        <Jogo />
        <Equipe />
        <Campeonatos />
    </div>
  );
}

export default App;
