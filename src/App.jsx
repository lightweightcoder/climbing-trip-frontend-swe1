import React from 'react';
import './App.css';
// import { Modal, Button } from 'react-bootstrap';

// import the contexts providers
import {
  ClimbingProvider,
} from './store.jsx';

function App() {
  return (
    <ClimbingProvider>
      <div className="App">
        <h1>Rock Climbing Planner</h1>
      </div>
    </ClimbingProvider>
  );
}

export default App;
