import React from 'react';

import {Row, Col, Icon} from 'antd';

const doctor = {
    name: 'Daniel Fakeman',
    hospital: 'Fakecity General Hospital',
    qualification: 'MBBS, MD - cardiology',
    bio:
        'Sit enim ducimus natus distinctio nulla. Illum illum quam repellendus sed quam nemo. Iusto et iste similique voluptates neque? Sed quam iure illum illum consectetur. Repellat soluta pariatur nesciunt voluptates!Sit enim ducimus natus distinctio nulla. Illum illum quam repellendus sed quam nemo. Iusto et iste similique voluptates neque? Sed quam iure illum illum consectetur. Repellat soluta pariatur nesciunt voluptates!Sit enim ducimus natus distinctio nulla. Illum illum quam repellendus sed quam nemo. Iusto et iste similique voluptates neque? Sed quam iure illum illum consectetur. Repellat soluta pariatur nesciunt voluptates!Sit enim ducimus natus distinctio nulla. Illum illum quam repellendus sed quam nemo. Iusto et iste similique voluptates neque? Sed quam iure illum illum consectetur. Repellat soluta pariatur nesciunt voluptates!',
    speciality: ['cardiology', 'general psysiology'],
    exp: 47,
};

const DoctorProfile = props => {
    return (
        <div>
            <Row>
                <Col span={18} push={6}>
                    <p>{doctor.hospital}</p>
                    <p>{doctor.bio}</p>
                    <ul>
                        {doctor.speciality.map(sp => <li key={sp}>{sp}</li>)}
                    </ul>
                </Col>
                <Col span={6} pull={18}>
                    <img
                        src="https://randomuser.me/api/portraits/men/62.jpg"
                        alt="Doctor's photo"
                    />
                    <h2>{doctor.name}</h2>
                    <h3>{doctor.qualification}</h3>
                    <h3>
                        <Icon type="star" /> {doctor.exp}
                    </h3>
                </Col>
            </Row>
        </div>
    );
};

export default DoctorProfile;
