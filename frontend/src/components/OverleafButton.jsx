import React from 'react';

const OverleafButton = ({ latex }) => {

    return (
        <form method='POST' action='https://www.overleaf.com/docs' target='_blank'>
            <input type='hidden' name='encoded_snip' value={encodeURIComponent(latex)} />
            <input className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md" type='submit' value='Open in Overleaf' />
        </form>
    );
};

export default OverleafButton;
