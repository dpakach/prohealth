import React from 'react';
import {Upload, Button, Icon, message} from 'antd';
import axios from 'axios';

import {AuthUrls} from '../../constants/urls';

const user = JSON.parse(localStorage.getItem('user'));
const user_id = user ? user.user_profile.id : null;

const url = AuthUrls.USER_PROFILE + user_id;
console.log(url)

class UploadProfilePic extends React.Component {
    state = {
        uploading: false,
        profile_photo: null,
    };

    handleUpload = () => {
        this.setState({
            uploading: true,
        });

        const formData = new FormData();

        formData.append(
            'profile_photo',
            this.state.profile_photo,
            this.state.profile_photo.name,
        );

        axios({
            method: 'patch',
            url,
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
                });
            })
            .catch(e => {
                message.error('upload failed.');
                this.setState({
                    uploading: false,
                });
            });
    };

    handleChange = e => {
        this.setState({profile_photo: e.target.files[0]});
    };
    getUploadClass = () => {
        return this.state.photo === null
            ? 'photos__input__button btn btn--default btn--small btn--disabled'
            : 'photos__input__button btn btn--default btn--small';
    };

    render() {
        const {uploading} = this.state;
        const props = {
            beforeUpload: file => {
                this.setState(() => ({
                    profile_photo: file,
                }));
                return false;
            },
        };

        return (
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
                {this.state.profile_photo && (
                    <p style={{fontSize: '.7rem'}}>
                        {this.state.profile_photo.name}
                    </p>
                )}
            </div>
        );
    }
}

export default UploadProfilePic;

/*
import React from 'react';
import {Upload, message, Button, Icon, Input} from 'antd';
import axios from 'axios';
import {AuthUrls} from '../../constants/urls';

const user_id = JSON.parse(localStorage.getItem('user')).user_profile.id;
const url = AuthUrls.USER_PROFILE + user_id;

class UploadProfilePic extends React.Component {
    state = {profile_photo: null};

    fileChangedHandler = event => {
        this.setState({profile_photo: event.target.files[0]});
    };

    uploadHandler = () => {
        const formData = new FormData()
        formData.append('profile_photo', this.state.profile_photo, this.state.profile_photo.name)
        axios({
            method: 'patch',
            url,
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`
            },
            data: formData,
        })
            .then(response => {
                console.log(response)
            })
            .catch(e => console.log(e));
    };
    render() {
        return (
            <div>
                <Input type="file" onChange={this.fileChangedHandler} />
                <Button onClick={this.uploadHandler}>Upload!</Button>
            </div>
        );
    }
}

export default UploadProfilePic;


            <div>
                <Upload {...props}>
                    <Button>
                        <Icon type="upload" /> Select File
                    </Button>
                </Upload>
                <Button
                    className="upload-demo-start"
                    type="primary"
                    onClick={this.handleUpload}
                    disabled={this.state.profile_photo === null}
                    loading={uploading}>
                    {uploading ? 'Uploading' : 'Start Upload'}
                </Button>
            </div>


        */
