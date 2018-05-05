import React from 'react';

const ButtonSection = {
    position:"absolute",
    bottom:"5px",
    border : '1px solid black',
    width : '100%',
    'backgroundColor':"silver"
}

const ConfirmButtons = function() {
    return (
        <div style={ButtonSection}>
            <button id="ok">OK</button>
            <button id="cancel">Cancel</button>
        </div>
    )
}

export {ConfirmButtons};