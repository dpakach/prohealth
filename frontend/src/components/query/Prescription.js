import React from 'react';

import {Card, Button, Icon, List} from 'antd';
import {deleteMedicine} from '../../actions/queryActions';

const Prescription = props => {
    const deleteButton = id => {
        // TODO: change content based on doctor status
        if (true) {
            return (
                <a
                    type="danger"
                    onClick={e => {
                        deleteMedicine(props.id, id).then(() => {
                            props.updatePescription();
                        });
                    }}>
                    <i onClick className=" material-icons">
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
                                <div className="prescription__item">
                                    <div class="list-item user-stats-list__item">
                                        <div class="list-item__title">
                                            {item.name_of_medicine}
                                        </div>

                                        <div class="list-item__content prescription__item">
                                            <div class="prescription__item__text">
                                                {`take ${item.quantity}, ${
                                                    item.times_a_day
                                                } times a day`}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="prescription__item__button">
                                        {deleteButton(item.id)}
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Prescription;
