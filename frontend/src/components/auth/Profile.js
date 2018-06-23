import React from 'react';

import {Card} from 'antd';

import UserProfile from './UserProfile';
import UpdateProfile from './UpdateProfile';
import UpdatePassword from './UpdatePassword';
import NotFoundPage from '../NotFoundPage';

const tabList = [
    {
        key: 'user',
        tab: 'Profile',
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

let key_list = ['user', 'updatepassword', 'updateprofile'];

class Profile extends React.Component {
    state = {
        key: this.props.match.params.action || 'user',
        valid:
            this.props.match.params.action &&
            key_list.includes(this.props.match.params.action),
    };

    tabChange = key => {
        this.setState({key});
    };

    render() {
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
                        this.tabChange(key);
                    }}>
                    {
                        {
                            user: <UserProfile />,
                            updatepassword: <UpdatePassword />,
                            updateprofile: (
                                <UpdateProfile
                                    {...this.props}
                                    tabChange={this.tabChange}
                                />
                            ),
                        }[this.state.key]
                    }
                </Card>
            </div>
        );
    }
}

export default Profile;
