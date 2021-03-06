import React, {Component} from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import _ from 'lodash';
import {updateUserProfile} from '../../actions/authActions';
import {Icon, DatePicker} from 'antd';

//import store from '../../store/configureStore';
// import validate from '../../utils/validate';

const dateFormat = 'YYYY-MM-DD';

class UpdateUserProfile extends Component {
    // constructor and state initialization

    constructor(props) {
        super(props);

        this.state = {
            user: {},
            first_name: '',
            last_name: '',
            date_of_birth: moment().format(dateFormat),
            gender: '',
            photo_id: null,
            profile_photo: null,

            formErrors: {},
            nonFieldErrors: '',
            emailValid: false,
            passwordValid: false,
            formValid: true,
        };
    }

    // state change and management
    //
    handleSelectChange = event => {
        this.setState({gender: event.target.value});
    };

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    changeDate = () => {
        return moment(this.state.date_of_birth, 'YYYY/MM/DD');
    };

    onDateChange = date => {
        // console.log(date.format('YYYY-MM-DD'));
        // console.log(date);
        this.setState({date_of_birth: date.format(dateFormat)});
    };

    onFileChange = event => {
        const data = new FormData();
        data.append('file', event.target.files[0]);
        data.append('name', 'some value user types');
        data.append('description', 'some value user types');
    };

    // form submittion
    handleSubmit = event => {
        event.preventDefault();
        const form_data = _.pick(this.state, [
            'first_name',
            'last_name',
            'date_of_birth',
            'gender',
            'profile_photo',
            'photo_id',
        ]);

        updateUserProfile(this.state.user.id, form_data)
            .then(data => {
                this.setState({nonFieldErrors: '', formErrors: {}});
                this.props.updateUser().then(() => {
                    this.props.tabChange('user');
                })
            })
            .catch(error => {
                console.log(error);
                this.setState({nonFieldErrors: error.message});
            });
    };

    componentDidMount() {
        this.props.updateUser().then(data => {
            this.setState({user: data, ...data});
        });
    }

    render() {
        return (
            <div>
                {this.props.phase === 'starting' && (
                    <p>update your profile before you start!!</p>
                )}
                <div>
                    {!true && (
                        <div className="form__error">
                            <h3 className="form__error--title">Error</h3>
                            <p className="form__error--text">
                                There was a error and it can't be resolved
                            </p>
                        </div>
                    )}
                    <div className="section section--form">
                        <form className="form" onSubmit={this.handleSubmit}>
                            <div className="form__group">
                                <label>First Name</label>

                                <input
                                    prefix={<Icon type="user" />}
                                    placeholder="First Name"
                                    type="text"
                                    name="first_name"
                                    onChange={this.handleChange}
                                    value={this.state.first_name}
                                />
                            </div>
                            <div className="form__group">
                                <label>Last Name</label>
                                <input
                                    prefix={<Icon type="user" />}
                                    placeholder="Last Name"
                                    type="text"
                                    name="last_name"
                                    onChange={this.handleChange}
                                    value={this.state.last_name}
                                />
                            </div>

                            <div className="form__group">
                                {this.state.formErrors.date_of_birth && (
                                    <ul>
                                        {this.state.formErrors.date_of_birth.map(
                                            e => (
                                                <li key={Math.random()}>{e}</li>
                                            ),
                                        )}
                                    </ul>
                                )}
                                <label>Date Of Birth</label>
                                <DatePicker
                                    defaultValue={moment(
                                        moment(this.state.date_of_birth),
                                        dateFormat,
                                    )}
                                    onChange={this.onDateChange}
                                    format={dateFormat}
                                />
                            </div>

                            <div className="form__group">
                                <label>Gender</label>
                                <select
                                    placeholder="Gender"
                                    name="gender"
                                    type="select"
                                    className="form__input"
                                    value={this.state.gender || ''}
                                    onChange={this.handleSelectChange}>
                                    <option className="select__item" value="M">
                                        Male
                                    </option>
                                    <option className="select__item" value="F">
                                        Female
                                    </option>
                                </select>
                            </div>

                            <div className="form__group">
                                <button
                                    type="submit"
                                    disabled={!this.state.formValid}
                                    className="btn">
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {auth} = state;
    const {user} = auth;
    return {
        user,
    };
};

export default connect(mapStateToProps)(UpdateUserProfile);
