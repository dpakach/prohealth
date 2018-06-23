import React from 'react';

import {Icon} from 'antd';

const DoctorProfile = props => {
    const {doctor_profile} = props;
    return (
        <div>
            <h3>{doctor_profile.qualification}</h3>
            <p>Speciality: {doctor_profile.speciality}</p>
            <h3>
                <Icon type="star" /> {doctor_profile.exp || 0}
            </h3>
            <p>Hospital: {doctor_profile.hospital}</p>
            <p>{doctor_profile.description}</p>

            <p>{doctor_profile.speciality}</p>
        </div>
    );
};

export default DoctorProfile;
