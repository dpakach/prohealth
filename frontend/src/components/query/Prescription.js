import React from 'react';

import {deleteMedicine} from '../../actions/queryActions';

const Prescription = props => {
    const deleteButton = id => {
        // TODO: change content based on doctor status
        if (props.is_doctor) {
            return (
                <a
                    onClick={e => {
                        deleteMedicine(props.id, id).then(() => {
                            props.updatePescription();
                        });
                    }}>
                    <i className=" material-icons">delete</i>
                </a>
            );
        } else {
            return;
        }
    };

    const user_id = parseInt(localStorage.getItem('user_id'), 10);
    return (
        <div>
            {props.prescription &&
                props.prescription.length !== 0 && (
                    <div>
                        <h3>Prescriptions</h3>
                        <div className="prescription">
                            {!props.loading &&
                                props.prescription.map(item => (
                                    <div
                                        key={item.name_of_medicine}
                                        className="prescription__item">
                                        <div className="list-item user-stats-list__item">
                                            <div className="list-item__title">
                                                {item.name_of_medicine}
                                            </div>
                                            <div className="list-item__content prescription__item">
                                                <div className="prescription__item__text">
                                                    {`take ${item.quantity}, ${
                                                        item.times_a_day
                                                    } times a day`}
                                                </div>
                                            </div>
                                        </div>
                                        {props.query &&
                                            !props.query.resolved &&
                                            props.user.is_doctor &&
                                            props.user.id !== user_id && (
                                                <div className="prescription__item__button">
                                                    {deleteButton(item.id)}
                                                </div>
                                            )}
                                    </div>
                                ))}
                        </div>
                    </div>
                )}
        </div>
    );
};

export default Prescription;
