import React from 'react';

import {Button} from 'antd';
import {deleteQueryItem} from '../../actions/queryActions';
import {withRouter} from 'react-router-dom';

const Actions = props => {
    const deleteQuery = () => {
            deleteQueryItem(props.id) 
                .then(() => {
                    props.history.push('/query')
                })
    }

    const editQuery = () => {
        props.history.push(`/query/${props.id}/update`);
    }

    return (
        <div>
            <Button type="primary" className="action__button" onClick={props.resolve}>
                Resolve
            </Button>
            <Button type="default" className="action__button" onClick={editQuery}>
                Edit
            </Button>
            <Button type="danger" className="action__button" onClick={deleteQuery}>
                Delete
            </Button>
        </div>
    );
};

export default withRouter(Actions);
