import React from 'react';
import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// import the contexts providers
import {
  ClimbingProvider,
} from './store.jsx';

// import the child components of App
import Trips from './components/Trips.jsx';
import CreateTrip from './components/CreateTrip.jsx';

function App() {
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <ClimbingProvider>
          <div className="App">
            <h1>Rock Climbing Planner</h1>
            <CreateTrip />
            <Trips />
          </div>
        </ClimbingProvider>
      </DndProvider>
    </div>
  );
}

export default App;
