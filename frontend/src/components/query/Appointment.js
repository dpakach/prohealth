import React from 'react';

import {Icon} from 'antd';
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
        if (this.props.id) {
            this.updateAppointment();
        }
    }

    render() {
        const is_doctor = localStorage.getItem('is_doctor') === 'true';
        const user_id = parseInt(localStorage.getItem('user_id'));

        return (
            <div>
                {this.state.appointment && (
                    <div>
                        <h3>Appointment</h3>
                        <div className="prescription">
                            {this.state.loading && (
                                <div
                                    style={{
                                        width: '100%',
                                        textAlign: 'center',
                                    }}>
                                    <Icon
                                        style={{fontSize: '3rem'}}
                                        type="loading"
                                    />
                                </div>
                            )}

                            {!this.state.loading && (
                                <div>
                                    <div className="list-item user-stats-list__item">
                                        <div className="list-item__title">
                                            Hospital
                                        </div>
                                        <div className="list-item__content prescription__item">
                                            {this.state.appointment.hospital}
                                        </div>
                                    </div>
                                    <div className="list-item user-stats-list__item">
                                        <div className="list-item__title">
                                            Doctor
                                        </div>
                                        <div className="list-item__content prescription__item">
                                            {
                                                this.state.appointment
                                                    .appointed_doc
                                            }
                                        </div>
                                    </div>
                                    <div className="list-item user-stats-list__item">
                                        <div className="list-item__title">
                                            Venue
                                        </div>
                                        <div className="list-item__content prescription__item">
                                            {this.state.appointment.venue}
                                        </div>
                                    </div>
                                    <div className="list-item user-stats-list__item">
                                        <div className="list-item__title">
                                            Time
                                        </div>
                                        <div className="list-item__content prescription__item">
                                            {
                                                this.state.appointment
                                                    .appoint_time
                                            }
                                        </div>
                                    </div>
                                    <div className="list-item user-stats-list__item">
                                        <div className="list-item__title">
                                            Date
                                        </div>
                                        <div className="list-item__content prescription__item">
                                            {
                                                this.state.appointment
                                                    .appointed_date
                                            }
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {!this.state.appointment &&
                    this.props.query.taken_by === user_id && (
                        <div>
                            {user_id !== this.props.user.id &&
                                is_doctor && (
                                    <AppointmentForm
                                        update={this.updateAppointment}
                                        {...this.props}
                                    />
                                )}
                        </div>
                    )}
            </div>
        );
    }
}

export default Appointment;
