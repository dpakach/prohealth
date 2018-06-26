import React from 'react';

import {Icon} from 'antd';

const DoctorProfile = props => {
    const {user} = props;
    const {doctor_profile} = user;
    return (
        <div className="profile__items">
            <h2 className="profile__user--name" style={{textAlign: 'left'}}>
                {user.first_name} {user.last_name}
            </h2>
            <h3>{doctor_profile.qualification}</h3>
            <div className="profile__item">
                <div className="profile__item--icon">
                    <i className="icon--normal material-icons">place</i>
                </div>
                <div className="profile__item--text">Pokhara</div>
            </div>
            <div className="profile__item">
                <div className="profile__item--icon">
                    <i className="icon--normal material-icons">my_location</i>
                </div>
                <div className="profile__item--text">
                    {doctor_profile.speciality}
                </div>
            </div>
            <div className="profile__item">
                <div className="profile__item--icon">
                    <i className="icon--normal material-icons">star</i>
                </div>
                <div className="profile__item--text">{doctor_profile.exp || 0}</div>
            </div>
            <div className="profile__item">
                <div className="profile__item--icon">
                    <i className="icon--normal material-icons">
                        local_hospital
                    </i>
                </div>
                <div className="profile__item--text">{doctor_profile.hospital}</div>
            </div>
            <div>
                Dolor mollitia ullam perspiciatis ullam itaque Doloremque
                repellendus possimus nisi et quae. Natus necessitatibus
                recusandae odio optio illo nobis dolor? Ea a itaque a quos
                blanditiis Rerum recusandae at aut Dolor mollitia ullam
                perspiciatis ullam itaque Doloremque repellendus possimus nisi
                et quae. Natus necessitatibus recusandae odio optio illo nobis
                dolor? Ea a itaque a quos blanditiis Rerum recusandae at aut
                Dolor mollitia ullam perspiciatis ullam itaque Doloremque
                repellendus possimus nisi et quae. Natus necessitatibus
                recusandae odio optio illo nobis dolor? Ea a itaque a quos
                blanditiis Rerum recusandae at aut Dolor mollitia ullam
                perspiciatis ullam itaque Doloremque repellendus possimus nisi
                et quae. Natus necessitatibus recusandae odio optio illo nobis
                dolor? Ea a itaque a quos blanditiis Rerum recusandae at aut
            </div>

            {doctor_profile.description}
        </div>
    );
};

export default DoctorProfile;
