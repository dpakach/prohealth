import React from 'react';
import _ from 'lodash';
import {Card, message,  Form, Icon, Input, Button} from 'antd';
import {pescribe} from '../../actions/queryActions';

const {TextArea} = Input;

class Prescription extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            quantity: '',
            times_a_day: null,
            remarks: '',
            query: this.props.match.params.id
        };
    }

    handleChange = e => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({[name]: value});
    };

    handleSubmit = e => {
        e.preventDefault();
        let form_data = _.pick(this.state, [
            'name',
            'quantity',
            'times_a_day',
            'remarks',
        ]);

        form_data = {
            medicine: [form_data],
            query: this.state.query
        }

        pescribe(form_data)
            .then(data => {
                this.props.updateQuery();
            })
            .catch(e => {
                message.error(e.message);
            });
    };

    render() {
        return (
            <Card title="Prescribe" bordered={false} style={{width: '100%'}}>
                <div>
                    <Form layout="vertical" onSubmit={this.handleSubmit}>
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

                        <Button type="primary" htmlType="submit">
                            Prescribe
                        </Button>
                    </Form>
                </div>
            </Card>
        );
    }
}

export default Prescription;
