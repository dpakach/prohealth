import React from 'react';

import {
    deleteQueryItem,
    resolveQuery as resolve,
    takeQuery as take,
    takeQuery,
} from '../../actions/queryActions';
import {withRouter} from 'react-router-dom';

const Actions = props => {
    const is_doctor = localStorage.getItem('is_doctor') === 'true';
    const user_id = parseInt(localStorage.getItem('user_id'));

    const deleteQuery = () => {
        deleteQueryItem(props.query.id).then(() => {
            props.history.push('/query');
        });
    };

    const resolveQuery = () => {
        resolve(props.query.id).then(() => {
            props.updateQuery();
        });
    };

    const takeQuery = () => {
        take(props.query.id).then(() => {
            props.updateQuery();
        });
    };

    const editQuery = () => {
        props.history.push(`/query/${props.id}/update`);
    };

    return (
        <div>
            {props.query.resolved && (
                <div style={{paddingLeft: '.5rem'}} className="prescription">
                    <p>this query is already resolved</p>
                </div>
            )}

            {props.query.taken &&
                !props.query.resolved &&
                props.doctor && (
                    <div
                        style={{paddingLeft: '.5rem'}}
                        className="prescription">
                        <p>
                            Your case is being reviewed by Dr.{' '}
                            {props.doctor.first_name} {props.doctor.last_name}
                        </p>
                    </div>
                )}
            {!props.query.resolved &&
                user_id === props.user.id && (
                    <div>
                        <button
                            className="action__button btn btn--small"
                            onClick={resolveQuery}>
                            Resolve
                        </button>
                        <button
                            className="action__button btn btn--default btn--small"
                            onClick={editQuery}>
                            Edit
                        </button>
                    </div>
                )}

            {user_id === props.user.id && (
                <button
                    className="action__button btn btn--danger btn--small"
                    onClick={deleteQuery}>
                    Delete
                </button>
            )}

            {!props.query.taken &&
                user_id !== props.user.id &&
                !props.query.resolved &&
                is_doctor && (
                    <button
                        className="action__button btn btn--small"
                        onClick={takeQuery}>
                        Take
                    </button>
                )}
            {}
        </div>
    );
};

export default withRouter(Actions);
