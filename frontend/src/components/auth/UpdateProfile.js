import React from 'react';

import {Tabs} from 'antd';

import UpdateUserProfile from './UpdateUserProfile';
import UpdateDoctorProfile from './UpdateDoctorProfile';
import UploadProfilePic from './UploadProfilePic';

const TabPane = Tabs.TabPane;

const UpdateProfile = props => {
    const is_doctor = localStorage.getItem('is_doctor') === 'true';
    return (
        <Tabs type="card">
            <TabPane tab="User" key="1">
                <UpdateUserProfile {...props} />
            </TabPane>

            <TabPane tab="Profile Pic" key="2">
                <UploadProfilePic {...props} />
            </TabPane>

            {is_doctor && (
                <TabPane tab="Doctor" key="3">
                    <UpdateDoctorProfile {...props} />
                </TabPane>
            )}
        </Tabs>
    );
};
export default UpdateProfile;
