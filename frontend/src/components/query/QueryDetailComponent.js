import React from 'react';
import QueryHeader from './QueryHeader';
import Chat from './Chat';

const QueryDetailComponent = props => {
    return (
        <div>
            <div className="header">
                <QueryHeader />
            </div>
            <Chat />
        </div>
    );
};

export default QueryDetailComponent;
