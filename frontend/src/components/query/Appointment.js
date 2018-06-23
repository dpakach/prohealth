import React from 'react';

import {Icon, Card} from 'antd';
import {getAppointment} from '../../actions/queryActions';
import AppointmentForm from './AppointmentForm';

class Appointment extends React.Component {
    state = {
        appointment: null,
        loading: false,
    };

    updateAppointment = () => {
        this.setState({loading: true});
        getAppointment(this.props.id)
            .then(data => {
                if (data) {
                    this.setState({appointment: data});
                    setTimeout(() => {
                        this.setState({loading: false});
                    }, 1000);
                }
                this.setState({loading: false});
            })
            .catch(e => {
                return this.setState({loading: false});
            });
    };

    componentDidMount() {
        this.updateAppointment();
    }

    render() {
        return (
            <Card bordered={false} style={{width: '100%'}}>
                {this.state.loading && (
                    <div style={{width: '100%', textAlign: 'center'}}>
                        <Icon style={{fontSize: '3rem'}} type="loading" />
                    </div>
                )}
                {!this.state.loading &&
                    this.state.appointment && (
                        <Card
                            title="Appointment"
                            bordered={false}
                            style={{width: '100%'}}>
                            {this.state.loading && <Icon type="loading" />}

                            <div>
                                <p>
                                    Hospital: {this.state.appointment.hospital}
                                </p>
                                <p>Venue: {this.state.appointment.venue}</p>
                                <p>
                                    Doctor:{' '}
                                    {this.state.appointment.appointed_doc}
                                </p>
                                <p>
                                    Time: {this.state.appointment.appoint_time}
                                </p>
                                <p>
                                    Date:{' '}
                                    {this.state.appointment.appointed_date}
                                </p>
                            </div>
                        </Card>
                    )}
                {!this.state.appointment && (
                    <AppointmentForm
                        update={this.updateAppointment}
                        {...this.props}
                    />
                )}
            </Card>
        );
    }
}

export default Appointment;
