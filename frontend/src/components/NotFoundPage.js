import React from 'react';

import {Alert} from 'antd';

const NotFoundPage = () => (
  <div className="section section--profile u-margin-top-big">
    <Alert
      message="404"
      type="error"
      showIcon
      description="The page you requested does not exists."
    />
  </div>
);

export default NotFoundPage;
