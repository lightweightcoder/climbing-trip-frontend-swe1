import React, { useContext, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import {
  ClimbingContext,
  loadRoutesAction,
} from './store.jsx';

const BACKEND_URL = 'http://localhost:3004';
axios.defaults.withCredentials = true;

export default function Routes() {
  const { store, dispatch } = useContext(ClimbingContext);

  function Route() {
    console.log(store, 'store');
    console.log(store.currentTripRoutes, 'store.currentTripRoutes');
    const listOfRoutes = store.currentTripRoutes.map((route) => (
      <div className="row">
        <div className="col">
          {route.name}
        </div>
        <div className="col">
          {route.difficulty}
        </div>
        <div className="col">
          {route.order}
        </div>
      </div>
    ));
    return listOfRoutes;
  }
  const handleGetRoutes = () => {
    axios.get(`${BACKEND_URL}/trips/1/routes`)
      .then((result) => {
        console.log(result, 'result');
        const { routes } = result.data;
        dispatch(loadRoutesAction(routes));
      });
  };

  return (
    <Modal.Dialog>
      <Modal.Header closeButton>
        <Modal.Title>Trip: Kinabalu</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="row">
          <div className="col">
            Name Of Routes
          </div>
          <div className="col">
            Difficulty
          </div>
          <div className="col">
            Order
          </div>
        </div>
        {Route()}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary">Close</Button>
        <Button variant="primary" onClick={handleGetRoutes}>Get Routes</Button>
      </Modal.Footer>
    </Modal.Dialog>
  );
}
