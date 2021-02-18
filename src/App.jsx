import React from 'react';
import './App.css';
import Routes from './Routes.jsx';
import { ClimbingProvider } from './store.jsx';

function App() {
  return (
    <div className="App">
      <ClimbingProvider>
        <Routes />
      </ClimbingProvider>
    </div>
  );
}

export default App;
