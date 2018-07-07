import React from 'react';
import {AuthUrls} from '../../constants/urls';
import {Alert, Icon, message} from 'antd';
import {GridLoader} from 'react-spinners';
import {Link} from 'react-router-dom';

class ActivateAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: this.props.match.params.code,
            success: false,
            loading: true,
        };
    }

    // form submittion

    componentDidMount() {
        this.setState({loading: true, success: false});
        fetch(AuthUrls.ACTIVATE_ACCOUNT(this.state.code), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.ok) {
                    // console.log(response);
                    message.success('Account successfully Activated!');
                    this.setState({loading: false, success: true});
                    return response.json();
                }
                throw Error(
                    'Some thing went wrong! Please make sure the information is valid',
                );
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    nonFieldErrors: error.message,
                    loading: false,
                    success: false,
                });
            });
    }
    render() {
        return (
            <div>
                <div className="loading-icon">
                    <GridLoader
                        color={'#3772ff'}
                        loading={this.state.loading}
                    />
                </div>

                {this.state.loading && (
                    <div style={{testAlign: 'center'}}>
                        <h1 className="heading-primary">
                            Activating your account
                        </h1>
                        <p style={{testAlign: 'center'}}>
                            Please wait a minute while we activate your account
                        </p>
                    </div>
                )}

                {!this.state.loading &&
                    this.state.success && (
                        <div className="section section--form section--form--login">
                            <div className="card">
                                <h1 className="heading-secondary">
                                    Account successfully activated
                                </h1>
                                <p style={{textAlign: 'center'}}>
                                    your account was successfully activated. to
                                    continue please{' '}
                                    <Link className="btn" to="/user/login">
                                        LOGIN
                                    </Link>
                                </p>
                            </div>
                        </div>
                    )}

                {!this.state.loading &&
                    !this.state.success && (
                        <div style={{width: '40rem'}} className="section">
                            <div className="form__error">
                                <h3 className="form__error--title">Error</h3>
                                <p className="form__error--text">
                                    The account activation link you used is
                                    invalid!
                                    <br />
                                    Please make sure you are using the correct
                                    link provided in the email
                                </p>
                            </div>
                        </div>
                    )}
            </div>
        );
    }
}

export default ActivateAccount;
