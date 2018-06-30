import React from 'react';
import {Link, withRouter} from 'react-router-dom';

import {deleteQueryItem} from '../../actions/queryActions';

const QueryListItemComponent = props => {
    const deleteButton = (
        <div
            className="list-item__action--icon"
            onClick={e => {
                deleteQueryItem(props.item.id).then(data => {
                    props.updateQueries();
                });
            }}>
            <i className=" material-icons">delete</i>
        </div>
    );

    const editButton = (
        <div
            className="list-item__action--icon"
            onClick={e => {
                props.history.push(`/query/${props.item.id}/update`);
            }}>
            <i className=" material-icons">edit</i>
        </div>
    );

    const detailsButton = (
        <div className="list-item__action--icon">
            <Link to={`/query/${props.item.id}`}>
                <i className=" material-icons">more</i>
            </Link>
        </div>
    );

    return (
        <div>
            <div className="list-item query-list__item">
                <div className="list-item__title">
                    <Link to={`/query/${props.item.id}`}>
                        {props.item.title_problem}
                    </Link>
                </div>

                <div className="list-item__content">
                    {props.item.description}
                    <div>
                        Adipisicing voluptatibus maxime praesentium eum sequi.
                        Voluptatibus sunt cum provident nisi iure Amet autem ut
                        nulla enim iste? Iste perspiciatis quod ipsum et amet
                        Aliquid numquam id dolorem recusandae expedita?
                    </div>
                    <h4>Posted by</h4>

                    <h4>Created Date</h4>
                    <p>{props.item.date_of_submission}</p>
                </div>

                {!props.header && (
                    <div className="list-item__action">
                        {detailsButton}
                        {editButton}
                        {deleteButton}
                    </div>
                )}
            </div>
        </div>
    );
};

export default withRouter(QueryListItemComponent);
