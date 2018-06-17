import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {Menu, Icon} from 'antd';
import {logoutUser} from '../actions/authActions';
import {withRouter} from 'react-router';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: localStorage.getItem('authenticated'),
            logoutError: '',
        };
    }

    logout = () => {
        this.props.dispatch(logoutUser(this.props.history));
    };

    renderLinks = auth => {
        // if (this.state.authenticated) {
        // if(this.state.authenticated){
        if(this.props.isAuthenticated){
            return [
                <Menu.Item key="feature">
                    <NavLink to="/feature">
                        <Icon type="mail" />Feature
                    </NavLink>
                </Menu.Item>,
                <Menu.Item key="profile">
                    <NavLink to="/profile/user">
                        <Icon type="profile" />Profile
                    </NavLink>
                </Menu.Item>,
                <Menu.Item key="logout">
                    <NavLink onClick={this.logout} to="/">
                        <Icon type="logout" />Logout
                    </NavLink>
                </Menu.Item>,
            ];
        } else {
            return [
                <Menu.Item key="login">
                    <NavLink to="/user/login">
                        <Icon type="user" />Login
                    </NavLink>
                </Menu.Item>,

                <Menu.Item key="signup">
                    <NavLink to="/user/signup">
                        <Icon type="user" />Signup
                    </NavLink>
                </Menu.Item>,
            ];
        }
    };

    render() {
        return (
            <header>
                <Menu mode="horizontal" theme="dark">
                    <Menu.Item>
                        <NavLink to="/" exact={true}>
                            ProHealth
                        </NavLink>
                    </Menu.Item>
                    {this.renderLinks()}
                </Menu>
            </header>
        );
    }
}


Header.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
    const {auth} = state
    const {isAuthenticated, errorMessage} = auth
    return {
        isAuthenticated,
        errorMessage
    }
}

export default withRouter(connect(mapStateToProps)(Header));
