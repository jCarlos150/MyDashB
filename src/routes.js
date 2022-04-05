import React, { useContext } from 'react';
import { Switch, Route, Redirect, } from 'react-router-dom';
import { Context } from './myhooks/context/authContext';
import Login from './pages/login';
import { login_endpoint, home_endpoint, index_endpoint, signup_endpoint, sucess } from './routes-names'
import SignUp from './pages/signup';
import LandingPage from './pages/landing_page';
import Graficos from './pages/graficos';
import Sucess from './pages/sucess';

function CustomRoute({ isPrivate, path, ...rest }) {
    const { loading, authenticated } = useContext(Context);

    if (loading) return <h1>Loading</h1>;
    if (isPrivate && !authenticated) return <Redirect to={login_endpoint} />
    if (path === index_endpoint && authenticated) return <Redirect to={home_endpoint} />

    return <Route {...rest} />;
}

export default function Routes() {
    return (

        <Switch>
            <CustomRoute exact path={index_endpoint} component={LandingPage} />
            <CustomRoute exact path={login_endpoint} component={Login} />
            <CustomRoute exact path={signup_endpoint} component={SignUp} />
            <CustomRoute exact path={sucess} component={Sucess} />
            <CustomRoute isPrivate exact path={home_endpoint} component={Graficos} />
        </Switch >


    );
}