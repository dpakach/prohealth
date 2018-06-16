import React from 'react';
import QueryHeader from './QueryHeader';
import Chat from './Chat';
import Prescription from './Prescription.js';

import {Row, Col} from 'antd';

class QueryDetailComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <Row>
                <Col span={18}>
                    <Row>
                        <Col span={24}>
                            <div className="header">
                                <QueryHeader />
                            </div>
                        </Col>
                        <Col span={24}>
                            <Chat />
                        </Col>
                    </Row>
                </Col>

                <Col span={6}>
                    <Prescription />
                </Col>
            </Row>
        );
    }
}

export default QueryDetailComponent;
