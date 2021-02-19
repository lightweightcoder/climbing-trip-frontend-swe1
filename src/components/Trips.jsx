import React, { useState, useContext } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
<<<<<<< HEAD
// import EditableRoutes from './EditableRoutes.jsx';
import StaticRoutes from './StaticRoutes.jsx';
import EditableRoutes from './EditableRoutesDnD.jsx';
=======
import StaticRoutes from './StaticRoutes.jsx';
import EditableRoutes from './EditableRoutes.jsx';
>>>>>>> main

// import all the appropriate trips functions
import {
  ClimbingContext,
  loadRoutes,
} from '../store.jsx';

export default function Trips() {
  // initialize the data from the context provider to obtain the
  // state and dispatch function from the value attribute
  // of the provider Higher Order Component in store.jsx
  const { store, dispatch } = useContext(ClimbingContext);
  const [show, setShow] = useState(false);
  const [display, setDisplay] = useState('Static');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    setShow(false);
    setDisplay('Static');
  };

  // handle when user clicks on the 'more info' button to display routes for that trip
  const getRoutes = (tripId) => {
    // make an axios request to fetch all routes for that trip
    loadRoutes(dispatch, tripId);
  };

  // function to create JSX for all trips
  const getTripCards = () => {
    const tripCards = trips.map((trip) => (
      <div key={trip.id} className="col-4">
        <Card className="trip-card">
          <Card.Body>
            <Card.Title className="trip-title">{`Name: ${trip.name}`}</Card.Title>
            <Card.Text>
              {`Description: ${truncate(trip.description)}`}
            </Card.Text>
            <Button variant="primary" onClick={(e) => { handleShow(e); getRoutes(trip.id); }}>More Info</Button>
          </Card.Body>
        </Card>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {trip.name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            { display === 'Static'
              ? <StaticRoutes />
              : <EditableRoutes />}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>

            { display === 'Static'
              ? (
                <Button variant="primary" onClick={handleEditRoutes}>
                  Edit Routes
                </Button>
              )
              : (
                <Button variant="primary" onClick={handleSaveChanges}>
                  Save Changes
                </Button>
              )}
          </Modal.Footer>
        </Modal>
      </div>
    ));

    return tripCards;
  };

  return (
    <div className="container">
      <div className="row">
        {getTripCards()}
      </div>
    </div>
  );
}
