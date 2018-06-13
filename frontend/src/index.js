import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
//import configureStore from './store/configureStore';
import store from './store/configureStore';

import AppRouter from './routers/AppRouter';
import { receiveLogin } from './actions/authActions';

import './styles/style.css';
import './styles/main.scss';

const user = JSON.parse(localStorage.getItem('user'));

if (user && user.token) {
    store.dispatch(receiveLogin(user));
}

store.subscribe(() => {
    const state = store.getState();
    console.log(state);
});

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('root'));
