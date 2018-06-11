import React from 'react';

import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {message} from 'antd';

import Header from '../components/Header';
import DashboardPage from '../components/DashboardPage';
import FeaturePage from '../components/FeaturePage';
import NotFoundPage from '../components/NotFoundPage';
import LoginComponent from '../components/auth/LoginComponent';
import SignupComponent from '../components/auth/SignupComponent';
import UpdateProfile from '../components/auth/UpdateProfile';
import QueryCreateComponent from '../components/query/QueryCreateComponent';
import QueryDetailComponent from '../components/query/QueryDetailComponent';
import LoginSignupComponent from '../components/auth/LoginSingupCard';

import UpdatePassword from '../components/auth/UpdatePassword';
import ResetPassword from '../components/auth/ResetPassword';
import Profile from '../components/auth/Profile';
import Starting from '../components/auth/Starting';

const PrivateRoute = ({component: Component, ...rest}) => {
    const auth = localStorage.getItem('authenticated');
    if (!auth) message.error('you must be logged in');
    return (
        <Route
            {...rest}
            render={props =>
                auth ? <Component {...props} /> : <Redirect to="/user/login" />
            }
        />
    );
};

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path="/" component={DashboardPage} exact={true} />

                <Route path="/user/:action" component={LoginSignupComponent} />

                <PrivateRoute
                    path="/profile/update"
                    component={UpdateProfile}
                />
                <PrivateRoute
                    path="/update-password"
                    component={UpdatePassword}
                />
                <PrivateRoute
                    path="/reset-password"
                    component={ResetPassword}
                />
                <PrivateRoute
                    path="/query/create"
                    component={QueryCreateComponent}
                />
                <PrivateRoute
                    path="/query/:id"
                    component={QueryDetailComponent}
                />

                <PrivateRoute path="/profile/:action" component={Profile} />

                <Route path="/starting" component={Starting} />

                <Route path="/feature" component={FeaturePage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;
