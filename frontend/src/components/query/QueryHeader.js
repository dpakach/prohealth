import React from 'react';

import QueryListItemComponent from './QueryListItemComponent';
import Photos from './Photos';

const QueryHeader = props => {
    const user_stats = [
        {title: 'Name', value: props.query.name_of_patient},
        {title: 'Age', value: props.query.age_of_patient},
        {title: 'Height', value: props.query.height_of_patient},
        {title: 'Weight', value: props.query.weight_of_patient},
    ];
    return (
        <div className="query-header-wrapper">
            <div className="shadow-layer">
                <div className="shadow">
                </div>
                <div className="query-header">
                    <div className="query-header__main">
                        <QueryListItemComponent
                            updateQueries={props.updateQueries}
                            key={props.query.id}
                            item={props.query}
                            loading={props.loading}
                            header={true}
                            user={props.user}
                        />
                    </div>

                    <div className="query-header__stats">
                        <h2 className="query-header__stats--title">
                            User Stats
                        </h2>
                        <div className="user-stats-list">
                            {user_stats.map(s => {
                                return (
                                    <div
                                        key={s.title}
                                        className="list-item user-stats-list__item">
                                        <div className="user-stats-list__item__title">
                                            {s.title}
                                        </div>
                                        <div className="user-stats-list__item__content">
                                            {s.value}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                {props.query.id && (
                    <Photos user={props.user} id={props.query.id} />
                )}
            </div>
        </div>
    );
};

export default QueryHeader;
