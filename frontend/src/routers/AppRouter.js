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

import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({
    component: Component,
    auth,
    ...rest
}) => {
    if (!auth) message.error('you must be logged in');
    return (
        <Route
            {...rest}
            render={props =>
                auth ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/user/login" />
                )
            }
        />
    );
};

const is_doctor = localStorage.getItem('is_doctor');

class AppRouter extends React.Component {
    render() {
        const {dispatch} = this.props;
        return (
            <BrowserRouter>
                <div>
                    <Header dispatch={dispatch} />
                    <Switch>
                        <Route
                            path="/"
                            component={DashboardPage}
                            exact={true}
                        />

                    {/*
                        <Route
                            path="/user/:action"
                            render={(props) => {
                                return (
                                    <LoginSignupComponent
                                        {...props}
                                        dispatch={dispatch}
                                    />
                                );
                            }}
                        />
                    */}

                        <Route
                            path="/user/login"
                            render={props => {
                                return (
                                    <LoginComponent
                                        {...props}
                                        dispatch={dispatch}
                                    />
                                );
                            }}
                        />

                        <Route
                            path="/user/signup"
                            render={props => {
                                return (
                                    <SignupComponent
                                        {...props}
                                        dispatch={dispatch}
                                    />
                                );
                            }}
                        />

                    {/*
                        <PrivateRoute
                            path="/profile/update"
                            auth={this.props.isAuthenticated}
                            component={UpdateProfile}
                        />
                            */}
                        <PrivateRoute
                            path="/update-password"
                            auth={this.props.isAuthenticated}
                            component={UpdatePassword}
                        />
                        <PrivateRoute
                            path="/reset-password"
                            auth={this.props.isAuthenticated}
                            component={ResetPassword}
                        />
                        <PrivateRoute
                            path="/query/create"
                            component={QueryCreateComponent}
                            auth={this.props.isAuthenticated}
                        />
                        <PrivateRoute
                            path="/query/:id"
                            auth={this.props.isAuthenticated}
                            component={QueryDetailComponent}
                        />

                        <PrivateRoute
                            path="/profile/:action"
                            auth={this.props.isAuthenticated}
                            component={Profile}
                        />

                        <Route path="/feature" component={FeaturePage} />
                        <Route component={NotFoundPage} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

AppRouter.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
    const {auth} = state;
    const {isAuthenticated, errorMessage} = auth;

    return {
        isAuthenticated,
        errorMessage,
    };
};

export default connect(mapStateToProps)(AppRouter);
