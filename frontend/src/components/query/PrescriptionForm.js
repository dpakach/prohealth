import React from 'react';
import _ from 'lodash';
import { Modal, message, Form, Input, Button} from 'antd';
import {pescribe} from '../../actions/queryActions';
import Prescription from './Prescription';

const {TextArea} = Input;

class PrescriptionForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            visible: false,
            name_of_medicine: '',
            quantity: '',
            times_a_day: null,
            remarks: '',
            medicines: '',
            query: this.props.id,
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

    handleAdd = e => {
        e.preventDefault();
        let form_data = _.pick(this.state, [
            'name_of_medicine',
            'quantity',
            'times_a_day',
            'remarks',
        ]);

        pescribe(form_data, this.props.id)
            .then(data => {
                this.props.updatePescription();
                this.setState({
                    name_of_medicine: '',
                    quantity: '',
                    times_a_day: null,
                    remarks: '',
                });
            })
            .catch(e => {
                message.error(e.message);
            });
    };

    handleCancel = () => {
        this.setState({visible: false});
    };

    render() {
        return (
            <div>
                <div>
                    <div>
                        <Button
                            type="primary"
                            className="action__button"
                            onClick={this.showModal}>
                            Add Prescription
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
                            ]}>
                            <Prescription
                                {...this.props}
                                prescription={this.props.prescription}
                                updatePescription={this.props.updatePescription}
                                id={this.props.id}
                            />
                            <div>
                                <Form
                                    layout="vertical"
                                    id="PrescriptionForm"
                                    onSubmit={this.handleSubmit}>
                                    <Input
                                        placeholder="Name"
                                        name="name_of_medicine"
                                        onChange={this.handleChange}
                                        value={this.state.name_of_medicine}
                                    />
                                    <Input
                                        type="text"
                                        placeholder="Quantity eg '25 ml' or '2 tablets'"
                                        onChange={this.handleChange}
                                        value={this.state.quantity}
                                        name="quantity"
                                    />
                                    <Input
                                        type="number"
                                        placeholder="times a day"
                                        onChange={this.handleChange}
                                        value={this.state.times_a_day}
                                        name="times_a_day"
                                    />
                                    <TextArea
                                        type="text"
                                        placeholder="remarks"
                                        name="remarks"
                                        onChange={this.handleChange}
                                        value={this.state.remarks}
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
