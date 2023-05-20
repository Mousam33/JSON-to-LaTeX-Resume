import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Personal from './Personal';
import SubmitComponent from './SubmitComponent';
import List from './List';

const options = ['personal', 'education', 'professional', 'projects', 'skills', 'list'];

function ResumeMain() {
  const [data, setData] = useState([]);
  const [items, setItems] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault();
        localStorage.setItem('items', JSON.stringify(items));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleAddItem = (option) => {
    console.log(option)
    if ('personal' === option) {
      setItems([...items, { id: items.length + 1, type: option, data: {} }]);
    } else {
      setItems([...items, { id: items.length + 1, type: option, data: [] }]);
    }
  };

  const initCap = (value) => {
    return value
      .toLowerCase()
      .replace(/(?:^|[^a-zØ-öø-ÿ])[a-zØ-öø-ÿ]/g, function (m) {
        return m.toUpperCase();
      });
  };

  const handleUpdateItemDataFunctions = items.map((item, index) => newData => {
    setItems(items => {
      const updatedItems = [...items];
      if (newData === null) {
        updatedItems.splice(index, 1);
      } else {
        updatedItems[index] = { ...updatedItems[index], data: newData };
      }
      return updatedItems;
    });
   });
   

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    const newItems = [...items];
    const [removed] = newItems.splice(source.index, 1);
    newItems.splice(destination.index, 0, removed);
    setItems(newItems);
  }

  const handleSubmit = () => {
    setData(items.map(item => item ? item.data : {}));
    setSubmit(!submit)
  }

  const handleSave = () => {
    localStorage.setItem('items', JSON.stringify(items));
  }

  const loadPage = () => {
    if (typeof(Storage) !== "undefined" && localStorage.getItem('items') !== null) {
      setItems(JSON.parse(localStorage.getItem('items')));
    }
  }

  return (
    <div id='ZZroot' className="grid grid-cols-1 gap-2 justify-around">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" mode='virtual'>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={`${item.id}`} index={index} >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="p-2 my-2">
                      <div className='flex flex-row justify-center bg-white'>
                        {
                          ((item.type === 'personal') && (<Personal value={item.data} setParentData={handleUpdateItemDataFunctions[index]} />) ||
                            (<List value={item.data} setParentData={handleUpdateItemDataFunctions[index]} dataType={item.type} />))
                        }
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="flex justify-center">
        <button
          className="flex-1 min-h-full bg-blue-500 hover:bg-blue-700 text-white inline-block px-4 text-center font-extralight rounded"
          onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'X' : 'ADD'}
        </button>
        {isOpen && (
          <div>
            <ul className="absolute bg-white shadow rounded mt-2 py-1">
              {options.map((option) => (
                <li
                  key={option}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    handleAddItem(option);
                    setIsOpen(false);
                  }}>
                  {initCap(option)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="flex flex-row justify-center font-extralight"><SubmitComponent data={data} handleSubmit={handleSubmit} submit={submit} /></div>
      <div className="flex flex-row justify-center pt-5 gap-4">
        <button className="text-center bg-lime-500 hover:bg-lime-700 p-2 rounded-md text-white font-extralight" onClick={handleSave}>SAVE</button>
        <button className="text-center bg-lime-500 hover:bg-lime-700 p-2 rounded-md text-white font-extralight" onClick={loadPage}>LOAD</button>
      </div>
    </div>
  );
}

export default ResumeMain;
