import React from 'react';
import {Link} from 'react-router-dom';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {
    getNotifications,
    readAllNotifications,
} from '../../actions/notificationActions';

class QuickLinks extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notifications: [],
        };
    }

    clearNotifications = () => {
        readAllNotifications().then(data => {
            console.log(data);
        });
        this.listNotifications();
    };

    getNotificationCount = () => {
        return this.state.notifications.length;
    };

    listNotifications = () => {
        getNotifications().then(data => {
            this.setState({
                notifications: data,
            });
        });
    };

    getClassName = notifications => {
        return notifications.viewed
            ? 'list-item list-item--notification'
            : 'list-item list-item--notification list-item--selected';
    };

    componentDidMount() {
        this.listNotifications();
    }

    render() {
        return (
            <div>
                <h1 className="heading-primary">Notifications</h1>
                <a onClick={this.clearNotifications}>Clear all</a>
                <div className="window__list">
                    {this.state.notifications &&
                        this.state.notifications.map(n => (
                            <div className={this.getClassName(n)} key={n.id}>
                                <div className="list-item__title">
                                    {n.title}
                                </div>

                                <div className="list-item__content">
                                    {n.message}
                                </div>
                                <Link to={`/query/${n.query}`}>
                                    view details
                                </Link>
                            </div>
                        ))}
                </div>
            </div>
        );
    }
}

QuickLinks.propTypes = {
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

export default connect(mapStateToProps)(QuickLinks);
