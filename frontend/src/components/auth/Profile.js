import React from 'react';

import {Card} from 'antd';

import UserProfile from './UserProfile';
import UpdateProfile from './UpdateProfile';
import UpdatePassword from './UpdatePassword';
import NotFoundPage from '../NotFoundPage';

import {getUser} from '../../actions/authActions';

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
        user: null,
        loading: false
    };

    tabChange = key => {
        this.setState({key});
    };

    updateUser = () => {
        this.setState({loading: true})
        return getUser().then(data => {
            this.setState({user: data, loading: false});
            return data;
        });
    }

    componentDidMount() {
        this.updateUser();
    }

    render() {
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
                    className="card"
                    onTabChange={key => {
                        this.tabChange(key);
                    }}>
                    {
                        {
                            user: (
                                <UserProfile
                                    user={this.state.user}
                                    updateUser={this.updateUser}
                                    loading={this.state.loading}
                                />
                            ),
                            updatepassword: (
                                <UpdatePassword
                                    user={this.state.user}
                                    updateUser={this.updateUser}
                                    loading={this.state.loading}
                                />
                            ),
                            updateprofile: (
                                <UpdateProfile
                                    {...this.props}
                                    tabChange={this.tabChange}
                                    user={this.state.user}
                                    updateUser={this.updateUser}
                                    loading={this.state.loading}
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
