import React, {Component} from 'react';
import _ from 'lodash';

import {signup} from '../../utils/api';
import {Form, Icon, Input, Button, DatePicker} from 'antd';
import {FormErrors} from '../FormErrors';
// import validate from '../../utils/validate';

const FormItem = Form.Item;
class SignupComponent extends Component {
    // constructor and state initialization

    constructor(props) {
        super(props);

        this.state = {
            first_name: '',
            last_name: '',
            username: '',
            email: '',
            password: '',
            password2: '',
            date_of_birth: '',
            gender: '',
            photo_id: '',

            formErrors: {},
            emailValid: false,
            passwordValid: false,
            formValid: false,
        };
    }

    // state change and management

    handleChange = e => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({[name]: value}, () => {
            this.validateField(name, value);
        });
    };
    onDateChange = (date, dateString) => {
        this.setState({date_of_birth: dateString});
    };

    onFileChange = event => {
        const data = new FormData();
        data.append('file', event.target.files[0]);
        data.append('name', 'some value user types');
        data.append('description', 'some value user types');
        // '/files' is your node.js route that triggers our middleware
        // axios.post('/files', data).then(response => {
        //     console.log(response); // do something with the response
        // });
    };

    // form fields validation

    validateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;

        switch (fieldName) {
            case 'email':
                emailValid = value.match(
                    /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i,
                );
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid
                    ? ''
                    : ' is too short';
                break;
            case 'password2':
                passwordValid = value === this.state.password;
                fieldValidationErrors.password = passwordValid
                    ? ''
                    : 'passwords do not match';
            default:
                break;
        }
        this.setState(
            {
                formErrors: fieldValidationErrors,
                emailValid: emailValid,
                passwordValid: passwordValid,
            },
            this.validateForm,
        );
    };
    validateForm = () => {
        this.setState({
            formValid: this.state.emailValid && this.state.passwordValid,
        });
    };

    // form submittion

    handleSubmit = event => {
        event.preventDefault();
        const form_data = _.pick(this.state, [
            'first_name',
            'last_name',
            'email',
            'username',
            'password',
            'date_of_birth',
            'gender',
        ]);
        signup(form_data);
    };

    render() {
        return (
            <div className="section section--form">
                <h1 className="heading-primary u-margin-top-big">Signup</h1>
                <Form className="login-form" onSubmit={this.handleSubmit}>
                    <FormItem>
                        <label>First Name</label>
                        <Input
                            prefix={<Icon type="user" />}
                            placeholder="First Name"
                            type="text"
                            name="first_name"
                            onChange={this.handleChange}
                        />
                    </FormItem>
                    <FormItem>
                        <label>Last Name</label>
                        <Input
                            prefix={<Icon type="user" />}
                            placeholder="Last Name"
                            type="text"
                            name="last_name"
                            onChange={this.handleChange}
                        />
                    </FormItem>
                    <FormItem>
                        <label>Username</label>
                        <Input
                            prefix={<Icon type="user" />}
                            placeholder="Username"
                            type="text"
                            name="username"
                            onChange={this.handleChange}
                        />
                    </FormItem>
                    <FormItem
                        validateStatus={
                            !this.state.formErrors.email ? 'success' : 'error'
                        }>
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
                        <label>Date Of Birth</label>
                        <br />
                        <DatePicker onChange={this.onDateChange} />
                    </FormItem>

                    <FormItem
                        validateStatus={
                            !this.state.formErrors.password
                                ? 'success'
                                : 'error'
                        }>
                        <label>password</label>
                        <Input
                            prefix={<Icon type="lock" />}
                            placeholder="password"
                            type="password"
                            name="password"
                            onChange={this.handleChange}
                        />
                    </FormItem>
                    <FormItem
                        validateStatus={
                            !this.state.formErrors.password
                                ? 'success'
                                : 'error'
                        }>
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
                        disabled={!this.state.formValid}
                        className="login-form-button">
                        Signup
                    </Button>
                </Form>
            </div>
        );
    }
}

export default SignupComponent;
