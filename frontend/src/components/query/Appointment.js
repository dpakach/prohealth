import React from 'react';

import {Row, Icon, Col, Card} from 'antd';
import {getAppointment} from '../../actions/queryActions';
import AppointmentForm from './AppointmentForm';

class Appointment extends React.Component {
    state = {
        appointment: null,
        loading: false,
    };

    updateAppointment = () => {
        getAppointment(this.props.id)
            .then(data => {
                if (data) {
                    this.setState({appointment: data});
                    this.setState({loading: false});
                }
            })
            .catch(e => {
                return;
            });
    };

    componentDidMount() {
        this.updateAppointment();
    }

    render() {
        return (
            <div>
                {this.state.appointment && (
                    <Card
                        title="Appointment"
                        bordered={false}
                        style={{width: '100%'}}>
                        {this.state.loading && <Icon type="loading" />}

                        <div>
                            <p>Hospital: {this.state.appointment.hospital}</p>
                            <p>Venue: {this.state.appointment.venue}</p>
                            <p>
                                Doctor: {this.state.appointment.appointed_doc}
                            </p>
                            <p>Time: {this.state.appointment.appoint_time}</p>
                            <p>Date: {this.state.appointment.appointed_date}</p>
                        </div>
                    </Card>
                )}
                { !this.state.loading && !this.state.appointment && (
                    <AppointmentForm
                        update={this.updateAppointment}
                        {...this.props}
                    />
                )}
            </div>
        );
    }
}

export default Appointment;
