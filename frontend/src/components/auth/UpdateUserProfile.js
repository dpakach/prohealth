import React, {Component} from 'react';
import _ from 'lodash';
import {AuthUrls} from '../../constants/urls';
import {Card, Form, Icon, Input, Button, DatePicker, Select, Alert} from 'antd';
// import validate from '../../utils/validate';

const FormItem = Form.Item;
const Option = Select.Option;

class UpdateUserProfile extends Component {
    // constructor and state initialization

    constructor(props) {
        super(props);

        this.state = {
            first_name: '',
            last_name: '',
            date_of_birth: '',
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

    onDateChange = (date, dateString) => {
        this.setState({date_of_birth: dateString});
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
    };

    render() {
        return (
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
        );
    }
}

export default UpdateUserProfile;
