import React from 'react';

import {Link} from 'react-router-dom';
import {Card} from 'antd';
import AppointmentForm from './AppointmentForm';
import PrescriptionForm from './PrescriptionForm';
import Prescription from './Prescription';
import Appointment from './Appointment';
import Actions from './Actions';

const is_doctor = false;
const QueryCta = props => {
    return (
        <div style={{height: '80vh', overflowY: 'scroll'}}>
            {!is_doctor && <Actions {...props} />}
            <Prescription {...props} id={props.id} />
            {is_doctor && (
                <PrescriptionForm
                    {...props}
                    update={this.is_doc}
                    id={props.id}
                />
            )}
            <Appointment {...props} id={props.id} />
        </div>
    );
};
export default QueryCta;
