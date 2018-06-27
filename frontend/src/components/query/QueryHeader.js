import React from 'react';
import {Icon} from 'antd';

import QueryListItemComponent from './QueryListItemComponent';

const QueryHeader = props => {
    // console.log(props);
    const user_stats = [
        {title: 'Name', value: props.query.name_of_patient},
        {title: 'Age', value: props.query.age_of_patient},
        {title: 'Height', value: props.query.height_of_patient},
        {title: 'Weight', value: props.query.weight_of_patient},
    ];
    return (
        <div>
            {props.loading && (
                <div style={{width: '100%', textAlign: 'center'}}>
                    <Icon style={{fontSize: '5rem'}} type="loading" />
                </div>
            )}
            {!props.loading && (
                <div className="query-header">
                    <div className="query-header__main">
                        <QueryListItemComponent
                            updateQueries={props.updateQueries}
                            key={props.query.id}
                            item={props.query}
                            loading={props.loading}
                        />
                    </div>

                    <div className="query-header__stats">
                        <h2 className="query-header__stats--title">User Stats</h2>
                        <div className="user-stats-list">
                            {user_stats.map(s => {
                                return (
                                    <div key={s.title} className="list-item user-stats-list__item">
                                        <div className="list-item__title">
                                            {s.title}
                                        </div>

                                        <div className="list-item__content">
                                            {s.value}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QueryHeader;
