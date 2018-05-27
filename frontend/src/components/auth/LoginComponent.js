import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Form, Icon, Input, Button, checkbox } from 'antd';
const FormItem = Form.Item;


class LoginComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    onEmailChange = (e) => {
        const email = e.target.value;
        this.setState(() => ({email}))
    }

    onPasswordChange = (e) => {
        const password = e.target.value;
        this.setState(() => ({password}))
    }

    handleSubmit = event => {
        event.preventDefault();
        alert(this.state.email)
    }

    render(){
        return (
            <div>
                <Form 
                    className="login-form"
                    onSubmit={this.handleSubmit}
                >
                    <FormItem>
                        <Input 
                            prefix={<Icon type="user" />}
                            placeholder="email"
                            type="email"
                            onChange={this.onEmailChange}
                        />
                    </FormItem>
                    <FormItem>
                        <Input 
                            prefix={<Icon type="lock" />}  
                            placeholder="password"
                            type="password"
                            onChange={this.onPasswordChange}
                        />
                    </FormItem>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                    >
                        Log In
                    </Button>
                    Or <Link to="/">register now!</Link>
                </Form>
            </div>
        )
    }
}

export default LoginComponent;
