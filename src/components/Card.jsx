import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import createListOfDifficulty from '../helper.js';

const ItemTypes = {
  CARD: 'card',
};

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
};
export default function Card({
  index, name, order, difficulty, moveCard,
}) {
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen

      // Question mark referes to 'Optional Chaining'
      // https://www.freecodecamp.org/news/how-the-question-mark-works-in-javascript/

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.CARD, index, name, order, difficulty,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  const handleChangeDifficulty = () => {

  };

  const generateDifficulty = (currRouteDifficulty) => {
    const listOfDifficulty = createListOfDifficulty();
    const arrOfOptions = listOfDifficulty.map((difficultyOption) => {
      if (difficultyOption === currRouteDifficulty) {
        return <option selected value={difficultyOption}>{difficultyOption}</option>;
      }

      return <option value={difficultyOption}>{difficultyOption}</option>;
    });
    return arrOfOptions;
  };

  return (
    <div ref={ref} style={{ ...style, opacity }}>

      <div className="row">
        <div className="col">
          {index + 1}
        </div>
        <div className="col">
          {name}
        </div>
        <div className="col">
          <select onChange={handleChangeDifficulty}>
            {generateDifficulty(difficulty)}
          </select>
        </div>
      </div>
    </div>
  );
}