import React from 'react';
import {Upload, Button, Icon, message} from 'antd';
import axios from 'axios';

import {AuthUrls} from '../../constants/urls';

const user = JSON.parse(localStorage.getItem('user'));
const user_id = user ? user.user_profile.id : null;

const url = AuthUrls.USER_PROFILE + user_id;

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
                if (response.ok) {
                    message.success('upload successfully.');
                }
                console.log(response);
        this.setState({
            uploading: false,
        });
            })
            .catch(e => {
                message.error('upload failed.');
            });
    };

    render() {
        const {uploading} = this.state;
        const props = {
            beforeUpload: file => {
                this.setState(() => ({
                    profile_photo: file
                }));
                return false;
            },
        };

        return (
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
        );
    }
}

export default UploadProfilePic;

{
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
        */
}
