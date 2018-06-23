import React from 'react';

import {Card, Button, Icon, List} from 'antd';
import {deleteMedicine} from '../../actions/queryActions';

const Prescription = props => {
    const deleteButton = id => {
        if (true) {
            return (
                <Button
                    type="danger"
                    onClick={e => {
                        deleteMedicine(props.id, id).then(() => {
                            props.updatePescription();
                        });
                    }}>
                    delete
                </Button>
            );
        } else {
            return;
        }
    };

    return (
        <div>
            {props.prescription && (
                <Card bordered={false} style={{width: '100%'}}>
                    {props.loading && (
                        <div style={{width: '100%', textAlign: 'center'}}>
                            <Icon style={{fontSize: '3rem'}} type="loading" />
                        </div>
                    )}

                    {!props.loading && (
                        <Card
                            title="Prescription"
                            bordered={false}
                            style={{width: '100%'}}>
                            <List
                                itemLayout="horizontal"
                                dataSource={props.prescription}
                                renderItem={item => (
                                    <List.Item
                                        actions={[deleteButton(item.id)]}>
                                        <List.Item.Meta
                                            title={item.name_of_medicine}
                                            description={`take ${
                                                item.quantity
                                            }, ${item.times_a_day} times a day`}
                                        />
                                    </List.Item>
                                )}
                            />
                        </Card>
                    )}
                </Card>
            )}
        </div>
    );
};
export default Prescription;
