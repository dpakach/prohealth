import React from 'react';
import {Link} from 'react-router-dom';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import MessagesList from './MessagesList';

import {
    getMessages,
    readAllMessages,
} from '../../actions/messageActions';

class QuickLinks extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [],
        };
    }

    clearMessages = () => {
        readAllMessages().then(data => {
            console.log(data);
        });
        this.listMessages();
    };

    getMessageCount = () => {
        return this.state.messages.length;
    };

    listMessages = () => {
        getMessages().then(data => {
            this.setState({
                messages: data,
            });
        });
    };

    getClassName = notifications => {
        return notifications.read
            ? 'list-item list-item--notification'
            : 'list-item list-item--notification list-item--selected';
    };

    componentDidMount() {
        this.listMessages();
    }

    render() {
        return (
            <div>
                {this.props.window && (
                    <div className="sidebar__head--icon sidebar__head--icon--notification">
                        <span className="icon--badge">
                            <Link to="/notifications">
                                <i className=" material-icons">message</i>
                            </Link>
                            {this.state.messages &&
                                this.state.messages.length !== 0 && (
                                    <span className="badge">
                                        {this.state.messages.length}
                                    </span>
                                )}
                        </span>
                        <div className="window window--notification notification-window">
                            <div className="window__head">
                                <div className="window__head--icon">
                                    <i className=" material-icons">
                                        message
                                    </i>
                                </div>
                                <div className="window__head--text">
                                    Messages
                                </div>
                                <div className="window__head--button">
                                    <a onClick={this.clearMessages}>
                                        Clear all
                                    </a>
                                </div>
                            </div>

                            <div className="window__content">
                                <div className="shadow-layer">
                                    <div className="shadow" />
                                    <MessagesList
                                        notifications={this.state.messages}
                                    />
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
                )}

                {!this.props.window && (
                    <div>
                        <h1 className="heading-primary">Messages</h1>
                        <a onClick={this.clearMessages}>Clear all</a>

                        <MessagesList
                            notifications={this.state.messages}
                        />
                    </div>
                )}
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
