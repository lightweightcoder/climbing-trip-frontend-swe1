/* eslint-disable no-nested-ternary */
import React, { useState, useContext } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import StaticRoutes from './StaticRoutes.jsx';
import EditableRoutes from './EditableRoutes.jsx';
import AddRoute from './AddRoute.jsx';

// import all the appropriate trips functions
import {
  ClimbingContext,
  loadRoutes,
} from '../store.jsx';

const BACKEND_URL = 'http://localhost:3004';
export default function Trips() {
  // initialize the data from the context provider to obtain the
  // state and dispatch function from the value attribute
  // of the provider Higher Order Component in store.jsx
  const { store, dispatch } = useContext(ClimbingContext);
  const [show, setShow] = useState(false);
  const [display, setDisplay] = useState('Static');
  const [selectedTripName, setSelectedTripName] = useState('');
  const [selectedTripId, setSelectedTripId] = useState('');

  const handleClose = () => {
    setShow(false);
    setSelectedTripName('');
    setSelectedTripId('');
    setDisplay('Static');
  };

  const handleShow = (trip) => {
    setShow(true);
    setSelectedTripName(trip.name);
    setSelectedTripId(trip.id);
    console.log('inside handle show');
  };

  // get the trips from the ClimbingContext state data
  const { trips } = store;

  // truncate fn
  const truncate = (text) => {
    if (text.length > 50) {
      return `${text.slice(0, 50)}...`;
    }

    return text;
  };

  const handleEditRoutes = () => {
    setDisplay('Editable');
  };

  const handleSaveChanges = () => {
    const { currentTripRoutes } = store;
    // Update each the route's order to match its existing index
    const updatedTripRoutes = currentTripRoutes.map((route, idx) => ({ ...route, order: idx + 1 }));
    axios.put(`${BACKEND_URL}/trips/routes/update`, { updatedTripRoutes })
      .then((result) => {
        console.log(result, 'result');
      })
      .catch((error) => console.log(error));
    setDisplay('Static');
  };

  // handle to display a form to add a route for a trip
  const handleAddRoute = () => {
    setDisplay('AddRoute');
  };

  // handle when user clicks on the 'more info' button to display routes for that trip
  const getRoutes = (tripId) => {
    // make an axios request to fetch all routes for that trip
    loadRoutes(dispatch, tripId);
  };

  // function to create JSX for all trips
  const getTripCards = () => {
    console.log('trips is', trips);
    const tripCards = trips.map((trip) => (
      <div key={trip.id} className="col-4">
        <Card className="trip-card">
          <Card.Body>
            <Card.Title className="trip-title">{`Name: ${trip.name}`}</Card.Title>
            <Card.Text>
              {`Description: ${truncate(trip.description)}`}
            </Card.Text>
            <Button variant="primary" onClick={() => { handleShow(trip); getRoutes(trip.id); }}>More Info</Button>
          </Card.Body>
        </Card>
      </div>
    ));

    return tripCards;
  };

  const getTripRoutesModal = () => (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {selectedTripName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
        display === 'Static' ? <StaticRoutes />
          : display === 'Editable' ? <EditableRoutes />
            : display === 'AddRoute' ? <AddRoute setDisplay={setDisplay} selectedTripId={selectedTripId} newRouteOrder={store.currentTripRoutes.length + 1} />
              : ''
        }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>

        {
        display === 'Static' ? (
          <>
            <Button variant="primary" onClick={handleEditRoutes}>
              Edit Routes
            </Button>
            <Button variant="primary" onClick={handleAddRoute}>
              Add Route
            </Button>
          </>
        ) : display === 'Editable' ? (
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        ) : ''
        }
      </Modal.Footer>
    </Modal>
  );

  return (
    <div className="container">
      <div className="row">
        {getTripCards()}
        {getTripRoutesModal()}
      </div>
    </div>
  );
}
