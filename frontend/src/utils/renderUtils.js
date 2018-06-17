import React from 'react';
import {Alert} from 'antd';

export const renderError = errorMessages => {
    const error = "";
    if (errorMessages) {
        // error = errorMessages.keys.map(key => {
        //     return errorMessages[key];
        // });
    }
    if (error) {
        return (
            <div className="section section--profile u-margin-top-big">
                <Alert
                    message="Error"
                    type="error"
                    description={error}
                />
            </div>
        );
    }
};
