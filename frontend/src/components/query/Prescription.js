import React from 'react';

import {Link} from 'react-router-dom';
import {Card, Button, Icon, Collapse, List} from 'antd';
import {getPescription, deleteMedicine} from '../../actions/queryActions';
import PrescriptionForm from './PrescriptionForm';

class Prescription extends React.Component {
    state = {
        prescription: null,
        loading: false,
    };
    updatePescription = () => {
        getPescription(this.props.id)
            .then(data => {
                if (data) {
                    this.setState({prescription: data});
                    this.setState({loading: false});
                }
            })
            .catch(e => {
                return;
            });
    };

    componentDidMount() {
        this.updatePescription();
    }

    render() {
        const deleteButton = id => {
            if (true) {
                return (
                    <Button
                        type="danger"
                        onClick={e => {
                            deleteMedicine(this.props.id, id).then(() => {
                                this.updatePescription();
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
                {this.state.prescription && (
                    <div>
                        <Card
                            title="Prescription"
                            bordered={false}
                            style={{width: '100%'}}>
                            {this.state.loading && <Icon type="loading" />}

                            <List
                                itemLayout="horizontal"
                                dataSource={this.state.prescription}
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
                    </div>
                )}
            </div>
        );
    }
}
export default Prescription;
