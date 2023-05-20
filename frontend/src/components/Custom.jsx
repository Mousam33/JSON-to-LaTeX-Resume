import React, { useState, useEffect } from 'react';
import Input from './Input';

const Custom = ({ value, setParentData }) => {
    const [data, setData] = useState();

    useEffect(() => {
        try {
            if (typeof value === 'string') setData(value)
        } catch (err) { console.log(err) }
    }, [])

    useEffect(() => {
        setParentData(data)
    }, [data])

    return (
        <Input value={data} setDataOnChange={setData} />
    );
};

export default Custom;
