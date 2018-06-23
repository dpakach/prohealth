import React from 'react';
import _ from 'lodash';

import {createQuery} from '../../actions/queryActions';

import {
    Form,
    message,
    Icon,
    Input,
    Button,
    Select,
    Upload,
    Modal,
    Alert,
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
            title_problem: '',
            description: '',
            name_of_patient: '',
            age_of_patient: '',
            weight_of_patient: '',
            height_of_patient: '',
            tag: '',

            // image-upload stuff
            previewVisible: false,
            previewImage: '',
            fileList: [],

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
        this.setState({tag: value});
    };

    // form submittion
    //
    handleSubmit = event => {
        event.preventDefault();
        const form_data = _.pick(this.state, [
            'title_problem',
            'description',
            'name_of_patient',
            'age_of_patient',
            'weight_of_patient',
            'height_of_patient',
            'tag',
        ]);
        createQuery(form_data)
            .then(data => {
                const id = data.id;
                this.props.history.push('/query/' + id);
            })
            .catch(e => {
                message.error(e.message);
            });
    };

    componentDidMount() {
        return;
    }

    render() {
        const {previewVisible, previewImage, fileList} = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="section section--form u-margin-top-small">
                    <h1>Ask A Question</h1>
                {/*
                <h1 className="heading-secondary u-margin-top-small">
                    {this.props.type == 'create' && <p>Ask A Question</p>}
                    {this.props.type == 'edit' && <p>Update your question</p>}
                </h1>
                        * */}
                <div>
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

                    <Form onSubmit={this.handleSubmit}>
                        <FormItem>
                            <label>Title</label>
                            <Input
                                placeholder="Title"
                                type="text"
                                name="title_problem"
                                onChange={this.handleChange}
                            />
                        </FormItem>

                        <FormItem>
                            <label>Description</label>
                            <TextArea
                                placeholder="Description"
                                name="description"
                                autosize
                                onChange={this.handleChange}
                            />
                        </FormItem>

                        <FormItem>
                            <label>Related</label>
                            <br />
                            <Select
                                showSearch
                                style={{width: 200}}
                                placeholder="Related"
                                onChange={this.handleSelectChange}>
                                <Option value="S">Skin</Option>
                                <Option value="E">ent</Option>
                                <Option value="P">Physician</Option>
                            </Select>
                        </FormItem>
                        <h3>Patient Stats</h3>

                        <FormItem>
                            <label>Name of Patient</label>
                            <Input
                                placeholder="Name of Patient"
                                name="name_of_patient"
                                onChange={this.handleChange}
                            />
                        </FormItem>

                        <FormItem>
                            <label>Age Of Patient</label>
                            <Input
                                placeholder="Age of Patient"
                                name="age_of_patient"
                                type="number"
                                onChange={this.handleChange}
                            />
                        </FormItem>
                        <FormItem>
                            <label>Weight of Patient</label>
                            <Input
                                placeholder="Weight of Patient"
                                name="weight_of_patient"
                                type="number"
                                onChange={this.handleChange}
                            />
                        </FormItem>
                        <FormItem>
                            <label>Height of Patient</label>
                            <Input
                                placeholder="Height of Patient"
                                name="height_of_patient"
                                type="number"
                                onChange={this.handleChange}
                            />
                        </FormItem>
                        <FormItem>
                            <label>Attach a photo</label>
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
