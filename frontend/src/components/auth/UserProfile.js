import React from 'react';

import {Row, Col, Icon} from 'antd';

const user = JSON.parse(localStorage.getItem('user'));
console.log(user);

const DoctorProfile = props => {
    return (
        <div>
            <Row>
                <Col span={18} push={6}>
                    <p>{user.hospital}</p>
                    <p>{user.bio}</p>
                </Col>
                <Col span={6} pull={18}>
                    <img
                        src="https://randomuser.me/api/portraits/men/62.jpg"
                        alt="Doctor's photo"
                    />
                    <h2>{user.first_name} {user.last_name}</h2>
                    <h3>{user.email}</h3>
                </Col>
            </Row>
        </div>
    );
}

export default DoctorProfile;
