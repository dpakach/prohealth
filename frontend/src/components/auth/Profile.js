import React from 'react';

import {Card} from 'antd';

import DoctorProfile from './DoctorProfile';
import UserProfile from './UserProfile';
import UpdateProfile from './UpdateProfile';
import UpdatePassword from './UpdatePassword';
import NotFoundPage from '../NotFoundPage';

const is_doctor = localStorage.getItem('is_doctor') === 'true';

const tabList =
    is_doctor
        ? [
              {
                  key: 'user',
                  tab: 'User Profile',
              },
              {
                  key: 'doctor',
                  tab: 'Doctor',
              },
              {
                  key: 'updatepassword',
                  tab: 'Change Password',
              },
              {
                  key: 'updateprofile',
                  tab: 'Update Profile',
              },
          ]
        : [
              {
                  key: 'user',
                  tab: 'User Profile',
              },
              {
                  key: 'updatepassword',
                  tab: 'Change Password',
              },
              {
                  key: 'updateprofile',
                  tab: 'Update Profile',
              },
          ];

let key_list =
    is_doctor
        ? ['user', 'doctor', 'updatepassword', 'updateprofile']
        : ['user', 'updatepassword', 'updateprofile'];

// key_list = is_doctor ? key_list.doctor : key_list.user;

class Profile extends React.Component {
    state = {
        key: this.props.match.params.action || 'user',
        valid:
            this.props.match.params.action &&
            key_list.includes(this.props.match.params.action),
    };

    onTabChange = key => {
        this.setState({key});
    };

    render() {
        // const is_doctor = localStorage.getItem('is_doctor');
        // console.log(this.props.match.params.action);
        if (!this.state.valid) {
            return <NotFoundPage />;
        }
        return (
            <div className="section section--profile">
                <br />
                <Card
                    style={{width: '100%', height: '80vh', overflowY: 'scroll'}}
                    tabList={tabList}
                    activeTabKey={this.state.key}
                    className="u-box-shadow-small"
                    onTabChange={key => {
                        this.onTabChange(key);
                    }}>
                    {
                        {
                            user: <UserProfile />,
                            doctor: <DoctorProfile />,
                            updatepassword: <UpdatePassword />,
                            updateprofile: <UpdateProfile {...this.props} />,
                        }[this.state.key]
                    }
                </Card>
            </div>
        );
    }
}

export default Profile;
