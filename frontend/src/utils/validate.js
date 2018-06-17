export const validate = (fieldName, value) => {
    switch (fieldName) {
        case 'email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
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
};
