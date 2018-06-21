import React from 'react';

import {Button} from 'antd';
import {deleteQueryItem} from '../../actions/queryActions';

const Actions = props => {
    const deleteQuery = () => {
            deleteQueryItem(props.id) 
                .then(() => {
                    props.history.push('/query')
                })
    }
    return (
        <div>
            <Button type="primary" className="action__button" onClick={props.resolve}>
                Resolve
            </Button>
            <Button type="default" className="action__button" onClick={props.edit}>
                Edit
            </Button>
            <Button type="danger" className="action__button" onClick={deleteQuery}>
                Delete
            </Button>
        </div>
    );
};

export default Actions;
