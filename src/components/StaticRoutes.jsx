import React, { useContext } from 'react';
import {
  ClimbingContext,
} from '../store.jsx';

// const BACKEND_URL = 'http://localhost:3004';
// axios.defaults.withCredentials = true;

export default function Routes() {
  const { store } = useContext(ClimbingContext);
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

  return (
    <div>
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
    </div>
  );
}
