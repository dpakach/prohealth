import React from 'react';
import _ from 'lodash';
import {AuthUrls} from '../../constants/urls';

import {Alert, Card, Form, Icon, Input, Button, message, Checkbox} from 'antd';
const FormItem = Form.Item;

class FeaturePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            new_password1: '',
            new_password2: '',

            formErrors: {},
            nonFieldErrors: '',
            success: false,
            emailValid: false,
            passwordValid: false,
            formValid: false,
        };
    }

    handleChange = e => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({[name]: value}, () => {
            this.validateField(name, value);
        });
    };

    // form fields validation

    validateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.formErrors;
        let passwordValid = this.state.passwordValid;

        switch (fieldName) {
            case 'new_password1':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid
                    ? ''
                    : ' is too short';
                break;
            case 'new_password2':
                passwordValid = value === this.state.new_password1;
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
                passwordValid: passwordValid,
                passwordValid: passwordValid,
            },
            this.validateForm,
        );
    };

    validateForm = () => {
        this.setState({
            formValid: this.state.passwordValid && this.state.passwordValid,
        });
    };

    // form submittion

    handleSubmit = event => {
        event.preventDefault();
        const form_data = _.pick(this.state, ['new_password1']);

        fetch(AuthUrls.UPDATE_PASSWORD, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem(
                    'authentication',
                )}`,
            },
            body: JSON.stringify({password: this.state.new_password1}),
        })
            .then(response => {
                if (response.ok) {
                    console.log(response);
                    message.success('password updated successfully');
                    return response.json();
                }
                throw Error(
                    'Some thing went wrong! Please make sure the information is valid',
                );
            })
            .then(data => {
                this.setState({nonFieldErrors: '', success: true});
            })
            .catch(error => {
                this.setState({nonFieldErrors: error.message});
            });
    };
    render() {
        return (
            <Card
                title="UpdateProfile"
                className="u-center-content u-box-shadow-small"
                bordered={false}
                style={{width: 300}}>
                <div>
                    {this.state.nonFieldErrors && (
                        <div className="u-margin-bottom-small">
                            <Alert
                                message="error"
                                type="error"
                                showIcon
                                description={this.state.nonFieldErrors}
                            />
                        </div>
                    )}

                    {this.state.success && (
                        <div className="u-margin-bottom-small">
                            <Alert
                                message="success"
                                type="success"
                                showIcon
                                description="your password was updated successfully"
                            />
                        </div>
                    )}

                    <Form className="login-form" onSubmit={this.handleSubmit}>
                        <FormItem
                            validateStatus={
                                !this.state.formErrors.password
                                    ? 'success'
                                    : 'error'
                            }>
                            <Input
                                prefix={<Icon type="lock" />}
                                placeholder="enter a new password"
                                type="password"
                                name="new_password1"
                                onChange={this.handleChange}
                            />
                        </FormItem>
                        <FormItem
                            validateStatus={
                                !this.state.formErrors.password
                                    ? 'success'
                                    : 'error'
                            }>
                            <Input
                                prefix={<Icon type="lock" />}
                                placeholder="Confirm password"
                                type="password"
                                name="new_password2"
                                onChange={this.handleChange}
                            />
                        </FormItem>

                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={!this.state.formValid}
                            className="login-form-button">
                            Submit
                        </Button>
                    </Form>
                </div>{' '}
            </Card>
        );
    }
}

export default FeaturePage;
