import React, { useState, useContext } from 'react';
import {
  Button, Modal, Form, Row, Col,
} from 'react-bootstrap';

// import all the appropriate trips functions
import {
  ClimbingContext,
  createTrip,
} from '../store.jsx';

export default function CreateTrip() {
  // initialize the data from the context provider to obtain the
  // state and dispatch function from the value attribute
  // of the provider Higher Order Component in store.jsx
  const { dispatch } = useContext(ClimbingContext);
  const [show, setShow] = useState(false);
  const [createTripButtonShow, setCreateTripButtonShow] = useState(true);
  // state to control create trip form inputs
  const [newTrip, setNewTrip] = useState({ name: '', description: '' });

  const handleClose = () => {
    setCreateTripButtonShow(true);
    setShow(false);
    setNewTrip({});
  };

  const handleShow = () => {
    setCreateTripButtonShow(false);
    setShow(true);
  };

  // handle when user clicks on the 'submit' button to create a trip
  const handleCreateTrip = () => {
    // make an axios post request to create a trip
    createTrip(dispatch, newTrip);
    setCreateTripButtonShow(true);
    setShow(false);
    setNewTrip({ name: '', description: '' });
  };

  // return (display) the create trip button if user is not currently creating a trip
  if (createTripButtonShow === true) {
    return (
      <Button variant="primary" onClick={handleShow}>
        Create Trip
      </Button>
    );
  }

  // display the create trip modal if user clicked on the create trip button
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          Create a Trip
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} controlId="tripName">
            <Form.Label column sm={2}>
              Trip Name
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" placeholder="" value={newTrip.name} onChange={(e) => setNewTrip({ ...newTrip, name: e.target.value })} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="tripDescription">
            <Form.Label column sm={2}>
              Description
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" placeholder="" value={newTrip.description} onChange={(e) => setNewTrip({ ...newTrip, description: e.target.value })} />
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleCreateTrip}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
