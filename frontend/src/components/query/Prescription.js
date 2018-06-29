import React from 'react';

import {Icon} from 'antd';
import {deleteMedicine} from '../../actions/queryActions';

const Prescription = props => {
    const deleteButton = id => {
        // TODO: change content based on doctor status
        if (props.is_doctor) {
            return (
                <a
                    type="danger"
                    onClick={(e) => {
                        deleteMedicine(props.id, id).then(() => {
                            props.updatePescription();
                        });
                    }}>
                    <i className=" material-icons">
                        delete
                    </i>
                </a>
            );
        } else {
            return;
        }
    };

    return (
        <div>
            {props.prescription && (
                <div>
                    <h3>Prescriptions</h3>
                    <div className="prescription">
                        {props.loading && (
                            <div style={{width: '100%', textAlign: 'center'}}>
                                <Icon
                                    style={{fontSize: '3rem'}}
                                    type="loading"
                                />
                            </div>
                        )}

                        {!props.loading &&
                            props.prescription.map(item => (
                                <div key={item.name_of_medicine} className="prescription__item">
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
                                    <div className="prescription__item__button">

                                        {deleteButton(item.id)}
                                    </div>
                                </div>
                            ))}
                            {!props.loading && props.prescription.length === 0 && (
                                <p style={{textAlign:"center"}}>No Prescription</p>
                            )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Prescription;
