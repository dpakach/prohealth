import React, {Component} from 'react';
import _ from 'lodash';
import {AuthUrls} from '../../constants/urls';
import {Form, Icon, Input, Button, DatePicker, Select, Alert} from 'antd';
// import validate from '../../utils/validate';

const FormItem = Form.Item;
const Option = Select.Option;

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
            photo_id: null,
            profile_photo: null,
            is_doc: false,

            formErrors: {},
            nonFieldErrors: '',
            emailValid: false,
            passwordValid: false,
            formValid: true,
        };
    }

    // state change and management
    //
    handleSelectChange = value => {
        this.setState({gender: value});
    };

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
                break;
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
            'is_doc',
            'profile_photo',
            'photo_id',
        ]);

        fetch(AuthUrls.SIGNUP, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form_data),
        })
            .then(response => {
                if (response.ok) {
                    console.log(response);
                    return response.json();
                }
                throw Error(
                    'Some thing went wrong! Please make sure the information is valid',
                );
            })
            .then(data => {
                this.setState({nonFieldErrors: ''});
                this.props.history.push('/login');
            })
            .catch(error => {
                this.setState({nonFieldErrors: error.message});
            });

        // fetch(AuthUrls.SIGNUP, {
        //     method: 'POST',
        //     headers: {
        //         'Content Type': 'application/json',
        //     },
        //     body: JSON.stringify(form_data),
        // })
        //     .then(res => {
        //         console.log(res);
        //         return res.json();
        //     })
        //     .then(data => {
        //         console.log(data);
        //     });
    };

    render() {
        return (
            <div>
                <h1 className="heading-primary u-margin-top-big">Signup</h1>
                {this.state.nonFieldErrors && (
                    <div className="section section--form">
                        <Alert
                            message="error"
                            type="error"
                            showIcon
                            description={this.state.nonFieldErrors}
                        />
                    </div>
                )}
            <div className="section section--form">
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

                    <FormItem>
                        <label>Gender</label>
                        <br />
                        <Select
                            showSearch
                            style={{width: 200}}
                            placeholder="Gender"
                            name="gender"
                            onChange={this.handleSelectChange}>
                            <Option value="M">Male</Option>
                            <Option value="F">Female</Option>
                        </Select>
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
            </div>
        );
    }
}

export default SignupComponent;
