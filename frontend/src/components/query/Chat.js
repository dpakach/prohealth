import React from 'react';

class Chat extends React.Component {
    render() {
        return (
            <div className="chat__main">
                <ol id="messages" className="chat__messages">
                    <li className="chat-message">
                        hello world
                        <span class="chat-message__time">1:34</span>
                    </li>
                    <div className="clear" />
                    <li className="chat-message chat-message--self">
                        hello world
                        <span class="chat-message__time chat-message__time--self">
                            1:34
                        </span>
                    </li>
                    <div className="clear" />
                    <li className="chat-message">
                        hello world
                        <span class="chat-message__time">1:34</span>
                    </li>
                    <div className="clear" />
                    <li className="chat-message chat-message--self">
                        hello skdjaslkdjas;l skjdf;laskdf;ajlksd
                        hello skdjaslkdjas;l skjdf;laskdf;ajlksd
                        hello skdjaslkdjas;l skjdf;laskdf;ajlksd
                        hello skdjaslkdjas;l skjdf;laskdf;ajlksd
                        hello skdjaslkdjas;l skjdf;laskdf;ajlksd
                        wsfjas;lkfa;slfkjas;l orld
                        <span class="chat-message__time chat-message__time--self">
                            1:34
                        </span>
                    </li>
                    <div className="clear" />
                    <li className="chat-message chat-message">
                        hello skdjaslkdjas;l skjdf;laskdf;ajlksd
                        hello skdjaslkdjas;l skjdf;laskdf;ajlksd
                        hello skdjaslkdjas;l skjdf;laskdf;ajlksd
                        hello skdjaslkdjas;l skjdf;laskdf;ajlksd
                        hello skdjaslkdjas;l skjdf;laskdf;ajlksd
                        wsfjas;lkfa;slfkjas;l orld
                        <span class="chat-message__time chat-message__time">
                            1:34
                        </span>
                    </li>
                    <div className="clear" />
                </ol>

                <div className="chat__footer">
                    <form className="form" id="message-form">
                        <input
                            name="message"
                            type="text"
                            placeholder="type your message here"
                            autoFocus
                            autoComplete="off"
                        />
                        <button className="btn">send</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Chat;
