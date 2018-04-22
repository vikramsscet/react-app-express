import React from 'react';
import { Route } from "react-router-dom";
const NavComponents = ({navigation}) => {
    navigation = navigation || [];
    return(
        navigation.map(data => {
             let navigation = data.nav;
             let component = data.component;
             let navString = Object.keys(navigation)[0];
            let navLink = navigation[navString];
            console.log(navString, navLink);
            return <Route key={Math.floor(Math.random()*1000)} path={navLink} component={} />
        })
    );
}

export {Navigation};