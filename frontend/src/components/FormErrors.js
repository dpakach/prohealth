import React from 'react';

import {Alert} from 'antd';

export const FormErrors = ({formErrors}) => (
    <div className="formErrors">
        {Object.keys(formErrors).map((fieldName, i) => {
            if (formErrors[fieldName].length > 0) {
                const message = `${fieldName}  ${formErrors[fieldName]}`
                return (
                    <Alert
                        message = {this.message}
                        type = "error"
                    />
                );
            } else {
                return '';
            }
        })}
    </div>
);
