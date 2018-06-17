// login form sumit
//
handleSubmit = event => {
    event.preventDefault();
    const form_data = _.pick(this.state, ['email', 'password']);
    fetch(AuthUrls.LOGIN, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(form_data),
    })
        //.then(response => this.handleErrors(response))
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw Error(
                'Some thing went wrong! Please make sure the credentials are valid',
            );
        })
        .then(data => {
            console.log(data);
            this.setState({nonFieldErrors: ''});
            localStorage.setItem('authentication', data['token']);
            localStorage.setItem('authenticated', true);
            // store.dispatch(loginAction(data['token']));
            this.props.history.push('/');
        })
        .catch(error => {
            this.setState({nonFieldErrors: error.message});
        });
};

// signup form submit
handleSubmit = event => {
    event.preventDefault();
    const form_data = _.pick(this.state, [
        'first_name',
        'last_name',
        'email',
        'password',
        'is_doctor',
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
            message.success('Signed up successfully!');
            if (this.state.asDoctor) {
                console.log('hello');
            }
            this.props.history.push('/user/login/');
        })
        .catch(error => {
            this.setState({nonFieldErrors: error.message});
        });
};

// logout api call
//
//
logout = () => {
    fetch(AuthUrls.LOGOUT, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('authentication')}`,
        },
    })
        .then(response => {
            if (response.ok) {
                message.success('successfully logged out');
                localStorage.removeItem('authentication');
                this.props.history.push('/user/login/');
                return;
            }
            throw Error(
                'Some thing went wrong! Please make sure the information is valid',
            );
        })
        .catch(error => {
            message.error('some error occured while logging out');
        });
    // this.props.dispatch(logoutAction());
};
