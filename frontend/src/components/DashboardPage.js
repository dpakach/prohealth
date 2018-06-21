import React from 'react';

import MyQueriesComponent from './query/MyQueriesComponent';

class DashboardPage extends React.Component {
    render() {
        return (
            <div className="section section--profile">
                <MyQueriesComponent />
            </div>
        );
    }
}

export default DashboardPage;
