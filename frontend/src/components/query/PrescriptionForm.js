import React from 'react';
import _ from 'lodash';
import {Card, Modal, message, Form, Icon, Input, Button} from 'antd';
import {pescribe} from '../../actions/queryActions';
import Prescription from './Prescription';

const {TextArea} = Input;

class PrescriptionForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            visible: false,
            name: '',
            quantity: '',
            times_a_day: null,
            remarks: '',
            medicines: '',
            query: this.props.match.params.id,
        };
    }

    handleChange = e => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({[name]: value});
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        this.setState({loading: true});
        this.setState({loading: false, visible: false});
    };

    handleAdd = e => {
        e.preventDefault();
        let form_data = _.pick(this.state, [
            'name',
            'quantity',
            'times_a_day',
            'remarks',
        ]);

        pescribe(form_data, this.props.match.params.id)
            .then(data => {
                this.props.updateQuery();
            })
            .catch(e => {
                message.error(e.message);
            });
    };

    handleCancel = () => {
        this.setState({visible: false});
    };

    medicine = [
        {
            id: 1,
            name_of_medicine: 'sinex',
            quantity: '2 tabs',
            times_a_day: 3,
            remarks: 'take it with water',
        },
        {
            id: 2,
            name_of_medicine: 'burfulonazol',
            quantity: '35ml',
            times_a_day: 2,
            remarks: 'swallow directly',
        },
    ];
    render() {
        return (
            <div>
                <div>
                    <div>
                        <Button
                            type="primary"
                            className="action__button"
                            onClick={this.showModal}>
                            Give Prescription
                        </Button>
                        <Modal
                            visible={this.state.visible}
                            title="Give Prescription"
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            footer={[
                                <Button key="back" onClick={this.handleCancel}>
                                    Return
                                </Button>,
                                <Button
                                    key="submit"
                                    type="primary"
                                    loading={this.state.loading}
                                    onClick={this.handleOk}>
                                    Done
                                </Button>,
                            ]}>
                            <Prescription medicine={this.medicine} />

                            <div>
                                <Form
                                    layout="vertical"
                                    onSubmit={this.handleSubmit}>
                                    <Input
                                        placeholder="Name"
                                        name="name"
                                        onChange={this.handleChange}
                                    />
                                    <Input
                                        type="text"
                                        placeholder="Quantity eg '25 ml' or '2 tablets'"
                                        onChange={this.handleChange}
                                        name="quantity"
                                    />
                                    <Input
                                        type="number"
                                        placeholder="times a day"
                                        onChange={this.handleChange}
                                        name="times_a_day"
                                    />
                                    <TextArea
                                        type="text"
                                        placeholder="remarks"
                                        name="remarks"
                                        onChange={this.handleChange}
                                        autosize
                                    />
                                </Form>
                                <br />
                                <Button
                                    key="submit"
                                    type="primary"
                                    loading={this.state.loading}
                                    onClick={this.handleAdd}>
                                    Add
                                </Button>,
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        );
    }
}

export default PrescriptionForm;
