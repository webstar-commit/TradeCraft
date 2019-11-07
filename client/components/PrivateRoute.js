import React from 'react';
import { Route, Redirect } from 'react-router-dom';
let ses = JSON.parse(localStorage.getItem('session'));
export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        JSON.parse(localStorage.getItem('session'))
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} /> 
)