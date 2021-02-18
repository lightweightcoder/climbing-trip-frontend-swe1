import React from 'react';
import './App.css';
// import { Modal, Button } from 'react-bootstrap';

// import the contexts providers
import {
  ClimbingProvider,
} from './store.jsx';

// import the child components of App
import Trips from './components/Trips.jsx';

function App() {
  return (
    <ClimbingProvider>
      <div className="App">
        <h1>Rock Climbing Planner</h1>
        <Trips />
      </div>
    </ClimbingProvider>
  );
}

export default App;
