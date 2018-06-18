import React from 'react';

import MyQueriesComponent from './query/MyQueriesComponent';

class DashboardPage extends React.Component {
    render() {
        return (
            <div className="section section--profile">
                <h1>Your queries</h1>
                

                <MyQueriesComponent />
            </div>
        );
    }
}

export default DashboardPage;
