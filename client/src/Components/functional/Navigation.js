import React from 'react';
import { Link } from "react-router-dom";
const Navigation = ({navigation}) => {
    navigation = navigation || [];
    return(
        navigation.map(data => {
             let navigation = data.nav;
             //let component = data.component;
             let navString = Object.keys(navigation)[0];
            let navLink = navigation[navString];
            return <div key={Math.floor(Math.random()*1000)} className="navigation"><Link to={navLink}>{navString}</Link></div>
        })
    );
}

export {Navigation};