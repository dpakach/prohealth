import React from 'react';

import {Row, Col, Icon} from 'antd';

const user = JSON.parse(localStorage.getItem('user'));

const DoctorProfile = props => {
    return (
        <div>
            <Row>
                <Col span={18} push={6}>
                    <h2>{user.first_name} {user.last_name}</h2>
                    <h3>{user.email}</h3>
                    <p>Gender: {user.gender === "M" ? "Male" : "Female"}</p>
                    <p>Date Of Birth: {user.date_of_birth}</p>
                </Col>
                <Col span={6} pull={18}>
                    <img
                        src="https://randomuser.me/api/portraits/men/62.jpg"
                        alt="Doctor's photo"
                    />
                </Col>
            </Row>
        </div>
    );
}

export default DoctorProfile;
