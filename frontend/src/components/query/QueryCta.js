import React from 'react';

import PrescriptionForm from './PrescriptionForm';
import Prescription from './Prescription';
import Appointment from './Appointment';
import Actions from './Actions';
import {getPescription} from '../../actions/queryActions';

// TODO: doctor status from localstorage
//
// const is_doctor = false;
class QueryCta extends React.Component {
    state = {
        prescription: null,
        loading: false,
    };
    updatePescription = () => {
        this.setState({loading: true});
        getPescription(this.props.id)
            .then(data => {
                if (data) {
                    this.setState({prescription: data});
                    setTimeout(() => {
                        this.setState({loading: false});
                    }, 1000);
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
        const is_doctor = localStorage.getItem('is_doctor') === 'true';
        const user_id = localStorage.getItem('user_id');
        return (
            <div style={{height: '80vh', overflowY: 'scroll'}}>
                {!is_doctor && <Actions {...this.props} />}
                <Prescription
                    {...this.props}
                    prescription={this.state.prescription}
                    updatePescription={this.updatePescription}
                    loading={this.state.loading}
                    is_doctor={is_doctor}
                />
                {is_doctor &&  !(this.props.user.id == user_id) && (
                    <PrescriptionForm
                        {...this.props}
                        prescription={this.state.prescription}
                        updatePescription={this.updatePescription}
                        loading={this.state.loading}
                    />
                )}
                <Appointment {...this.props} id={this.props.id} />
            </div>
        );
    }
}
export default QueryCta;
