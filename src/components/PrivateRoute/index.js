import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { getToken } from '../../utils';

export default function PrivateRoute({ children, ...rest }) {

    function validateToken() {
        if (getToken()) {
            return true;
        };

        return false;
    };

    return (
        <Route {...rest} render={() => validateToken() ? children : <Redirect to="/" />} />
    );
};