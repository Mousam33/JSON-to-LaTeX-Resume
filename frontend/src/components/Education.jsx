import React, { useEffect, useState } from 'react';
import Input from './Input';

const Education = ({ value, setParentData }) => {
  const requiredKeys = ['institute', 'location', 'degreeType', 'cgpa', 'startDate', 'endDate']
  const today = new Date().toISOString().split('T')[0];
  const [data, setData] = useState({
    institute: '',
    location: '',
    degreeType: '',
    cgpa: '',
    startDate: today,
    endDate: today
  });

  useEffect(() => {
    try {
      if (requiredKeys.every((key) => Object.keys(value).includes(key))) setData(value)
    } catch (err) { console.log(err) }
  }, [])

  useEffect(() => {
    setParentData(data)
  }, [data])

  const handleChange = (name) => (newData) => {
    setData(prevData => ({ ...prevData, [name]: newData }));
  };

  return (
    <div className='grid grid-cols-1 w-full gap-4 ring-2 p-10 ring-amber-500 rounded-md'>
      <Input value={data.institute} placeholderText='Institute Name' setDataOnChange={handleChange('institute')} />
      <Input value={data.location} placeholderText='Location' setDataOnChange={handleChange('location')} />
      <Input value={data.degreeType} placeholderText='Degree Type' setDataOnChange={handleChange('degreeType')} />
      <Input value={data.cgpa} placeholderText='Optional CGPA' setDataOnChange={handleChange('cgpa')} />
      <label>Start Date:</label>
      <input type="date" value={data.startDate} onChange={e => handleChange('startDate')(e.target.value)} />
      <label>End Date:</label>
      <input type="date" value={data.endDate} onChange={e => handleChange('endDate')(e.target.value)} />
    </div>
  );
};

export default Education;
