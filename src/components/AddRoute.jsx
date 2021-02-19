/* eslint-disable max-len */
import React, { useContext } from 'react';
import {
  Form, Row, Col, Button,
} from 'react-bootstrap';
import createListOfDifficulty from '../helper.js';

// import all the appropriate trips functions
import {
  ClimbingContext,
  newRouteNameInputAction,
  newRouteDifficultyInputAction,
  createRoute,
  loadRoutes,
} from '../store.jsx';

export default function AddRoute({ selectedTripId, setDisplay, newRouteOrder }) {
  const { store, dispatch } = useContext(ClimbingContext);
  const { newRoute } = store;

  // Generate a drop down list of difficulty options
  const generateDifficulty = (selectedDifficulty) => {
    const listOfDifficulty = createListOfDifficulty();
    const arrOfOptions = listOfDifficulty.map((difficultyOption) => {
      if (difficultyOption === selectedDifficulty) {
        return <option key={difficultyOption} selected value={difficultyOption}>{difficultyOption}</option>;
      }

      return <option key={difficultyOption} value={difficultyOption}>{difficultyOption}</option>;
    });
    return arrOfOptions;
  };

  // handle to create a route for a trip in the DB
  const handleSubmitRoute = () => {
    // add in the new route's order
    const routeToCreate = { ...newRoute, order: newRouteOrder };
    createRoute(dispatch, selectedTripId, routeToCreate);
    loadRoutes(dispatch, selectedTripId);
    setDisplay('Static');
  };

  return (
    <Form>
      <Form.Group as={Row} controlId="routeName">
        <Form.Label column sm={2}>
          Route Name
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" placeholder="" value={newRoute.name} onChange={(e) => dispatch(newRouteNameInputAction(e.target.value))} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="tripDescription">
        <Form.Label column sm={2}>
          Difficulty
        </Form.Label>
        <Col sm={10}>
          <select onChange={(e) => dispatch(newRouteDifficultyInputAction(e.target.value))}>
            {generateDifficulty(newRoute.difficulty)}
          </select>
        </Col>
      </Form.Group>

      <Button variant="primary" onClick={handleSubmitRoute}>
        Submit Route
      </Button>
    </Form>
  );
}
