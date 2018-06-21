import React from 'react';
import {Card, Input, Button} from 'antd';

class Chat extends React.Component {
    render() {
        return (
            <div className="chat__main">
                <ol id="messages" className="chat__messages" >
                </ol>

                <div className="chat__footer">
                    <form id="message-form">
                        <input
                            name="message"
                            type="text"
                            placeholder="type your message here"
                            autoFocus
                            autoComplete="off"
                        />
                        <button>send</button>
                    </form>
                    <button id="send-location">Send location</button>
                </div>
            </div>
        );
    }
}

export default Chat;
