import React from 'react';
import {message} from 'antd';
import axios from 'axios';

import {AuthUrls} from '../../constants/urls';

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
        const user_id = this.props.user
            ? this.props.user.user_profile.id
            : null;
        const url = AuthUrls.USER_PROFILE + user_id;

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
                if (response.statusText === 'OK') {
                    message.success('upload successfully.');
                    this.props.updateUser();
                }
                this.setState({
                    uploading: false,
                });
            })
            .then(() => {
                this.props.tabChange('user');
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
