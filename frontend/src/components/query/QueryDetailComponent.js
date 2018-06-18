import React from 'react';
import QueryHeader from './QueryHeader';
import Chat from './Chat';
import QueryCta from './QueryCta';
import {QueryUrls} from '../../constants/urls';

import {getUserInfo} from '../../utils/authUtils';
import {getQueryItem} from '../../actions/queryActions';

import {Row, Col, Card, message} from 'antd';

class QueryDetailComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            query: {},
            user: {}
        };

        this.updateQuery = this.updateQuery.bind(this);
    }

    updateQuery(){
        getQueryItem(this.state.id)
            .then(data => {
                const user = getUserInfo(data.user)
                    .then(user => {
                        this.setState({user});
                    });
                this.setState({nonFieldErrors: ''});
                this.setState({query: data});
            })
            .catch(e => {
                message.error('failed to load resource');
            });
    }

    componentDidMount() {
        this.updateQuery();
    }

    render() {
        return (
            <Card
                style={{width: '100%', height: '80vh', overflowY: 'scroll', background: '#ECECEC'}}
                className="u-box-shadow-small">
                <Row gutter={16}>
                    <Col span={18}>
                        <Row gutter={16}>
                            <Col span={24}>
                                <QueryHeader user={this.state.user} query={this.state.query} />
                            </Col>
                            <Col span={24}>
                                <Chat />
                            </Col>
                        </Row>
                    </Col>

                    <Col span={6}>
                        <QueryCta 
                            {...this.props}
                            query={this.state.query}
                            updateQuery={this.updateQuery}
                        />
                    </Col>
                </Row>
            </Card>
        );
    }
}

export default QueryDetailComponent;
