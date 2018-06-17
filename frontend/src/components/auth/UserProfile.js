import React from 'react';

import {Row, Col, Icon} from 'antd';

import {ROOT_URL} from '../../constants/urls';

const DoctorProfile = props => {
    
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    return (
        <div>
            <Row>
                <Col>
                    <img
                        style={{height: 200}}
                        src= {ROOT_URL + user.user_profile.profile_photo}
                        alt="Doctor's photo"
                    />
                </Col>
            <br/>
                <Col>
                    <h2>{user.first_name} {user.last_name}</h2>
                    <h3>{user.email}</h3>
                    <p>Gender: {user.gender === "M" ? "Male" : "Female"}</p>
                    <p>Date Of Birth: {user.date_of_birth}</p>
                </Col>
            </Row>
        </div>
    );
}

export default DoctorProfile;
