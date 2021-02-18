import React, { useContext } from 'react';
import {
  ClimbingContext,
} from '../store.jsx';
import createListOfDifficulty from '../helper.js';

// const BACKEND_URL = 'http://localhost:3004';
// axios.defaults.withCredentials = true;

export default function Routes() {
  const { store } = useContext(ClimbingContext);
  const handleChangeOrder = () => {

  };

  const handleChangeDifficulty = () => {

  };

  const generateDifficulty = (route) => {
    const listOfDifficulty = createListOfDifficulty();
    const arrOfOptions = listOfDifficulty.map((difficulty) => {
      if (difficulty === route.difficulty) {
        return <option selected value={difficulty}>{difficulty}</option>;
      }

      return <option value={difficulty}>{difficulty}</option>;
    });
    return arrOfOptions;
  };

  const generateOrder = (route) => {
    const arrOfOptions = [];
    for (let i = 1; i < 16; i += 1) {
      if (route.order === i) {
        arrOfOptions.push(<option selected value={i}>{i}</option>);
      } else {
        arrOfOptions.push(
          <option value={i}>{i}</option>,
        );
      }
    }
    return arrOfOptions;
  };

  function Route() {
    const listOfRoutes = store.currentTripRoutes.map((route) => (
      <div className="row">
        <div className="col">
          {route.name}
        </div>
        <div className="col">
          <select onChange={handleChangeDifficulty}>
            {generateDifficulty(route)}
          </select>
        </div>
        <div className="col">
          <select onChange={handleChangeOrder}>
            {generateOrder(route)}
          </select>
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
