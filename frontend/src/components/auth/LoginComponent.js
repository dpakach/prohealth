import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {login} from '../../actions/authActions';
import {Form, Icon, Input, Button} from 'antd';
const FormItem = Form.Item;

class LoginComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.dispatch(login({token: 'token'}));
        this.props.history.push('/');
    };

    render() {
        return (
            <div className="section section--form">
                <h1 className="heading-primary u-margin-top-big">Login</h1>
                <Form className="login-form" onSubmit={this.handleSubmit}>
                    <FormItem>
                        <label htmlFor="email">email</label>
                        <Input
                            prefix={<Icon type="user" />}
                            placeholder="email"
                            type="email"
                            onChange={this.handleChange}
                        />
                    </FormItem>
                    <FormItem>
                        <label htmlFor="password">password</label>
                        <Input
                            prefix={<Icon type="lock" />}
                            placeholder="password"
                            type="password"
                            onChange={this.handleChange}
                        />
                    </FormItem>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button u-margin-bottom-small">
                        Log In
                    </Button>
                    <div>
                        Or <Link to="/signup"> register now!</Link>
                    </div>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        authenticated: state.auth.authenticated,
    };
};

export default connect(mapStateToProps)(LoginComponent);
