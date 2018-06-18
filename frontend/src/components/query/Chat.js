import React from 'react';
import {Card, Input, Button} from 'antd';

class Chat extends React.Component {
    render() {
        return (
            <Card title="Chat" bordered={false} style={{width: '100%'}}>
                <div className="chat">
                    <div className="chat__input">
                        <Input placeholder="enter your message" size="large" />
                        <Button type="primary">send</Button>
                    </div>
                    <div className="chat__body">
                        <div className="chat__message chat__message__self">
                            Hi there
                        </div>
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
                </div>
            </Card>
        );
    }
}

export default Chat;

/*

    <div className="chat">
        <div className="chat__input">
            <Input 
                placeholder="enter your message"
                size="large"
            />
            <Button type="primary">send</Button>

        </div>
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
    </div>
    */
