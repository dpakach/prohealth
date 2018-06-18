import React from 'react';

import {Link} from 'react-router-dom';
import {Card} from 'antd';
import AppointmentForm from './AppointmentForm';
import PrescriptionForm from './PrescriptionForm';
import Prescription from './Prescription';
import Appointment from './Appointment';

const is_doctor = true;

const QueryCta = props => (
    <div>
        <AppointmentForm {...props} updateQuery={props.updateQuery} />
        <Prescription query={props.query} />
        <PrescriptionForm {...props} updateQuery={props.updateQuery} />
        <Appointment query={props.query} />
    </div>
);

export default QueryCta;
