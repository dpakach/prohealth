import React from 'react';

import {Link} from 'react-router-dom';

import moment from 'moment';

const NotificationsList = props => {

    let {notifications} = props;

    const getClassName = notifications => {
        return notifications.viewed
            ? 'list-item list-item--notification'
            : 'list-item list-item--notification list-item--selected';
    };

    notifications = notifications.sort((a, b) => {
        return  moment(b.created).format('X') - moment(a.created).format('X');
    });

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
                            {moment(n.created).fromNow()}
                        </span>
                    </div>
                ))}
        </div>
    );
};

export default NotificationsList;
