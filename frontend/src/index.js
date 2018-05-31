import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
//import configureStore from './store/configureStore';
import store from './store/configureStore';

import AppRouter from './routers/AppRouter';

import './styles/style.css';
import './styles/main.scss';

// import {login, logout} from './actions/authActions';

//store.subscribe(() => {
//    const state = store.getState();
//    console.log(state);
//});

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('root'));
