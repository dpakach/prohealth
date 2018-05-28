import React, {Component} from 'react';

import {Form, Icon, Input, Button} from 'antd';
const FormItem = Form.Item;

class SignupComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            password2: '',
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    handleSubmit = event => {
        event.preventDefault();
        alert(this.state.email);
    };

    render() {
        return (
            <div className="section section--form">
                <h1 className="heading-primary u-margin-top-big">Signup</h1>
                <Form className="login-form" onSubmit={this.handleSubmit}>
                    <FormItem>
                        <label>email</label>
                        <Input
                            prefix={<Icon type="user" />}
                            placeholder="email"
                            type="email"
                            name="email"
                            onChange={this.handleChange}
                        />
                    </FormItem>
                    <FormItem>
                        <label>password</label>
                        <Input
                            prefix={<Icon type="lock" />}
                            placeholder="password"
                            type="password"
                            name="password"
                            onChange={this.handleChange}
                        />
                    </FormItem>
                    <FormItem>
                        <label>Confirm password</label>
                        <Input
                            prefix={<Icon type="lock" />}
                            placeholder="Confirm password"
                            type="password"
                            name="password2"
                            onChange={this.handleChange}
                        />
                    </FormItem>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button">
                        Signup
                    </Button>
                </Form>
            </div>
        );
    }
}

export default SignupComponent;
