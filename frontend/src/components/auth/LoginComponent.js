import React, {Component} from 'react';
import {withRouter} from 'react-router';
import _ from 'lodash';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {loginUser} from '../../actions/authActions';
import {Form, Icon, Input, Button, Alert} from 'antd';

// import store from '../../store/configureStore';
// import {loginAction} from '../../actions/authActions';
// import {AuthUrls} from '../../constants/urls';
// import store from '../../store/configureStore';

const FormItem = Form.Item;

class LoginComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',

            formErrors: {},
            emailValid: false,
            passwordValid: false,
            formValid: false,
            nonFieldErrors: '',
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
        const form_data = _.pick(this.state, ['email', 'password']);
        this.props.dispatch(loginUser(form_data, this.props.history));
    };

    render() {
        return (
            <div className="section section--form section--form--login">
                <div className="card">
                    <h1 className="heading-primary u-margin-top-small">
                        Login
                    </h1>
                    <form
                        className="form login-form"
                        onSubmit={this.handleSubmit}>
                        {this.props.errorMessage && (
                            <div className="form__error">
                                <h3 className="form__error--title">Error</h3>
                                <p className="form__error--text">
                                    {this.props.errorMessage}
                                </p>
                            </div>
                        )}
                        <div className="form__group">
                            <input
                                prefix={<Icon type="user" />}
                                placeholder="email"
                                type="email"
                                name="email"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form__group">
                            <input
                                prefix={<Icon type="lock" />}
                                placeholder="password"
                                type="password"
                                name="password"
                                onChange={this.handleChange}
                            />
                        </div>
                    </form>
                    <button
                        type="primary"
                        htmltype="submit"
                        disabled={!this.state.formValid}
                        onClick={this.handleSubmit}
                        className="btn u-margin-bottom-small">
                        Log In
                    </button>
                    <div>
                        Or <Link to="/user/signup"> register now!</Link>
                        <p>
                            <Link to="/reset-password">Forgot password</Link>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {auth} = state;
    const {isAuthenticated, errorMessage} = auth;
    return {
        isAuthenticated,
        errorMessage,
    };
};

export default withRouter(connect(mapStateToProps)(LoginComponent));
