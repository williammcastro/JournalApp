import React from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ( {
    isAutenthicated,
    component: Component,
    ...rest
} ) => {
    return (
        <Route { ...rest }
            component={ ( props ) => (
                (isAutenthicated)
                    ? ( <Redirect to="/" /> ) 
                    : (<Component { ...props} /> )
            )}

        />
    )
}


PublicRoute.propTypes = {
    isAutenthicated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}