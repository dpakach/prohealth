import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {Menu, Icon} from 'antd';
import {logoutAction} from '../actions/authActions';
import {withRouter} from 'react-router';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: localStorage.getItem('authenticated'),
        };
    }

    logout = () => {
        this.props.dispatch(logoutAction());
        this.props.history.push('/login');
    };

    renderLinks = auth => {
        if (this.props.authenticated) {
            return [
                <Menu.Item key="feature">
                    <NavLink to="/feature">
                        <Icon type="mail" />Feature
                    </NavLink>
                </Menu.Item>,
                <Menu.Item key="logout">
                    <a onClick={this.logout}>
                        <Icon type="logout" />Logout
                    </a>
                </Menu.Item>,
            ];
        } else {
            return [
                <Menu.Item key="login/signup">
                    <NavLink to="/user/login">
                        <Icon type="user" />Login / Signup
                    </NavLink>
                </Menu.Item>,
            ];
        }
    };

    render() {
        const auth = localStorage.getItem('authenticated');
        return (
            <header>
                <Menu mode="horizontal" theme="dark">
                    <Menu.Item>
                        <NavLink to="/" exact={true}>
                            ProHealth
                        </NavLink>
                    </Menu.Item>
                    {this.renderLinks(auth)}
                </Menu>
            </header>
        );
    }
}

const mapStateToProps = state => {
    return {
        authenticated: state.auth.authenticated,
    };
};

export default withRouter(connect(mapStateToProps)(Header));
