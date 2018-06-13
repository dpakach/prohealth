import React, {Component} from 'react';
import _ from 'lodash';
import {AuthUrls} from '../../constants/urls';
import {Card, Form, Icon, Input, Button, DatePicker, Select, Alert} from 'antd';
// import validate from '../../utils/validate';

const FormItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input;

class UpdateDoctorProfile extends Component {
    // constructor and state initialization

    constructor(props) {
        super(props);

        this.state = {
            user: {},

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
        this.setState({speciality: value});
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

        fetch(AuthUrls.USER_PROFILE + this.state.user.doctor_profile.id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
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

    componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log(user);
        this.setState({
            user: user,
            hospital: user.doctor_profile.hospital,
            qualification: user.doctor_profile.qualification,
            bio: user.doctor_profile.bio,
            speciality: user.doctor_profile.speciality,
        });
    }

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
                                <label>Speciality</label>
                                <br />
                                <Select
                                    showSearch
                                    style={{width: 200}}
                                    placeholder="Speciality"
                                    name="speciality"
                                    value={this.state.speciality}
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
                                    value={this.state.bio}
                                    autosize
                                    type="text"
                                    name="bio"
                                    onChange={this.handleChange}
                                />
                            </FormItem>

                            <FormItem>
                                <label>Qualification</label>
                                <Input
                                    placeholder="Qualification"
                                    type="text"
                                    value={this.state.qualification}
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

export default UpdateDoctorProfile;
