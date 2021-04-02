import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import ItemsList from './components/ItemsList';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [items, setItems] = useState([]);
  const [selectedItems, setselectedItems] = useState([]);

  useEffect(async () => {
    fetch(
      'https://api.publicapis.org/entries?category=science',
    ).then(result => {
      result.json().then(data => {
        setItems(data.entries);
        console.log(items)
      });
    })
  }, []);
  const onDragEnd = result => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }

    if (source.droppableId !== destination.droppableId) {
      if ('droppable2' == destination.droppableId) {
        moveItems(source.index, 'selected')
      } else {
        moveItems(source.index, 'unSelected')
      }
    }
  };

  const onItemClick = (itemIndex, isSelected) => {
    console.log(itemIndex, isSelected);
    if (isSelected) {
      moveItems(itemIndex, 'notSelected')
    } else {
      moveItems(itemIndex, 'selected')
    }
  }

  const moveItems = (itemIndex, moveTO) => {
    let sourceList = moveTO == 'selected' ? [...items] : selectedItems;
    const itemToAdd = sourceList.splice(itemIndex, 1);
    if (moveTO == 'selected') {
      setItems(sourceList);
      setselectedItems([...selectedItems, ...itemToAdd]);
    } else {
      setItems([...items, ...itemToAdd]);
      setselectedItems(sourceList);
    }
  }

  const exportSelectedItems = ()=>{
    var data = new Blob([JSON.stringify(selectedItems)], {type:  'text/plain;charset=utf-8'});
    var csvURL = window.URL.createObjectURL(data);
    var tempLink = document.createElement('a');
    tempLink.href = csvURL;
    tempLink.setAttribute('download', 'selectedItems.txt');
    tempLink.click();
  }

  return (
    <div className="App">
      <div>
        <Container>
          <Row>
            <DragDropContext onDragEnd={onDragEnd}>
              <Col sm={4}>
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}

                      ref={provided.innerRef}
                    >
                      <ItemsList list={items} onItemClick={onItemClick} isSelected={false} />
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Col>
              <Col sm={8} >
                <Droppable droppableId="droppable2">
                  {(provided, snapshot) => (
                    <div style={{ backgroundColor:'lightgrey', height:'100%' }}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    ><h1>Selected Items <Button  varient="primary" onClick={exportSelectedItems}>Download</Button></h1>                    
                      <ItemsList list={selectedItems} onItemClick={onItemClick} isSelected={true} />
                      {provided.placeholder}
                      
                    </div>
                  )}
                </Droppable>
              </Col>
            </DragDropContext>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default App;
