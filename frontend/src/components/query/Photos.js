import React, {Component} from 'react';
import {Upload, Button, Icon, message} from 'antd';
import axios from 'axios';
import {ROOT_URL} from '../../constants/urls';

import {QueryUrls} from '../../constants/urls';

class Photos extends Component {
    state = {
        uploading: false,
        photo: null,
        uploaded_files: [],
    };

    handleUpload = () => {
        this.setState({
            uploading: true,
        });

        const formData = new FormData();

        formData.append(
            'file_related',
            this.state.photo,
            this.state.photo.name,
        );

        axios({
            method: 'post',
            url: QueryUrls.FILES(this.props.id),
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`,
            },
            data: formData,
        })
            .then(response => {
                console.log(response);
                if (response.statusText === 'OK') {
                    message.success('upload successfully.');
                }
                this.setState({
                    uploading: false,
                    photo: null,
                });
                this.updateFiles();
            })
            .catch(e => {
                message.error('upload failed.');
                this.setState({
                    uploading: false,
                });
            });
    };

    handleChange = e => {
        this.setState({photo: e.target.files[0]});
    };

    updateFiles = () => {
        fetch(QueryUrls.FILES(this.props.id), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`,
            },
        })
            .then(response => response.json())
            .then(data => this.setState({uploaded_files: data}));
    };

    getUploadClass = () => {
        return this.state.photo === null
            ? 'photos__input__button btn btn--default btn--small btn--disabled'
            : 'photos__input__button btn btn--default btn--small';
    };

    componentDidMount() {
        if (this.props.id) {
            this.updateFiles();
        }
    }

    render() {
        const {uploading} = this.state;
        const props = {
            beforeUpload: file => {
                this.setState(() => ({
                    photo: file,
                }));
                return false;
            },
        };
        return (
            <div className="photos">
                <div className="photos__input">
                    <div className="upload-btn-wrapper">
                        <button className="btn btn--small">browse a file</button>
                        <p style={{fontSize: '.7rem', width: '15rem'}}>{this.state.photo && this.state.photo.name}</p>
                        <input
                            type="file"
                            onChange={this.handleChange}
                            className="photos__input__field btn btn--default btn--small"
                        />
                    </div>
                    <button
                        className={this.getUploadClass()}
                        onClick={this.handleUpload}>
                        upload
                    </button>
                </div>

                <div className="photos__list">
                    {this.state.uploaded_files.map(f => (
                        <img
                            key={f.id}
                            src={ROOT_URL + f.file_related}
                            alt="user's file"
                            className="photos__list__item"
                            data-lightbox="user-photos"
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default Photos;
