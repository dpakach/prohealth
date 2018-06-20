import React from 'react';

import {Button} from 'antd';

const Actions = props => {
    return (
        <div>
            <Button type="primary" className="action__button" onClick={props.resolve}>
                Resolve
            </Button>
            <Button type="default" className="action__button" onClick={props.edit}>
                Edit
            </Button>
            <Button type="danger" className="action__button" onClick={props.delete}>
                Delete
            </Button>
        </div>
    );
};

export default Actions;
