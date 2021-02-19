import React from 'react';
import './App.css';

// import the contexts providers
import {
  ClimbingProvider,
} from './store.jsx';

// import the child components of App
import Trips from './components/Trips.jsx';
import CreateTrip from './components/CreateTrip.jsx';

function App() {
  return (
    <ClimbingProvider>
      <div className="App">
        <h1>Rock Climbing Planner</h1>
        <CreateTrip />
        <Trips />
      </div>
    </ClimbingProvider>
  );
}

export default App;
