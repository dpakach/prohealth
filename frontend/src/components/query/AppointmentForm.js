import React from 'react';
import {
    Card,
    message,
    Form,
    Icon,
    Input,
    Button,
    DatePicker,
    TimePicker,
} from 'antd';
import _ from 'lodash';
import moment from 'moment';

import {setAppointment} from '../../actions/queryActions';

const {TextArea} = Input;
const format = 'HH:mm';

class AppointmentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hospital: '',
            venue: '',
            appointed_doc: '',
            appointed_date: '',
            appoint_time: '10:00',
            query: this.props.match.params.id
        };
    }

    handleChange = e => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({[name]: value});
    };

    onDateChange = (date, dateString) => {
        this.setState({appointed_date: dateString});
    };

    onTimeChange = (time, timeString) => {
        console.log(time);
        this.setState({appointed_time: timeString});
    };

    handleSubmit = e => {
        e.preventDefault();
        const form_data = _.pick(this.state, [
            'hospital',
            'appointed_doc',
            'appointed_date',
            'appoint_time',
            'venue',
            'query'
        ]);

        setAppointment(form_data)
            .then(data => {
                this.props.updateQuery();
            })
            .catch(e => {
                message.error(e.message);
            });
    };

    render() {
        return (
            <Card
                title="Set Appointment"
                bordered={false}
                style={{width: '100%'}}>
                <div>
                    <Form layout="vertical" onSubmit={this.handleSubmit}>
                        <Input
                            type="text"
                            placeholder="Hospital"
                            onChange={this.handleChange}
                            name="hospital"
                        />

                        <Input
                            type="text"
                            placeholder="Doctor"
                            onChange={this.handleChange}
                            name="appointed_doc"
                        />

                        <Input
                            type="text"
                            onChange={this.handleChange}
                            placeholder="Venue"
                            name="venue"
                        />

                        <DatePicker
                            onChange={this.onDateChange}
                            name="appointed_date"
                        />

                        <TimePicker
                            defaultValue={moment('10:00', format)}
                            format={format}
                            onChange={this.onTimeChange}
                            name="appoint_time"
                        />

                        <Button type="primary" htmlType="submit">
                            Set Appointment
                        </Button>
                    </Form>
                </div>
            </Card>
        );
    }
}

export default AppointmentForm;
