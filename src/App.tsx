import React from 'react';
import { Routes } from './routes';
import './Styles/global.scss';
import { Header } from './Components/Header';

const App: React.FC = () => {
  return (
    <div>
      <main>
        <Header />
        <Routes />
      </main>
    </div>
  );
};

export default App;
