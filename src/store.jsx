/* eslint-disable max-len */
import React, { useReducer, useEffect } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

// create an object that represents all the data contained in the app
// we moved all of this data from the app component into the store
export const initialState = {
  // trips and currentTripRoutes will store database information of every trip and route respectively
  trips: [],
  currentTripRoutes: [],
  newRoute: { name: '', difficulty: '' },
};

// define each action we want to do on the data we defined above
const LOAD_TRIPS = 'LOAD_TRIPS';
const LOAD_ROUTES = 'LOAD_ROUTES';
const REORDER_ROUTES = 'REORDER_ROUTES';
const RENAME_ROUTE = 'RENAME_ROUTE';
const CHANGE_ROUTE_DIFFICULTY = 'CHANGE_ROUTE_DIFFICULTY';
const NEW_ROUTE_NAME_CHANGE = 'NEW_ROUTE_NAME_CHANGE';
const NEW_ROUTE_DIFFICULTY_CHANGE = 'NEW_ROUTE_DIFFICULTY_CHANGE';

// define the matching reducer function
export function climbingReducer(state, action) {
  switch (action.type) {
    case LOAD_TRIPS:
      return { ...state, trips: action.payload.trips };
    case LOAD_ROUTES:
      return { ...state, currentTripRoutes: action.payload.routes };
    case REORDER_ROUTES:
      return { ...state, currentTripRoutes: action.payload.routes };
    case RENAME_ROUTE:
      state.currentTripRoutes[action.payload.index].name = action.payload.name;
      return { ...state };
    case CHANGE_ROUTE_DIFFICULTY:
      state.currentTripRoutes[action.payload.index].difficulty = action.payload.difficulty;
      return { ...state };
    case NEW_ROUTE_NAME_CHANGE:
      state.newRoute.name = action.payload.name;
      return { ...state };
    case NEW_ROUTE_DIFFICULTY_CHANGE:
      state.newRoute.difficulty = action.payload.difficulty;
      return { ...state };
    default:
      return state;
  }
}

// The following action-generating functions are commonly referred to
// as "action creators". They accept any input relevant to the action,
// and return an object that represents that action, which is typically
// passed to the dispatch function. Actions always contain a type attribute
// used to identify the action and tell the reducer what logic to run.
export function loadTripsAction(trips) {
  return {
    type: LOAD_TRIPS,
    payload: {
      trips,
    },
  };
}

export function loadRoutesAction(routes) {
  return {
    type: LOAD_ROUTES,
    payload: {
      routes,
    },
  };
}

// To handle the update the states of the routes after drag and drop
export function reorderRoutesAction(routes) {
  return {
    type: REORDER_ROUTES,
    payload: {
      routes,
    },
  };
}

// To handle the change in the name input of a route
export function handleNameInputAction(index, name) {
  return {
    type: RENAME_ROUTE,
    payload: {
      index,
      name,
    },
  };
}

// To handle the change in difficulty of a route
export function handleDifficultyInputAction(index, difficulty) {
  return {
    type: CHANGE_ROUTE_DIFFICULTY,
    payload: {
      index,
      difficulty,
    },
  };
}

// To handle the change in the name input of a new route
export function newRouteNameInputAction(name) {
  return {
    type: NEW_ROUTE_NAME_CHANGE,
    payload: {
      name,
    },
  };
}

// To handle the change in difficulty option of a new route
export function newRouteDifficultyInputAction(difficulty) {
  return {
    type: NEW_ROUTE_DIFFICULTY_CHANGE,
    payload: {
      difficulty,
    },
  };
}

/* ********************************
 * ********************************
 * ********************************
 * ********************************
 *        Provider Code
 * ********************************
 * ********************************
 * ********************************
 * ********************************
 */

// In this section we extract out the provider HOC

// place the hard coded backend URL in this file only to make axios requests to the DB
const BACKEND_URL = 'http://localhost:3004';

// export the whole context
export const ClimbingContext = React.createContext(null);

// create the provider to use below
const { Provider } = ClimbingContext;

// export a provider HOC that contains the initalized reducer
// pass the reducer as context to the children
// any child component will be able to alter the state of the app
export function ClimbingProvider({ children }) {
  // create the dispatch function in one place and put in into context
  // where it will be accessible to all of the children
  const [store, dispatch] = useReducer(climbingReducer, initialState);
  console.log('inside ClimbingProvider');

  useEffect(() => {
    axios.get(`${BACKEND_URL}/trips`).then((result) => {
      console.log('axios get trips request result is', result);
      dispatch(loadTripsAction(result.data.trips));
    });
  }, []);

  // surround the children elements with
  // the context provider we created above
  return (
    <Provider value={{ store, dispatch }}>
      {children}
    </Provider>
  );
}

/* ********************************
 * ********************************
 * ********************************
 * ********************************
 *        Requests
 * ********************************
 * ********************************
 * ********************************
 * ********************************
 */

// In this section we extract out the
// code that makes requests to the backend

// these functions must be passed the dispatch from the current context
export function loadTrips(dispatch) {
  axios.get(`${BACKEND_URL}/trips`).then((result) => {
    dispatch(loadTripsAction(result.data.trips));
  });
}

export function loadRoutes(dispatch, tripId) {
  console.log('inside loadRoutes');
  axios.get(`${BACKEND_URL}/trips/${tripId}/routes`).then((result) => {
    console.log('running dispatch(loadRoutesAction(result.data.routes))');
    dispatch(loadRoutesAction(result.data.routes));
  });
}

export function createTrip(dispatch, newTrip) {
  axios.post(`${BACKEND_URL}/trips`, newTrip).then((result) => {
    dispatch(loadTripsAction(result.data.trips));
  });
}

export function createRoute(tripId, newRoute) {
  console.log('inside createRoute');
  return axios.post(`${BACKEND_URL}/trips/${tripId}/routes`, newRoute);
}
