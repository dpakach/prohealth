import React from 'react';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Header from '../components/Header';
import DashboardPage from '../components/DashboardPage';
import FeaturePage from '../components/FeaturePage';
import NotFoundPage from '../components/NotFoundPage';
import LoginComponent from '../components/auth/LoginComponent';
import SignupComponent from '../components/auth/SignupComponent';



const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path="/" component={ DashboardPage } exact={true} />
                <Route path="/feature" component={ FeaturePage } />
                <Route path="/login" component={ LoginComponent } />
                <Route path="/signup" component={ SignupComponent } />

                <Route component={ NotFoundPage } />
            </Switch>
        </div>
    </BrowserRouter>
)

export default AppRouter;
