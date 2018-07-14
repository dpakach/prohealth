import React from 'react';

import {Link} from 'react-router-dom';

const MessagesList = props => {

    const {notifications} = props;

    const getClassName = notifications => {
        return notifications.viewed
            ? 'list-item list-item--notification'
            : 'list-item list-item--notification list-item--selected';
    };
    return (
        <div className="window__list">
            {notifications &&
                notifications.map(n => (
                    <div className={getClassName(n)} key={n.id}>
                        <div className="list-item__title">{n.title}</div>

                        <div className="list-item__content">{n.message}</div>
                        <Link to={`/query/${n.query}`}>view details</Link>
                        <span
                            style={{
                                float: 'right',
                            }}>
                            {n.created_at}
                        </span>
                    </div>
                ))}
        </div>
    );
};

export default MessagesList;
