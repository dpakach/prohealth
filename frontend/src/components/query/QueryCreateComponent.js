import React, {Component} from 'react';
import {withRouter} from 'react-router';
import _ from 'lodash';
import {AuthUrls} from '../../constants/urls';

import {
    Form,
    message,
    Icon,
    Input,
    Button,
    DatePicker,
    Select,
    Upload,
    Modal,
    Alert,
    Checkbox,
} from 'antd';

// import validate from '../../utils/validate';

const FormItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input;

class QueryCreateComponent extends React.Component {
    // constructor and state initialization

    constructor(props) {
        super(props);

        this.state = {
            // form input  stuff
            title: '',
            description: '',

            // image-upload stuff
            previewVisible: false,
            previewImage: '',
            fileList: [
            ],

            formErrors: {},
            nonFieldErrors: '',
            formValid: true,
        };
    }

    // state change and management
    //
    //
    handleCancel = () => this.setState({previewVisible: false});

    handlePreview = file => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    };

    handleChange = e => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({[name]: value});
    };

    handleFileChange = ({fileList}) => this.setState({fileList});

    handleCheckbox = e => {
        console.log(e);
        this.setState({is_doctor: e.target.checked});
    };

    handleSelectChange = value => {
        this.setState({gender: value});
    };

    // form submittion
    //
    handleSubmit = event => {
        event.preventDefault();
        const form_data = _.pick(this.state, ['title', 'description']);
        console.log(form_data);
        // this.props.dispatch(signupUser(form_data, this.props.history));
    };

    render() {
        const {previewVisible, previewImage, fileList} = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div>
                <h1 className="heading-primary u-margin-top-small">
                    post query
                </h1>
                {this.state.nonFieldErrors && (
                    <div className="u-margin-bottom-small">
                        <Alert
                            message="error"
                            type="error"
                            showIcon
                            description={this.state.nonFieldErrors}
                        />
                    </div>
                )}

                <div>
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem label="Title">
                            <Input
                                placeholder="Title"
                                type="text"
                                name="title"
                                onChange={this.handleChange}
                            />
                        </FormItem>

                        <FormItem label="Title">
                            <TextArea
                                placeholder="Description"
                                name="description"
                                autosize
                                onChange={this.handleChange}
                            />
                        </FormItem>

                        <FormItem>
                            <div className="clearfix">
                                <Upload
                                    action="//jsonplaceholder.typicode.com/posts/"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={this.handlePreview}
                                    onChange={this.handleFileChange}>
                                    {fileList.length >= 3 ? null : uploadButton}
                                </Upload>
                                <Modal
                                    visible={previewVisible}
                                    footer={null}
                                    onCancel={this.handleCancel}>
                                    <img
                                        alt="example"
                                        style={{width: '100%'}}
                                        src={previewImage}
                                    />
                                </Modal>
                            </div>{' '}
                        </FormItem>

                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button">
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default QueryCreateComponent;
