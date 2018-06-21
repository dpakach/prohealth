import React from 'react';

import {Row, Col, Card} from 'antd';
import {getAppointment} from '../../actions/queryActions';

const Prescription = props => {

    // console.log(props);
    return (
        <Card title="Appointment" bordered={false} style={{width: '100%'}}>
            <p>Hospital: {props.appointment.hospital}</p>
            <p>Venue: {props.appointment.venue}</p>
            <p>Doctor: {props.appointment.appointed_doc}</p>
            <p>Time: {props.appointment.appoint_time}</p>
            <p>Date: {props.appointment.appointed_date}</p>
        </Card>
    );
};

export default Prescription;
