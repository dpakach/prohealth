import React from 'react';

import {Provider} from 'react-redux';
import {checkToken} from './actions/authActions';

import store from './store/configureStore';
import AppRouter from './routers/AppRouter';
import {receiveLogin, receiveLogout} from './actions/authActions';

export default class App extends React.Component {
    state = {loading: false};

    componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');

        if (token) {
        this.setState({loading: true});
        checkToken().then(status => {
            if (status == 200) {
                this.setState({loading: false});
                store.dispatch(receiveLogin(user));
            } else {
                console.log('not authorized');
                this.setState({loading: false});
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                store.dispatch(receiveLogout());
            }
        });
        }
    }

    render() {
        return (
            <Provider store={store}>
                <AppRouter loading={this.state.loading} />
            </Provider>
        );
    }
}
