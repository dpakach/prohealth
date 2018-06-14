import React from 'react';

import {Row, Col, Icon} from 'antd';

const DoctorProfile = props => {
    const user = JSON.parse(localStorage.getItem('user'));
    return (
        <div>
            <Row>
                <Col>
                    <img
                        src="https://randomuser.me/api/portraits/men/62.jpg"
                        alt="Doctor's photo"
                    />
                </Col>
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
