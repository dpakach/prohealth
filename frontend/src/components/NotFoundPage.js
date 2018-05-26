import React from 'react';

import { Alert } from 'antd';


const NotFoundPage = () => (
    <div>
        <Alert
            message="404"
            type="error"
            showIcon
            description="The page you requested doesnot exists."
        />
    </div>
)

export default NotFoundPage;
