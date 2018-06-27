import React, {Component} from 'react';
import {withRouter} from 'react-router';
import _ from 'lodash';
import {AuthUrls} from '../../constants/urls';

import Beer from 'react-icons/lib/fa/beer';


import {
    DatePicker,
    Select,
    message,
} from 'antd';

const Option = Select.Option;

class SignupComponent extends Component {
    // constructor and state initialization

    constructor(props) {
        super(props);

        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            password2: '',
            is_doctor: false,
            date_of_birth: null,
            gender: null,

            formErrors: {},
            nonFieldErrors: '',
            emailValid: false,
            passwordValid: false,
            formValid: true,
        };
    }

    // state change and management
    //

    handleChange = e => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({[name]: value}, () => {
            this.validateField(name, value);
        });
    };

    // form fields validation
    //
    handleCheckbox = e => {
        // console.log(e);
        this.setState({is_doctor: e.target.checked});
    };

    handleSelectChange = value => {
        this.setState({gender: value});
    };

    onDateChange = (date, dateString) => {
        this.setState({date_of_birth: dateString});
    };

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
                formErrors: [fieldValidationErrors],
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

    // render errors
    //
    renderError = key => {
        if (this.state.formErrors[key]) {
            return this.state.formErrors[key].map(e => (
                <li style={{color: 'orangered', listStyle: 'none'}} key={Math.random()}>
                    {e}
                </li>
            ));
        }
    };

    // form submittion

    handleSubmit = event => {
        event.preventDefault();
        const form_data = _.pick(this.state, [
            'first_name',
            'last_name',
            'email',
            'password',
            'is_doctor',
            'gender',
            'date_of_birth',
        ]);

        let config = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(form_data),
        };

        // We dispatch requestLogin to kickoff the call to the API
        return fetch(AuthUrls.USERS, config)
            .then(response => response.json().then(data => ({data, response})))
            .then(({response, data}) => {
                if (response.ok) {
                    message.success('signed up succesfully');
                    this.props.history.push('/user/login/');
                } else {
                    // console.log(data)
                    this.setState({formErrors: data});
                }
            })
            .catch(err => console.log('Error: ', err));
    };

    render() {
        return (
            <div className="section section--form section--form--signup">
                <div className="card">
                    <h1 className="heading-primary u-margin-top-small">
                        Signup
                        <Beer />
                    </h1>
                    <form className="form" onSubmit={this.handleSubmit}>
                        {this.state.nonFieldErrors && (
                            <div className="form__error">
                                <h3 className="form__error--title">Error</h3>
                                <p className="form__error--text">
                                    {this.props.errorMessage}
                                </p>
                            </div>
                        )}
                        <div className="form__group">
                            {this.renderError('email')}
                            <input
                                placeholder="First Name"
                                type="text"
                                name="first_name"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form__group">
                            {this.renderError('email')}
                            <input
                                placeholder="Last Name"
                                type="text"
                                name="last_name"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form__group">
                            {this.renderError('email')}
                            <input
                                placeholder="email"
                                type="email"
                                name="email"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form__group">
                            {this.renderError('password')}
                            <input
                                placeholder="password"
                                type="password"
                                name="password"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form__group">
                            {this.renderError('password2')}
                            <input
                                placeholder="Confirm password"
                                type="password"
                                name="password2"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form__group">
                            <br />
                            {this.renderError('date_of_birth')}
                            <DatePicker onChange={this.onDateChange} />
                        </div>
                        <div className="form__group">
                            {this.renderError('gender')}
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
                        </div>
                        <div className="form__group">
                            <input
                                onChange={this.handleCheckbox}
                                type="checkbox"
                                name="is_doctor"
                            />
                            <span>Signup as a Doctor</span>
                            <p>Select this option if you are a Doctor.</p>
                        </div>
                    </form>
                    <button
                        type="primary"
                        disabled={!this.state.formValid}
                        onClick={this.handleSubmit}
                        className="btn">
                        Signup
                    </button>
                </div>
            </div>
        );
    }
}

export default withRouter(SignupComponent);
