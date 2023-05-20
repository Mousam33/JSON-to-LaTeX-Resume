import React, { useState, useEffect } from 'react';
import Input from './Input';

const Project = ({ value, setParentData }) => {
    const requiredKeys = ['name', 'description']
    const [data, setData] = useState({
        name: '',
        description: ''
    });

    useEffect(() => {
        try {
            if (requiredKeys.every((key) => Object.keys(value).includes(key))) setData(value)
        } catch (err) { console.log(err) }
    }, [])

    useEffect(() => {
        setParentData(data)
    }, [data])

    const handleChange = (key) => (value) => {
        setData((prevData) => ({ ...prevData, [key]: value }));
    };

    return (
        <div className="grid grid-cols-1 w-full gap-4 ring-2 p-10 ring-amber-500 rounded-md">
            <Input value={data.name} placeholderText='Project name' setDataOnChange={handleChange('name')} />
            <Input value={data.description} placeholderText='Project Description' setDataOnChange={handleChange('description')} />
        </div>
    );
};

export default Project;
