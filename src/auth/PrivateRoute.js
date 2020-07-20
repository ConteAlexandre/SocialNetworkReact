import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {isAuthenticated} from "./index";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => isAuthenticated() ? (
        <Component {...props}/>
    ) : (
        //Quand on utilise la private route si erreur alors obligatoirement redirige vers la connexion
        <Redirect to={{pathname: "/signin", state: { from: props.location }}}/>
    )}/>
);

export default PrivateRoute;