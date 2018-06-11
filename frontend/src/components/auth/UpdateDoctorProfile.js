import React, {Component} from 'react';
import _ from 'lodash';
import {AuthUrls} from '../../constants/urls';
import {Card, Form, Icon, Input, Button, DatePicker, Select, Alert} from 'antd';
// import validate from '../../utils/validate';

const FormItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input;

class UpdateUserProfile extends Component {
    // constructor and state initialization

    constructor(props) {
        super(props);

        this.state = {
            hospital: '',
            qualification: '',
            bio: '',
            speciality: '',

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

    onFileChange = event => {
        const data = new FormData();
        data.append('file', event.target.files[0]);
        data.append('name', 'some value user types');
        data.append('description', 'some value user types');
        // '/files' is your node.js route that triggers our middleware
        // axios.post('/files', data).then(response => {
        //     console.log(response); // do something with the response
        // });
    };

    // form submittion

    handleSubmit = event => {
        event.preventDefault();
        const form_data = _.pick(this.state, [
            'hospital',
            'qualification',
            'bio',
            'speciality',
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

        // fetch(AuthUrls.SIGNUP, {
        //     method: 'POST',
        //     headers: {
        //         'Content Type': 'application/json',
        //     },
        //     body: JSON.stringify(form_data),
        // })
        //     .then(res => {
        //         console.log(res);
        //         return res.json();
        //     })
        //     .then(data => {
        //         console.log(data);
        //     });
    };

    render() {
        return (
            <Card
                title="Update Doctor Profile"
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
                                <label>Name</label>
                                <Input
                                    prefix={<Icon type="user" />}
                                    placeholder="First Name"
                                    type="text"
                                    name="name"
                                    onChange={this.handleChange}
                                />
                            </FormItem>

                            <FormItem>
                                <label>Speciality</label>
                                <br />
                                <Select
                                    showSearch
                                    style={{width: 200}}
                                    placeholder="Speciality"
                                    name="speciality"
                                    onChange={this.handleSelectChange}>
                                    <Option value="M">Male</Option>
                                    <Option value="F">Female</Option>
                                </Select>
                            </FormItem>

                            <FormItem>
                                <label>Bio</label>
                                <TextArea
                                    prefix={<Icon type="user" />}
                                    placeholder="Bio"
                                    autosize
                                    type="text"
                                    name="bio"
                                    onChange={this.handleChange}
                                />
                            </FormItem>
                            <FormItem>
                                <label>Qualification</label>
                                <TextArea
                                    prefix={<Icon type="user" />}
                                    placeholder="Bio"
                                    type="text"
                                    name="qualification"
                                    onChange={this.handleChange}
                                />
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
