import React from 'react';
import {Link} from 'react-router-dom';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import Notifications from './notifications/Notifications';
import Messages from './messages/Messages';

import {
    getNotifications,
    readAllNotifications,
} from './../actions/notificationActions';
import {logoutUser} from '../actions/authActions';
import history from '../utils/historyUtils';

class QuickLinks extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notifications: [],
        };
    }

    render() {
        return (
            <div className="sidebar">
                {/* Show Sidebar icons only if user is Authenticated */}
                {this.props.isAuthenticated && (

                    <div className="sidebar__head">
                        <Notifications 
                            window={true}
                        />
                        <Messages 
                            window={true}
                        />
                    </div>
                )}

                <div className="sidebar__links">
                    {this.props.isAuthenticated && (
                        <Link to="/query/create" className="sidebar__link">
                            <i className="sidebar__icon icon ion-md-quote" />
                            <div className="sidebar__text">Ask A Question</div>
                        </Link>
                    )}
                    <Link className="sidebar__link" to="/news">
                        <i className="sidebar__icon material-icons">live_tv</i>
                        <div className="sidebar__text">News</div>
                    </Link>
                    <div className="sidebar__link">
                        <i className="sidebar__icon material-icons">
                            directions_bike
                        </i>
                        <div className="sidebar__text">Health Tips</div>
                    </div>
                    <div className="sidebar__link">
                        <i className="sidebar__icon icon ion-md-analytics" />
                        <div className="sidebar__text">Health Stats</div>
                    </div>
                    <div className="sidebar__link">
                        <i className="sidebar__icon icon ion-ios-paper-plane" />
                        <div className="sidebar__text">Contact</div>
                    </div>
                    {this.props.isAuthenticated && (
                        <Link
                            className="sidebar__link"
                            to="/"
                            onClick={this.logout}>
                            <i className="sidebar__icon icon ion-md-log-out" />
                            <div className="sidebar__text">Logout</div>
                        </Link>
                    )}
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

export default withRouter(connect(mapStateToProps)(QuickLinks));


/*
 *
                        <div className="sidebar__head--icon sidebar__head--icon--notification">
                            <span className="icon--badge">
                                <Link to="/notifications">
                                    <i className=" material-icons">
                                        notifications
                                    </i>
                                </Link>

                                {this.state.notifications &&
                                    this.state.notifications.length !== 0 && (
                                        <span className="badge">
                                            {this.state.notifications.length}
                                        </span>
                                    )}
                            </span>
                            <div className="window window--notification notification-window">
                                <div className="window__head">
                                    <div className="window__head--icon">
                                        <i className=" material-icons">
                                            notifications
                                        </i>
                                    </div>
                                    <div className="window__head--text">
                                        Notifications
                                    </div>
                                    <div className="window__head--button">
                                        <a onClick={this.clearNotifications}>
                                            Clear all
                                        </a>
                                    </div>
                                </div>

                                <div className="window__content">
                                    <div className="shadow-layer">
                                        <div className="shadow" />
                                        <div className="window__list">
                                            {this.state.notifications &&
                                                this.state.notifications.map(
                                                    n => (
                                                        <div
                                                            className={this.getClassName(
                                                                n,
                                                            )}
                                                            key={n.id}>
                                                            <div className="list-item__title">
                                                                {n.title}
                                                            </div>

                                                            <div className="list-item__content">
                                                                {n.message}
                                                            </div>
                                                            <Link
                                                                to={`/query/${
                                                                    n.query
                                                                }`}>
                                                                view details
                                                            </Link>
                                                            <span
                                                                style={{
                                                                    float:
                                                                        'right',
                                                                }}>
                                                                {n.created_at}
                                                            </span>
                                                        </div>
                                                    ),
                                                )}
                                        </div>
                                    </div>
                                </div>
                                <div className="window__footer">
                                    <Link
                                        to="/notifications"
                                        className="btn btn--default btn--small">
                                        see all
                                    </Link>
                                </div>
                            </div>
                        </div>
 * */
