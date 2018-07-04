import React, {Component} from 'react';
import _ from 'lodash';
import {AuthUrls} from '../../constants/urls';
import {Card, message, Form, Icon, Input, Button, Select, Alert} from 'antd';
import {updateDoctorProfile} from '../../actions/authActions';

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
            description: '',
            speciality: '',

            formErrors: {},
            nonFieldErrors: '',
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

    // form submittion

    handleSubmit = event => {
        event.preventDefault();
        const form_data = _.pick(this.state, [
            'hospital',
            'qualification',
            'description',
            'speciality',
        ]);
        updateDoctorProfile(this.state.user.doctor_profile.id, form_data).then(
            data => {
                message.success('profile updated successfully!');
                this.setState({nonFieldErrors: '', formErrors: {}});
                this.props.updateUser().then(() => {
                    this.props.tabChange('user');
                });
            },
        );
    };

    componentDidMount() {
        this.props.updateUser().then(data => {
            this.setState({...data.doctor_profile, user: data});
        });
    }

    render() {
        return (
            <div className="u-margin-bottom-small">
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
                    <div className="section section--profile">
                        <form className="form" onSubmit={this.handleSubmit}>
                            <div className="form__group">
                                <label>Speciality</label>
                                <br />
                                <Select
                                    showSearch
                                    style={{width: 200}}
                                    placeholder="Speciality"
                                    name="speciality"
                                    value={this.state.speciality}
                                    onChange={this.handleSelectChange}>
                                    <Option value="neurology">Neurology</Option>
                                    <Option value="cardialogy">
                                        Cardiology
                                    </Option>
                                    <Option value="gynecology">
                                        Gynecology
                                    </Option>
                                    <Option value="genral">
                                        General Physician
                                    </Option>
                                </Select>
                            </div>

                            <div className="form__group">
                                <label>Hospital</label>
                                <br />
                                <input
                                    placeholder="Speciality"
                                    type="text"
                                    name="hospital"
                                    value={this.state.hospital}
                                    onChange={this.handleChange}
                                />
                            </div>

                            <div className="form__group">
                                <label>Bio</label>
                                <TextArea
                                    prefix={<Icon type="user" />}
                                    placeholder="Bio"
                                    value={this.state.description}
                                    autosize
                                    type="text"
                                    name="description"
                                    onChange={this.handleChange}
                                />
                            </div>

                            <div className="form__group">
                                <label>Qualification</label>
                                <input
                                    placeholder="Qualification"
                                    type="text"
                                    value={this.state.qualification}
                                    name="qualification"
                                    onChange={this.handleChange}
                                />
                            </div>

                            <div className="form__group">
                                <button
                                    type="submit"
                                    disabled={!this.state.formValid}
                                    className="btn ">
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

export default UpdateDoctorProfile;
