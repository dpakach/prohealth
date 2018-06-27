import React from 'react';

import {deleteQueryItem} from '../../actions/queryActions';
import {withRouter} from 'react-router-dom';

const Actions = props => {
    const deleteQuery = () => {
        deleteQueryItem(props.id).then(() => {
            props.history.push('/query');
        });
    };

    const editQuery = () => {
        props.history.push(`/query/${props.id}/update`);
    };

    return (
        <div>
            <button
                className="action__button btn btn--small"
                onClick={props.resolve}>
                Resolve
            </button>
            <button
                className="action__button btn btn--default btn--small"
                onClick={editQuery}>
                Edit
            </button>
            <button
                className="action__button btn btn--danger btn--small"
                onClick={deleteQuery}>
                Delete
            </button>
        </div>
    );
};

export default withRouter(Actions);
