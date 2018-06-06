import React from 'react';

const Chat = props => (
    <div className="chat">
        <div className="chat__body">
            <div className="chat__message chat__message__self">Hi there</div>
            <div className="chat__message">Hello hou you doin</div>
            <div className="chat__message chat__message__self">
                nothing aint good doc
            </div>
            <div className="chat__message">
                what seems to be giving you trouble
            </div>
            <div className="chat__message chat__message__self">
                nothing aint good doc
            </div>
            <div className="chat__message">
                what seems to be giving you trouble
            </div>
            <div className="chat__message chat__message__self">
                a lot of things
            </div>
        </div>
        <div className="chat__input">
            <input className="chat__input--text " type="text" />
            <button className="btn btn--primary chat__input--button">
                Send
            </button>
        </div>
    </div>
);

export default Chat;
