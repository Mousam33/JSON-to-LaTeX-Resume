import React, { useState, useEffect } from 'react';
import OverleafButton from './OverleafButton';

const SubmitComponent = ({ data, handleSubmit, submit }) => {
  const [responseData, setResponseData] = useState(null);

  const postData = async (url, content) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(content)
    });
    return response.text();
  };

  useEffect(() => {
    if (submit) {
      postData('https://backend-api/', data).then((data) => {
        setResponseData(data);
      });
    }
  }, [submit]);

  const handleCopy = () => {
    navigator.clipboard.writeText(responseData);
    setResponseData(null);
    handleSubmit(!submit)
  };

  return (
    <div className='grid grid-cols-1 gap-4'>
      <div className='flex justify-center'>
        <button className='bg-amber-500 rounded-md p-2 text-white hover:bg-amber-700' onClick={handleSubmit}>
          DONE
        </button>
      </div>
      {/* {submit ? <pre>{JSON.stringify(data, null, 2)}</pre> : null} */}
      {submit && !responseData && <div>Loading...</div>}
      {submit && responseData && (
        <>
          <button
            className="p-2 bg-orange-500 hover:bg-orange-700 text-white rounded-md cursor-default"
            onClick={handleCopy}
          >
            Copy to clipboard
          </button>
          <OverleafButton latex={responseData} />
        </>
      )}
    </div>
  );
};

export default SubmitComponent;
