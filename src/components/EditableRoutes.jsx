/* eslint-disable max-len */
import React, { useContext, useCallback } from 'react';
import update from 'immutability-helper';
import Card from './Card.jsx';
import {
  ClimbingContext, reorderRoutesAction,
} from '../store.jsx';

// const BACKEND_URL = 'http://localhost:3004';
// axios.defaults.withCredentials = true;

export default function EditableRoutesDnD() {
  const { store, dispatch } = useContext(ClimbingContext);
  const { currentTripRoutes } = store;
  const style = {
    width: 400,
  };

  function Container() {
    const moveCard = useCallback((dragIndex, hoverIndex) => {
      const dragCard = currentTripRoutes[dragIndex];
      dispatch(reorderRoutesAction(update(currentTripRoutes, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard],
        ],
      })));
    }, [currentTripRoutes]);
    const renderRouteCard = (card, index) => (
      <Card
        key={card.id}
        index={index}
        name={card.name}
        order={card.order}
        difficulty={card.difficulty}
        moveCard={moveCard}
      />
    );
    return (
      <>
        <div style={style}>{currentTripRoutes.map((route, i) => renderRouteCard(route, i))}</div>
      </>
    );
  }
  return (
    <div>
      <div className="row">
        <div className="col">
          <h4> Order</h4>
        </div>
        <div className="col">
          <h4>Name</h4>
        </div>
        <div className="col">
          <h4>Difficulty</h4>
        </div>
      </div>
      {Container()}
    </div>
  );
}
