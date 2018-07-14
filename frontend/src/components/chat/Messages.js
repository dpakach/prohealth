import React from 'react';
import moment from 'moment';


const Messages = props => {

    const user_id = parseInt(localStorage.getItem('user_id'), 10);
    const getClass = (message) => {
        if(message.sender === user_id){
            return  'chat-message'
        } else {
            return 'chat-message chat-message--self'
        }
    }

    const getClassTime = (message) => {
        if(message.sender === user_id){
            return "chat-message__time"
        } else {
            return "chat-message__time chat-message__time--self"
        }
    }
    return (
        <ol className="chat__messages" id="chat-div">
            {props.messages.map(message => (
                <div key={message.id}>
                    <li className={getClass(message)}>
                        {message.message}
                        <span className={getClassTime(message)}>{moment(message.created).format('hh:mm')}</span>
                    </li>
                    <div className="clear" />
                </div>
            ))}
        </ol>
    );
};

export default Messages;
