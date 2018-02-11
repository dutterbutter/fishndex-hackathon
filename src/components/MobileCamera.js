import React from 'react';

const imageCapture = (props) => {
    return (
        <div>
            <input type="file" name="image" accept="image/*" capture="user"/>
        </div>
    )
}

export default imageCapture;