import React from 'react';

import MyQueriesComponent from './query/MyQueriesComponent';

class DashboardPage extends React.Component {
    render() {
        return (
            <div className="section section--profile">
                <h1 className="heading-primary u-margin-top-big">DashBoard</h1>

                <MyQueriesComponent />
            </div>
        );
    }
}

export default DashboardPage;
