import React from 'react';

import {Row, Col, Card} from 'antd';

const Prescription = props => {
    console.log(props);
    return (
        <Card title="Appointment" bordered={false} style={{width: '100%'}}>
            <p>Location: Fakecity General Hospital</p>
            <p>Doctor: Dr. John Doe</p>
            <p>Date: 18th june 2018</p>
        </Card>
    );
};

export default Prescription;
