/* eslint-disable max-len */
import React, { useReducer, useEffect } from 'react';
import axios from 'axios';

// create an object that represents all the data contained in the app
// we moved all of this data from the app component into the store
export const initialState = {
  // trips and currentTripRoutes will store database information of every trip and route respectively
  trips: [],
  currentTripRoutes: [],
};

// define each action we want to do on the data we defined above
const LOAD_TRIPS = 'LOAD_TRIPS';
const LOAD_ROUTES = 'LOAD_ROUTES';
const REORDER_ROUTES = 'REORDER_ROUTES';

// define the matching reducer function
export function climbingReducer(state, action) {
  switch (action.type) {
    case LOAD_TRIPS:
      return { ...state, trips: action.payload.trips };
    case LOAD_ROUTES:
      return { ...state, currentTripRoutes: action.payload.routes };
    case REORDER_ROUTES:
      return { ...state, currentTripRoutes: action.payload.routes };
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

export function reorderRoutesAction(routes) {
  return {
    type: REORDER_ROUTES,
    payload: {
      routes,
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
  axios.get(`${BACKEND_URL}/trips/${tripId}/routes`).then((result) => {
    dispatch(loadRoutesAction(result.data.routes));
  });
}
