import React, { useState, useEffect, useRef } from 'react';
import './styles.css';

import {
    subscribeToMessageService,
    sendMessage,
} from '../../services/api';

export default function Chat({ setActiveWindow, user, setUser }) {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');

    const messageInputRef = useRef(null);

    useEffect(() => {
        subscribeToMessageService(messages, setMessages);
        messageInputRef.current.focus();
    }, []);

    function handleEnterKeyPress(event)  {
        if (event.key === 'Enter') {
            submitMessage();
        };
    };
    
    function submitMessage() {
        const payload = {author: user, message: messageInput};
        sendMessage(payload);
        setMessages([...messages, payload]);
        setMessageInput('');

        // gotoBottom(".Chat-message-box");
        messageInputRef.current.focus();
    }

    function gotoBottom(id){
        var element = document.querySelector(id);
        element.scrollTop = element.scrollHeight - element.clientHeight;
     }

    return (
        <div class="Chat-background">
            <nav class="Chat-navbar">
                <ul>
                    <li><button 
                            class="Chat-message-btn-send"
                            onClick={() =>setActiveWindow('Home') }>Logout</button></li>
                    <li>{user}</li>
                </ul>
            </nav>
            <div class="Chat-container">
                    <ul class="Chat-message-box">
                        
                        {messages && messages.map(message => {
                            return (
                                <li key={JSON.stringify(message)}
                                    class={message.author === user
                                        ? "Chat-message-content"
                                        : "Chat-message-content Chat-message-anotheruser" }>
                                    <span>
                                        <strong>{`${message.author}: `}</strong>{message.message}
                                    </span>
                                </li>
                                );
                            })}
                        
                    </ul>
                <div class="Chat-input-box">
                    <input
                        type="text"
                        class="Chat-message-input"
                        placeholder="Escreva sua mensagem..."
                        ref={messageInputRef}
                        onChange={ e => setMessageInput(e.target.value)}
                        onKeyPress={handleEnterKeyPress}
                        value={messageInput}/>
                    <button
                        type="button"
                        class="Chat-message-btn-send"
                        onClick={submitMessage}>Enviar</button>
                </div>
            </div>
        </div>
    );
}