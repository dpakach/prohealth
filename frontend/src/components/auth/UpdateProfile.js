import React from 'react';

import {Tabs} from 'antd';

import UpdateUserProfile from './UpdateUserProfile';
import UpdateDoctorProfile from './UpdateDoctorProfile';

const TabPane = Tabs.TabPane;

const UpdateProfile = props => (

    <Tabs type="card">
        <TabPane tab="User" key="1">
            <UpdateUserProfile {...props}/>
        </TabPane>
        <TabPane tab="Doctor" key="2">
            <UpdateDoctorProfile  {...props}/>
        </TabPane>
    </Tabs>
);

export default UpdateProfile;
