import React from 'react';
var _ = require('lodash');
const Content = ({content}) => {
    content = content || [];
    return(
        content.map(data => {
            return <div key={Math.floor(Math.random()*1000)} className="content">{data}</div>
        })
    );
}

export {Content};