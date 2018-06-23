import React from 'react';

import {Row, Col} from 'antd';

import {ROOT_URL} from '../../constants/urls';

import DoctorProfile from './DoctorProfile';

const UserProfile = props => {
    const user = JSON.parse(localStorage.getItem('user'));
    const is_doctor = localStorage.getItem('is_doctor') === 'true';
    const {doctor_profile} = user;

    return (
        <div>
            <Row>
                <Col span={12} push={12}>
                    {is_doctor && (
                        <DoctorProfile doctor_profile={doctor_profile} />
                    )}
                </Col>
                <Col span={12} pull={12}>
                    <Row>
                        <Col>
                            <img
                                style={{height: 200}}
                                src={ROOT_URL + user.user_profile.profile_photo}
                                alt="User"
                            />
                        </Col>
                        <br />
                        <Col>
                            <h2>
                                {user.first_name} {user.last_name}
                            </h2>
                            <h3>{user.email}</h3>
                            <p>
                                Gender:{' '}
                                {user.gender === 'M' ? 'Male' : 'Female'}
                            </p>
                            <p>Date Of Birth: {user.date_of_birth}</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default UserProfile;
