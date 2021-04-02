import { React } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Card, Button } from 'react-bootstrap';

export default ({ list, onItemClick, isSelected }) => (
  list.map((item, index) => (
    <Draggable key={index} draggableId={"item" + index} index={index}>
      {(provided, snapshot) => (
        <Card style={{ maxWidth: '18rem' }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card.Body>
            <Card.Text>
              {item.Description}
            </Card.Text>
            <Button variant={isSelected ? "danger" : "primary"} onClick={() => onItemClick(index, isSelected)}>{isSelected ? "Remove" : "Add"}</Button>
          </Card.Body>
        </Card>
      )}
    </Draggable>
  )
  ))