import React, {Component} from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import _ from 'lodash';
import {AuthUrls} from '../../constants/urls';
import {
    Card,
    message,
    Form,
    Icon,
    Input,
    Button,
    DatePicker,
    Select,
    Alert,
} from 'antd';

//import store from '../../store/configureStore';
// import validate from '../../utils/validate';

const FormItem = Form.Item;
const Option = Select.Option;
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
    handleSelectChange = value => {
        this.setState({gender: value});
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
        fetch(AuthUrls.USERS + this.state.user.id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(form_data),
        })
            .then(response => response.json().then(data => ({data, response})))
            .then(({data, response}) => {
                if (response.ok) {
                    this.setState({nonFieldErrors: '', formErrors: {}});
                    localStorage.setItem('user', JSON.stringify(data));
                    this.props.tabChange('user');
                    message.success('profile updated successfully');
                } else {
                    this.setState({formErrors: data});
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({nonFieldErrors: error.message});
            });
    };

    componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));
        this.setState({user, ...user,});
    }

    render() {
        return (
            <div>
                {this.props.phase === 'starting' && (
                    <p>update your profile before you start!!</p>
                )}
                <Card
                    title="Update User Profile"
                    className="u-margin-bottom-small"
                    bordered={false}
                    style={{width: 400}}>
                    <div>
                        {!true && (
                            <div className="u-margin-bottom-small">
                                <Alert
                                    message="error"
                                    type="error"
                                    showIcon
                                    description={'error message'}
                                />
                            </div>
                        )}
                        <div className="section section--form">
                            <Form
                                className="login-form"
                                onSubmit={this.handleSubmit}>
                                <FormItem>
                                    <label>First Name</label>
                                    <Input
                                        prefix={<Icon type="user" />}
                                        placeholder="First Name"
                                        type="text"
                                        name="first_name"
                                        onChange={this.handleChange}
                                        value={this.state.first_name}
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
                                        value={this.state.last_name}
                                    />
                                </FormItem>

                                {this.state.formErrors.date_of_birth && (
                                    <ul>
                                        {this.state.formErrors.date_of_birth.map(
                                            e => (
                                                <li key={Math.random()}>{e}</li>
                                            ),
                                        )}
                                    </ul>
                                )}
                                <FormItem>
                                    <label>Date Of Birth</label>
                                    <br />
                                    <DatePicker
                                        defaultValue={moment(
                                            moment(this.state.date_of_birth),
                                            dateFormat,
                                        )}
                                        onChange={this.onDateChange}
                                        format={dateFormat}
                                    />
                                </FormItem>

                                <FormItem>
                                    <label>Gender</label>
                                    <br />
                                    <Select
                                        showSearch
                                        style={{width: 200}}
                                        placeholder="Gender"
                                        name="gender"
                                        value={this.state.gender}
                                        onChange={this.handleSelectChange}>
                                        <Option value="M">Male</Option>
                                        <Option value="F">Female</Option>
                                    </Select>
                                </FormItem>

                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    disabled={!this.state.formValid}
                                    className="login-form-button">
                                    Update
                                </Button>
                            </Form>
                        </div>
                    </div>
                </Card>
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
