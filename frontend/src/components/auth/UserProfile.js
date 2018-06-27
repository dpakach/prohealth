import React from 'react';

import moment from 'moment';

import DoctorProfile from './DoctorProfile';

const UserProfile = props => {
    const user = JSON.parse(localStorage.getItem('user'));
    const is_doctor = localStorage.getItem('is_doctor') === 'true';

    return (
        <div className="profile">
            <div className="profile__user">
                <div className="profile__photo">
                    <img
                        style={{height: 200}}
                        src="https://media.gettyimages.com/photos/portrait-of-beautiful-woman-without-makeup-picture-id641576958"
                        alt="User"
                    />
                </div>
                <h2 className="profile__user--name">
                    {user.first_name} {user.last_name}
                </h2>
                <h3 className="profile__user--email">{user.email}</h3>

                <div className="profile__items">
                    <div className="profile__item">
                        <div className="profile__item--icon">
                            <i className="icon--normal material-icons">
                                keyboard_arrow_right
                            </i>
                        </div>
                        <div className="profile__item--text">
                            Joined on 13th may 2013
                        </div>
                    </div>

                    <div className="profile__item">
                        <div className="profile__item--icon">
                            <i className="icon--normal material-icons">
                                keyboard_arrow_right
                            </i>
                        </div>
                        <div className="profile__item--text">
                            Born on{' '}
                            {moment(user.date_of_birth, 'YYYY-MM-DD').format(
                                'DD MMM, YYYY',
                            )}
                        </div>
                    </div>

                    <div className="profile__item">
                        <div className="profile__item--icon">
                            <i className="icon--normal material-icons">
                                keyboard_arrow_right
                            </i>
                        </div>
                        <div className="profile__item--text">
                            Gender: {user.gender === 'M' ? 'Male' : 'Female'}
                        </div>
                    </div>
                </div>
                <p />
            </div>

            {is_doctor && (
                <div className="profile__doctor">
                    <DoctorProfile
                        user={user}
                    />
                </div>
            )}
        </div>
    );
};

export default UserProfile;
/*
src={ROOT_URL + user.user_profile.profile_photo}
* */
