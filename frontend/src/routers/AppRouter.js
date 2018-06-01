import React from 'react';

import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import Header from '../components/Header';
import DashboardPage from '../components/DashboardPage';
import FeaturePage from '../components/FeaturePage';
import NotFoundPage from '../components/NotFoundPage';
import LoginComponent from '../components/auth/LoginComponent';
import SignupComponent from '../components/auth/SignupComponent';
import UpdateProfile from '../components/auth/UpdateProfile';
import QueryCreateComponent from '../components/query/QueryCreateComponent';
import QueryDetailComponent from '../components/query/QueryDetailComponent';

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            true ? (
                <Component {...props} />
            ) : (
                <Redirect to="/login" />
            )
        }
    />
);

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path="/" component={DashboardPage} exact={true} />
                <Route path="/login" component={LoginComponent} />
                <Route path="/signup" component={SignupComponent} />
                <PrivateRoute path="/profile/update" component={UpdateProfile} />
                <PrivateRoute  path="/query/create" component={QueryCreateComponent} />
                <PrivateRoute  path="/query/:id" component={QueryDetailComponent} />
                <Route path="/feature" component={FeaturePage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </BrowserRouter>
);
export default AppRouter;
