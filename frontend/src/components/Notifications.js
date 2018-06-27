import React from 'react';
import {getNotifications} from '../actions/notificationActions';

class Notifications extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notifications: [],
        };
    }

    componentDidMount() {
        getNotifications()
            .then(data => {
                this.setState({notifications: data});
            })
            .catch(e => {
                console.log('Failed to load resources!');
            });
    }

    render() {
        return (
            <div>
                <h1>Notifications</h1>

                <ul>
                    {this.state.notifications &&
                        this.state.notifications.map(not => (

                            <div>
                                <li>{not.title}</li>
                                <button>Mark as Unread</button>
                                <button>Mark as Read</button>
                            </div>
                        ))}
                </ul>
            </div>
        );
    }
}

export default Notifications;
