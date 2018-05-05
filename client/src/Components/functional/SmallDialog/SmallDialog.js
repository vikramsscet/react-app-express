import React from 'react';
import './SmallDialog.css';
import {ConfirmButtons} from '../ConfirmButtons/ConfirmButtons';
function closeDialog(e){
    console.log(e.target);
    e.target.parentElement.parentElement.style.display = "none"
}

const SmallDialog = function({dialogStatus}){
    return(
        <div className='outer' style={dialogStatus}>
            <div className='topSection'>
                    <a href="#" id='closeDialog' onClick={closeDialog}>[X]</a>
            </div>
            <span id="msgArea">Hello Dialog...</span>
            <ConfirmButtons />
        </div>
    );
}

export {SmallDialog} 