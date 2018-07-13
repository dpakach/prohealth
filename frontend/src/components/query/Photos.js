import React, {Component} from 'react';
import {Upload, Button, Icon, message} from 'antd';
import axios from 'axios';
import {ROOT_URL} from '../../constants/urls';

import Lightbox from 'react-image-lightbox';

import {QueryUrls} from '../../constants/urls';

class Photos extends Component {
    state = {
        uploading: false,
        photo: null,
        uploaded_files: [],

        // for lightbox
        photoIndex: 0,
        isOpen: false,
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
        const {uploading, photoIndex, isOpen, uploaded_files} = this.state;
        const user_id = parseInt(localStorage.getItem('user_id'));
        const props = {
            beforeUpload: file => {
                this.setState(() => ({
                    photo: file,
                }));
                return false;
            },
        };
        return (
            <div>
                <p>Click the images to view them</p>
                <div className="photos">
                    <div>
                        {user_id === this.props.user.id && (
                            <div>
                                <div className="photos__input">
                                    <div className="upload-btn-wrapper">
                                        <button className="btn btn--small">
                                            browse a file
                                        </button>
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
                                {this.state.photo && (
                                    <p style={{fontSize: '.7rem'}}>
                                        {this.state.photo.name}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="photos__list">
                        {isOpen && (
                            <Lightbox
                                mainSrc={
                                    uploaded_files[photoIndex].file_related
                                }
                                nextSrc={
                                    uploaded_files[
                                        (photoIndex + 1) % uploaded_files.length
                                    ].file_related
                                }
                                prevSrc={
                                    uploaded_files[
                                        (photoIndex +
                                            uploaded_files.length -
                                            1) %
                                            uploaded_files.length
                                    ].file_related
                                }
                                onCloseRequest={() =>
                                    this.setState({isOpen: false})
                                }
                                onMovePrevRequest={() =>
                                    this.setState({
                                        photoIndex:
                                            (photoIndex +
                                                uploaded_files.length -
                                                1) %
                                            uploaded_files.length,
                                    })
                                }
                                onMoveNextRequest={() =>
                                    this.setState({
                                        photoIndex:
                                            (photoIndex + 1) %
                                            uploaded_files.length,
                                    })
                                }
                            />
                        )}

                        {this.state.uploaded_files.map(f => (
                            <img
                                key={f.id}
                                src={ROOT_URL + f.file_related}
                                alt="user's file"
                                className="photos__list__item"
                                data-lightbox="user-photos"
                                onClick={() =>
                                    this.setState({isOpen: true, photoIndex: 0})
                                }
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Photos;
