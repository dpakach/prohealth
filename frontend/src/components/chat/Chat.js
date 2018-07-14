import React from 'react';

import ChatInput from './Input';
import Messages from './Messages';

import {getMessage} from '../../actions/chatActions';

class Chat extends React.Component {
    state = {messages: []};

    fetchMessage = () => {
        getMessage(this.props.id)
            .then(response => response.json())
            .then(data => {
                if (this.state.messages.length !== data.length) {
                    this.setState({messages: data});
                    const chatDiv = document.getElementById('chat-div');
                    chatDiv.scrollTop = chatDiv.scrollHeight;
                }
            })
            .catch( e => {
                console.log('e')
            });
    };

    async componentDidMount() {
        if (this.props.id) {
            this.fetchMessage();
            try {
                setInterval(async () => {
                    await this.fetchMessage();
                }, 3000);
            } catch (e) {
                console.log(e);
            }
        }
    }

    render() {
        return (
            <div className="chat__main">
                <Messages messages={this.state.messages} />

                <div className="chat__footer">
                    <ChatInput
                        fetchMessage={this.fetchMessage}
                        query_id={this.props.id}
                    />
                </div>
            </div>
        );
    }
}

export default Chat;
