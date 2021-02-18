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
  const handleChangeOrder = () => {

  };

  const generateOrder = (route) => {
    const arrOfOptions = [];
    for (let i = 1; i < 16; i += 1) {
      arrOfOptions.push(
        <option value={i}>{i}</option>,
      );
    }
    arrOfOptions.splice(route.order - 1, 1);
    return arrOfOptions;
  };

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
          <select onChange={handleChangeOrder}>
            <option selected value={route.order}>{route.order}</option>
            {generateOrder(route)}
          </select>
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
        <Modal.Title>
          Trip:
          [Get name from trip]
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="row">
          <div className="col">
            <h4> Name Of Routes</h4>
          </div>
          <div className="col">
            <h4>Difficulty</h4>
          </div>
          <div className="col">
            <h4>Order</h4>
          </div>
        </div>
        {Route()}
      </Modal.Body>

      <Modal.Footer>
        <div className="row">
          <div className="col-3">
            <Button variant="secondary">Add Route</Button>
          </div>
          <div className="col-3">
            <Button variant="primary" onClick={handleGetRoutes}>Get Routes</Button>
          </div>
          <div className="col-3">
            <Button variant="secondary">Reorder Routes</Button>
          </div>
        </div>
      </Modal.Footer>
    </Modal.Dialog>
  );
}
