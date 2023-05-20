import React, { useEffect, useState } from 'react';
import Input from './Input';

function Personal({ value, setParentData }) {
  const [data, setData] = useState({ name: '', details: [] });
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    try {
      const savedData = JSON.parse(value.personal);
      setData(savedData)
    } catch (err) { console.log(err) }
  }, [])

  useEffect(() => {
    setParentData({ type: 'personal', personal: JSON.stringify(data) });
  }, [data]);

  const handleUpdateDetailData = (data, index) => {
    setData((prevData) => {
      const updatedDetails = [...prevData.details];
      if (data === null) {
        updatedDetails.splice(index, 1);
      } else {
        updatedDetails[index] = data;
      }
      return { ...prevData, details: updatedDetails };
    });
  };

  const handleUpdateNameData = (value) => {
    setData((prevData) => ({ ...prevData, name: value }));
  };

  const handleRemove = () => {
    setIsRemoved(true);
    setData(null);
    setParentData(null);
  };

  const handleAddItem = () => {
    setData((prevData) => ({
      ...prevData,
      details: prevData.details.concat(null),
    }));
  };

  if (isRemoved) return null;
  return (
    <>
      <div className='grid grid-cols-1 gap-4 ring-2 p-10 ring-black rounded-md font-extralight'>
        <div className='flex flex-row justify-between'>
          <span className='flex-1 text-xl text-center'>Introduction Section</span>
          <button
            className='ml-2 px-2 bg-red-500 text-white rounded'
            onClick={handleRemove}
          >
            -
          </button>
        </div>
        <div className='flex justify-center'>
          <Input
            name='name'
            value={data.name}
            placeholderText={'Enter name here'}
            setDataOnChange={handleUpdateNameData}
          />
        </div>
        <div className='flex flex-row space-x-4'>
          {data.details.map((detail, index) => (
            <Input
              key={index}
              name='details'
              value={detail}
              placeholderText={'Enter details here'}
              setDataOnChange={(data) => handleUpdateDetailData(data, index)}
            />
          ))}
          <div className='flex justify-center items-center text-center'>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white inline-block px-4 text-center font-bold rounded'
              onClick={handleAddItem}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Personal;
