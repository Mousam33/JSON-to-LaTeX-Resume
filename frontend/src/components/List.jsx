import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Education from './Education';
import Input from './Input';
import Experience from './Experience';
import Project from './Project';
import Skill from './Skill';
import Custom from './Custom';

function List({ setParentData, dataType, value }) {
  const [items, setItems] = useState([]);
  const [section, setSection] = useState(dataType === 'education' ? 'Education' :
    dataType === 'professional' ? 'Professional Experience' :
      dataType === 'projects' ? 'Projects' :
        dataType === 'skills' ? 'Technical Skills' :
          dataType === 'list' ? 'Custom' : null);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    try {
      if (value[dataType] !== undefined) {
        // console.log(JSON.stringify(value[dataType]))
        setItems(JSON.parse(value[dataType]))
        setSection(value.section)
      }
    } catch (err) {
      console.log(err)
    }
  }, [])

  useEffect(() => {
    if (isRemoved) setParentData(null)
    else setParentData({ type: dataType, section: section, [dataType]: JSON.stringify(items.map(item => item.data)) })
  }, [items, isRemoved, section])

  const handleAddItem = (option) => {
    setItems([...items, { id: items.length + 1, type: option, data: [] }]);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    const newItems = [...items];
    const [removed] = newItems.splice(source.index, 1);
    newItems.splice(destination.index, 0, removed);
    setItems(newItems);
  }
  const handleUpdateItemDataFunctions = items.map((item, index) => newData => {
    setItems(items => {
      const updatedItems = [...items];
      updatedItems[index] = { ...updatedItems[index], data: newData };
      return updatedItems;
    });
  });

  const handleRemove = () => {
    setIsRemoved(true);
    setItems([]);
  };

  const handleElemRemove = () => {
    const newItems = [...items];
    if (newItems) {
      newItems.splice(0, 1);
      setItems(newItems)
    }
  }

  if (isRemoved) return null;
  return (
    <>
      <div className='grid grid-cols-1 w-full gap-4 ring-2 p-10 ring-black rounded-md font-extralight'>
        <button
          className="flex-1 min-h-full bg-red-500 text-white rounded hover:bg-red-700"
          onClick={handleRemove}>
          DEL
        </button>
        <div className='text-xl font-bols'>
          <Input value={section} placeholderText={section + ' Section'} setDataOnChange={(data) => data.length > 0 ? setSection(data) : null} />
        </div>
        <button
          className="flex-1 min-h-full bg-red-500 text-white rounded hover:bg-red-700"
          onClick={handleElemRemove}>
          -
        </button>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable-list" mode='virtual'>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {items.map((item, index) => (
                  <Draggable key={item.id} draggableId={`list-${item.id}`} index={index} >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="p-2 my-2">
                        <div className='flex flex-row justify-center'>
                          {
                            dataType === 'education' ? <Education value={item} setParentData={handleUpdateItemDataFunctions[index]} /> :
                              dataType === 'professional' ? <Experience value={item} setParentData={handleUpdateItemDataFunctions[index]} /> :
                                dataType === 'projects' ? <Project value={item} setParentData={handleUpdateItemDataFunctions[index]} /> :
                                  dataType === 'skills' ? <Skill value={item} setParentData={handleUpdateItemDataFunctions[index]} /> :
                                    dataType === 'list' ? <Custom value={item} setParentData={handleUpdateItemDataFunctions[index]} /> :
                                      null
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
            className="flex-1 min-h-full bg-blue-500 hover:bg-blue-700 text-white inline-block px-4 text-center font-bold rounded"
            onClick={handleAddItem}>
            +
          </button>
        </div>
      </div>
    </>
  )
}
export default List;