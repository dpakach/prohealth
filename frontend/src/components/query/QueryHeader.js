import React from 'react';
import Prescription from './Prescription';
import {Card, Row, Col} from 'antd';

const QueryHeader = props => {
    // console.log(props);
    return (
        <div >
            <Card
                bordered={false}
                style={{width: '100%', height: "30vh",overflowY: "scroll",
                    marginBottom: 20}}>
                <Row>
                    <Col span={18}>
                        <h2>{props.query.title_problem}</h2>
                        <p>{props.query.description}</p>

                        <h4>
                            created by: {props.user.first_name}{' '}
                            {props.user.last_name}
                            <br />
                            <small>({props.user.email})</small>
                            <br />
                            <br />
                            Created At: {props.query.date_of_submission}
                        </h4>
                    </Col>

                    <Col span={6}>
                        <h2>User Stats</h2>
                        <p>Name: {props.query.name_of_patient}</p>
                        <p>Age: {props.query.age_of_patient}</p>
                        <p>Height:{props.query.height_of_patient}</p>
                        <p>Weight:{props.query.weight_of_patient}</p>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default QueryHeader;
