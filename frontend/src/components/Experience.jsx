import React, { useState, useEffect } from 'react';
import Input from './Input';

const Experience = ({ value, setParentData }) => {
    const requiredKeys = ['company', 'role', 'location', 'startDate', 'endDate', 'responsibilities']
    const today = new Date().toISOString().split('T')[0];
    const [data, setData] = useState({
        company: '',
        role: '',
        location: '',
        startDate: today,
        endDate: today,
        responsibilities: [],
    });

    useEffect(() => {
        try {
            if (requiredKeys.every((key) => Object.keys(value).includes(key))) setData(value)
        } catch (err) { console.log(err) }
    }, [])

    useEffect(() => {
        setParentData(data)
    }, [data])

    const handleChange = (field) => (value) => {
        setData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleAddResponsibility = () => {
        setData((prevData) => ({
            ...prevData,
            responsibilities: [...prevData.responsibilities, ''],
        }));
    };

    return (
        <div className="grid grid-cols-1 gap-4 w-full ring-2 p-10 ring-amber-500 rounded-md">
            <label>
                <Input value={data.company} placeholderText='Company Name' setDataOnChange={handleChange('company')} />
            </label>
            <label>
                <Input value={data.role} placeholderText='Role' setDataOnChange={handleChange('role')} />
            </label>
            <label>
                <Input value={data.location} placeholderText='Location' setDataOnChange={handleChange('location')} />
            </label>
            <label>
                Start Date:
                <input
                    type="date"
                    value={data.startDate}
                    onChange={(event) => handleChange('startDate')(event.target.value)}
                />
            </label>
            <label>
                End Date:
                <input
                    type="date"
                    value={data.endDate}
                    onChange={(event) => handleChange('endDate')(event.target.value)}
                />
            </label>
            Responsibilities:
            <ul className='grid gap-4'>
                {data.responsibilities.map((responsibility, index) => (
                    <li key={index}>
                        <Input
                            value={responsibility}
                            setDataOnChange={(value) => {
                                const newResponsibilities = [...data.responsibilities];
                                newResponsibilities[index] = value;
                                setData((prevData) => ({
                                    ...prevData,
                                    responsibilities: newResponsibilities,
                                }));
                            }}
                        />
                    </li>
                ))}
            </ul>
            <button className="bg-green-500 hover:bg-green-700 text-white inline-block px-4 text-center font-bold rounded" onClick={handleAddResponsibility}>+</button>
        </div>
    );
};

export default Experience;
