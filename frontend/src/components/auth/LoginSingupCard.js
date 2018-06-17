import React from 'react';

import {Card} from 'antd';

import SignupComponent from './SignupComponent';
import LoginComponent from './LoginComponent';
import NotFoundPage from '../NotFoundPage';

import {loginUser} from '../../actions/authActions';

const tabList = [
    {
        key: 'login',
        tab: 'Login',
    },
    {
        key: 'signup',
        tab: 'Signup',
    },
];

const key_list = ['login', 'signup'];

const contentList = {
    login: (<LoginComponent />),
    signup: <SignupComponent />,
};

class LoginSignupComponent extends React.Component {
    state = {
        key: 'login',
        valid: true
        // key: this.props.match.params.action || 'login',
        // valid:
        //     this.props.match.params.action &&
        //     key_list.includes(this.props.match.params.action),
    };

    onTabChange = key => {
        this.setState({key, valid: key_list.includes(key)});
    };

    render() {
        // console.log(this.props);
        if (!this.state.valid) {
            return <NotFoundPage />;
        }
        return (
            <div className="section section--form">
                <br />
                <Card
                    style={{width: '100%'}}
                    tabList={tabList}
                    activeTabKey={this.state.key}
                    className="u-box-shadow-small"
                    onTabChange={key => {
                        this.onTabChange(key);
                    }}>
                    {contentList[this.state.key]}
                </Card>
            </div>
        );
    }
}


export default LoginSignupComponent;
