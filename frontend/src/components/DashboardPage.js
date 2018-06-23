import React from 'react';

import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import {Link} from 'react-router-dom';
import {Row, Col} from 'antd';

import MyQueriesComponent from './query/MyQueriesComponent';

class DashboardPage extends React.Component {
    render() {
        return (
            <div className="section section--profile">
                {this.props.isAuthenticated && <MyQueriesComponent />}
                {!this.props.isAuthenticated && (
                    <p>Please <Link to="/user/login">Login</Link> to get started!!!</p>
                )}
            </div>
        );
    }
}

MyQueriesComponent.propTypes = {
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => {
    const {auth} = state;
    const {isAuthenticated, errorMessage} = auth;

    return {
        isAuthenticated,
        errorMessage,
    };
};

export default connect(mapStateToProps)(DashboardPage);
