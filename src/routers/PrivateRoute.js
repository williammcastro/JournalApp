import React from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ( {
    isAutenthicated,
    component: Component,
    ...rest
} ) => {
    // console.log('Private router dice: inicio ruta privada')
    return (
        <Route { ...rest }
            component={ ( props ) => (
                (isAutenthicated)
                    ? (<Component { ...props} /> )
                    : ( <Redirect to="/auth/login" /> )
            )}

        />
    )
}


PrivateRoute.propTypes = {
    isAutenthicated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}