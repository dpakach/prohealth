import React from 'react';
import {List, Avatar, Button} from 'antd';
import {Link, withRouter} from 'react-router-dom';

import {deleteQueryItem} from '../../actions/queryActions';

const QueryListItemComponent = props => {
    const deleteButton = (
        <Button
            type="danger"
            onClick={e => {
                deleteQueryItem(props.item.id).then(data => {
                    props.updateQueries();
                });
            }}>
            delete
        </Button>
    );

    const editButton = (
        <Button
            type="primary"
            onClick={e => {
                props.history.push(`/query/${props.item.id}/update`)
            }}>
            edit
        </Button>
    );
    return (
        <List.Item actions={[deleteButton, editButton]}>
            <List.Item.Meta
                avatar={<Avatar src="#" />}
                title={
                    <Link to={`/query/${props.item.id}`}>
                        {props.item.title_problem}
                    </Link>
                }
                description={props.item.description}
            />
            <div>
                <h4>Created Date</h4>
                <p>{props.item.date_of_submission}</p>
            </div>
        </List.Item>
    );
};

export default withRouter(QueryListItemComponent);
