import React from 'react';

const Navigation = ({navigation}) => {
    navigation = navigation || [];
    return(
        navigation.map(data => {
            return <div key={Math.floor(Math.random()*1000)} className="navigation">{data}</div>
        })
    );
}

export {Navigation};