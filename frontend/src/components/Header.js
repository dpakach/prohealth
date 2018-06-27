import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
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

    renderLinkItem = (to, name, icon, onClick = null) => {
        return (
            <NavLink
                key={name}
                className={`nav__item ${
                    window.location.pathname.split('/')[1] ===
                    name.toLowerCase()
                        ? 'nav__item--active'
                        : ''
                }`}
                to={to}
                onClick={onClick}>
                <div>
                    <div className="nav__item--text">{name}</div>
                </div>
            </NavLink>
        );
    };

    renderLinks = auth => {
        if (this.props.isAuthenticated) {
            return [
                this.renderLinkItem('/feature', 'Feature', 'mail'),
                this.renderLinkItem('/query', 'Query', 'message'),
                this.renderLinkItem('/profile/user', 'Profile', 'profile'),
                this.renderLinkItem('/', 'Logout', 'Logout', this.logout),
            ];
        } else {
            return [
                this.renderLinkItem('/user/login', 'Login', 'user'),
                this.renderLinkItem('/user/signup', 'Signup', 'user'),
            ];
        }
    };

    render() {
        console.log(window.location.pathname.split('/')[1]);
        return (
            <nav className="nav">
                <div className="nav__logo-box">
                    <NavLink to="/" exact={true}>
                        <h1 className="nav__brand">ProHealth</h1>
                    </NavLink>
                </div>

                <div className="nav__search">
                    <input
                        type="text"
                        placeholder="Search"
                        className="nav__search-bar"
                    />
                </div>

                <div className="nav__nav-links">{this.renderLinks()}</div>
            </nav>
        );
    }
}

Header.propTypes = {
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

export default withRouter(connect(mapStateToProps)(Header));
