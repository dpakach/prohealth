import React from 'react';

import {Row, Col, Icon} from 'antd';

import UserProfile from './UserProfile.js';
import NotFoundPage from '../NotFoundPage';

const DoctorProfile = props => {
    const is_doctor = localStorage.getItem('is_doctor') === 'true';
    if (!is_doctor){
        return <NotFoundPage />
    }
    const user = JSON.parse(localStorage.getItem('user'));
    const { doctor_profile } = user;
    return (
        <div>
            
            <Row>
                <Col span={12} push={12}>
                    <h3>{doctor_profile.qualification}</h3>
                    <p>Speciality: {doctor_profile.speciality}</p>
                    <h3>
                        <Icon type="star" /> {doctor_profile.exp || 0}
                    </h3>
                    <p>Hospital: {doctor_profile.hospital}</p>
                    <p>{doctor_profile.description}</p>

                    <ul>
                        {/*
                            {doctor_profile.speciality.map(sp => <li key={sp}>{sp}</li>)}
                        */}
                    </ul>
                </Col>
                <Col span={12} pull={12}>
                    <UserProfile />
                </Col>
            </Row>
        </div>
    );
};

export default DoctorProfile;
