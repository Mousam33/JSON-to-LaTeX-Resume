import React, { useState, useEffect } from 'react';
import Input from './Input';

const Skill = ({ value, setParentData }) => {
    const requiredKeys = ['skillType', 'skillNames']
    const [data, setData] = useState({
        skillType: '',
        skillNames: []
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

    const handleAddSkillName = () => {
        setData((prevData) => ({
            ...prevData,
            skillNames: [...prevData.skillNames, '']
        }));
    };

    return (
        <div className="grid grid-cols-1 gap-4 w-full ring-2 p-10 ring-amber-500 rounded-md">
            <Input
                placeholderText='Skill Type'
                value={data.skillType}
                setDataOnChange={handleChange('skillType')}
            />
            {data.skillNames.map((skillName, index) => (
                <Input
                    key={index}
                    placeholderText='Skill Name'
                    value={skillName}
                    setDataOnChange={(value) => {
                        if (value === null) {
                            const updatedSkillNames = [...data.skillNames];
                            updatedSkillNames.splice(index, 1);
                            handleChange('skillNames')(updatedSkillNames);
                        } else {
                            handleChange('skillNames')(
                                data.skillNames.map((name, i) => (i === index ? value : name))
                            );
                        }
                    }}
                />
            ))}

            <button className="bg-green-500 hover:bg-green-700 text-white inline-block px-4 text-center font-bold rounded" onClick={handleAddSkillName}>+</button>
        </div>
    );
};

export default Skill;
