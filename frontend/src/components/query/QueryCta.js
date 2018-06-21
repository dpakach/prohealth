import React from 'react';

import {Link} from 'react-router-dom';
import {Card} from 'antd';
import AppointmentForm from './AppointmentForm';
import PrescriptionForm from './PrescriptionForm';
import Prescription from './Prescription';
import Appointment from './Appointment';
import Actions from './Actions';

const is_doctor = false;
const pescribe = {
    medicine: [
        {
            id: 1,
            name_of_medicine: 'sinex',
            quantity: '2 tabs',
            times_a_day: 3,
            remarks: 'take it with water',
        },
        {
            id: 2,
            name_of_medicine: 'burfulonazol',
            quantity: '35ml',
            times_a_day: 2,
            remarks: 'swallow directly',
        },
    ],
};

const appointment = {
    appointed_doc: 'Ram chandra subedi',
    appointed_date: '18th June, 2018',
    appoint_time: '12:20 pm',
    hospital: 'Fakecity General Hospital',
    venue: 'Fake Town',
};

const QueryCta = props => {
    return (
        <div style={{height: "80vh", overflowY: "scroll"}}>
            {!is_doctor && <Actions {...props}/>}
            <Prescription pescr={pescribe} />
            <Appointment appointment={appointment} />
            {is_doctor && (
                <div>
                    <AppointmentForm
                        {...props}
                        updateQuery={props.updateQuery}
                    />
                    <PrescriptionForm
                        {...props}
                        updateQuery={props.updateQuery}
                    />
                </div>
            )}
        </div>
    );
};
export default QueryCta;
