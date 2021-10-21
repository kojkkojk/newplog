import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const storage = JSON.parse(localStorage["persist:infos"]);
    const userStore = JSON.parse(storage.authReducer);
    const isLogin = () => !!userStore.userData

    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isLogin() ?
                <Component {...props} />
                : <Redirect to="/login" />
        )} />
    )
}

export default PrivateRoute
