import React from 'react';
import _ from 'lodash';
import {AuthUrls} from '../../constants/urls';

import {Alert, Card, Form, Icon, Input, Button} from 'antd';
const FormItem = Form.Item;

class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',

            formErrors: {},
            nonFieldErrors: '',
            success: false,
            emailValid: false,
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
        let emailValid = this.state.emailValid;

        switch (fieldName) {
            case 'email':
                emailValid = value.match(
                    /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i,
                );
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            default:
                break;
        }
        this.setState(
            {
                formErrors: fieldValidationErrors,
                emailValid,
            },
            this.validateForm,
        );
    };

    validateForm = () => {
        this.setState({
            formValid: this.state.emailValid,
        });
    };

    // form submittion

    handleSubmit = event => {
        event.preventDefault();
        const form_data = _.pick(this.state, ['email']);

        fetch(AuthUrls.RESET_PASSWORD, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form_data),
        })
            .then(response => {
                if (response.ok) {
                    // console.log(response);
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
                this.setState({nonFieldErrors: error.message, success: false});
            });
    };
    render() {
        return (
            <Card
                title="Reset Password"
                className="u-center-content u-box-shadow-small"
                bordered={false}
                style={{width: 400}}>
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
                                description="A password reset link was sent to your email."
                            />
                        </div>
                    )}

                    {!this.state.nonFieldErrors && !this.state.success &&(
                        <div className="u-margin-bottom-small">
                            <Alert
                                message="password reset"
                                type="info"
                                showIcon
                                description="A link will be sent to your email address for password reset"
                            />
                        </div>
                    )}

                    <Form className="login-form" onSubmit={this.handleSubmit}>
                        <FormItem
                            validateStatus={
                                !this.state.formErrors.email
                                    ? 'success'
                                    : 'error'
                            }>
                            <Input
                                prefix={<Icon type="user" />}
                                placeholder="email"
                                type="email"
                                name="email"
                                onChange={this.handleChange}
                            />
                        </FormItem>

                        <button
                            htmlType="submit"
                            disabled={!this.state.formValid}
                            className="login-form-button btn btn--default">
                            Submit
                        </button>
                    </Form>
                </div>{' '}
            </Card>
        );
    }
}

export default ResetPassword;
