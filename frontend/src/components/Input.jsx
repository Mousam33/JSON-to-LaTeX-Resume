import React, { useEffect, useState } from 'react';

const Input = ({ name, placeholderText, setDataOnChange, value }) => {
  const [isRemoved, setIsRemoved] = useState(false);
  const [data, setData] = useState('');

  useEffect(() => {
    setData(value)
  }, [value])

  const handleRemove = () => {
    setIsRemoved(true);
    setDataOnChange(null);
  };

  if (isRemoved) return null;

  return (
    <div className="flex items-center h-full w-full">
      <textarea
        name={name}
        className="flex-1 ring-2 rounded-md text-center w-fit h-fit"
        placeholder={placeholderText}
        value={data}
        onChange={(event) => { setData(event.target.value); setDataOnChange(event.target.value) }}
      />
      <button
        className="ml-2 px-2 bg-red-500 text-white rounded hover:bg-red-700"
        onClick={handleRemove}
      >
        -
      </button>
    </div>
  );
};

export default Input;
