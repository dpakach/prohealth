import React from 'react';

import {createQuery} from '../../actions/queryActions';

import {
    message,
    Select,
} from 'antd';

// import validate from '../../utils/validate';

const Option = Select.Option;

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
            file_related: null,

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

    handleFileChange = event => {
        console.log(event.target.files[0]);
        this.setState({file_related: event.target.files[0]});
    };

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
        const form_data = new FormData();
        form_data.append('file_related', this.state.file_related, this.state.file_related.name);
        form_data.append('title_problem', this.state.title_problem);
        form_data.append('description', this.state.description);
        form_data.append('name_of_patient', this.state.name_of_patient);
        form_data.append('age_of_patient', this.state.age_of_patient);
        form_data.append('weight_of_patient', this.state.weight_of_patient);
        form_data.append('height_of_patient', this.state.height_of_patient);
        form_data.append('tag', this.state.tag);
        console.log(form_data.entries());
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
        return (
            <div className="section section--form section--form--wide">
                <div className="card">
                    <h1 className="heading-primary u-margin-top-small">
                        Ask A Question
                    </h1>
                    <form className="form" onSubmit={this.handleSubmit}>
                        {this.state.nonFieldErrors && (
                            <div className="form__error">
                                <h3 className="form__error--title">Error</h3>
                                <p className="form__error--text">
                                    {this.props.errorMessage}
                                </p>
                            </div>
                        )}
                        <div className="form__group">
                            <label>Title</label>
                            <input
                                placeholder="Title"
                                type="text"
                                name="title_problem"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form__group">
                            <label>Description</label>
                            <textarea
                                placeholder="Description"
                                name="description"
                                className="form__description"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form__group">
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
                            <h3>Patient Stats</h3>
                        </div>
                        <div className="form__group">
                            <label>Name of Patient</label>
                            <input
                                placeholder="Name of Patient"
                                name="name_of_patient"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form__group">
                            <label>Age Of Patient</label>
                            <input
                                placeholder="Age of Patient"
                                name="age_of_patient"
                                type="number"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form__group">
                            <label>Weight of Patient</label>
                            <input
                                placeholder="Weight of Patient"
                                name="weight_of_patient"
                                type="number"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form__group">
                            <label>Height of Patient</label>
                            <input
                                placeholder="Height of Patient"
                                name="height_of_patient"
                                type="number"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form__group">
                            <label>Attach a photo</label>

                            <input
                                type="file"
                                onChange={this.handleFileChange}
                            />

                            {/*
                            <div className="clearfix">
                                <Upload
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
                                    */}
                        </div>
                    </form>
                    <button type="primary" className="btn">
                        Submit
                    </button>
                </div>
            </div>
        );
    }
}

export default QueryCreateComponent;
