import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

export default function(ComposedComponent) {
    class Authentication extends Component {
        componentWillMount() {
            if (!this.props.authenticated) {
                browserHistory.push('/user/login');
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.authenticated) {
                browserHistory.push('/user/login');
            }
        }

        render() {
            return <ComposedComponent {...this.props} />;
        }
    }

    Authentication.propTypes = {authenticated: PropTypes.bool};

    function mapStateToProps(state) {
        return {authenticated: state.auth.authenticated};
    }

    return connect(mapStateToProps)(Authentication);
}
