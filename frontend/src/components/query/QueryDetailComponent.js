import React from 'react';
import QueryHeader from './QueryHeader';
import Chat from './Chat';
import QueryCta from './QueryCta';

import {getUserInfo} from '../../utils/authUtils';
import {getQueryItem} from '../../actions/queryActions';
import {readNotificationsByQuery} from '../../actions/notificationActions';

import {message} from 'antd';


class QueryDetailComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            loading: false,
            query: {},
            user: {},
        };

        this.updateQuery = this.updateQuery.bind(this);
    }

    updateQuery() {
        this.setState({loading: true});
        getQueryItem(this.state.id)
            .then(data => {
                getUserInfo(data.user).then(user => {
                    this.setState({
                        user,
                        nonFieldErrors: '',
                        query: data,
                    });
                    setTimeout(() => {
                        this.setState({loading: false});
                    }, 1000);
                });
            })
            .catch(e => {
                message.error('failed to load resource');
            });
    }

    componentDidMount() {
        this.updateQuery();
        readNotificationsByQuery(this.state.id);
    }

    render() {
        return (
            <div className="query-layout">
                <div className="query-layout__header">
                    <QueryHeader
                        user={this.state.user}
                        query={this.state.query}
                        updateQuery={this.updateQuery}
                        loading={this.state.loading}
                    />
                    <Chat />
                </div>
                <div className="query-layout__cta">
                    <QueryCta
                        {...this.props}
                        query={this.state.query}
                        updateQuery={this.updateQuery}
                        id={this.state.id}
                        user={this.state.user}
                    />
                </div>
            </div>
        );
    }
}

export default QueryDetailComponent;
