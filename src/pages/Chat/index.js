import React, { useState, useEffect, useRef, useReducer } from 'react';
import './styles.css';
import { useParams, useHistory } from 'react-router-dom';
import MaterialIcon from 'material-icons-react';
import { v4 as uuidv4 } from 'uuid';

import Background from '../../components/Background';

import useInputState from '../../hooks/useInputState';
import { newMessage } from '../../utils/index';
import { messageReducer } from '../../reducers/messageReducer';

import {
    subscribeToMessageStream,
    sendMessage,
    exitChatroom,
} from '../../services/socket';

export default function Chat({ user, setUser }) {
    const [messageInput, changeMessageInput, resetMessageInput] = useInputState('');
    const [messages, dispatch] = useReducer(messageReducer, []);

    const messageInputRef = useRef(null);
    const messagesEndRef = useRef(null);
    const { chatroomName } = useParams();
    const history = useHistory();

    useEffect(() => {
        subscribeToMessageStream(chatroomName, dispatch);
        messageInputRef.current.focus();
        scrollToBottom();

    }, []);

    useEffect(() => {
        const payload = {
            id: uuidv4(),
            author: user,
            message: `User ${user} enters the chatroom.`
        };

        sendMessage(payload, chatroomName);

    }, []);

    useEffect(() => {
        return () => {
            exitChatroom(chatroomName);
        };
    }, []);

    function scrollToBottom() {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };

    function logout() {
        history.push('/dashboard');
    };

    function handleSubmit(e) {
        e.preventDefault();
        sendMessage(newMessage(messageInput), chatroomName);
        resetMessageInput();
        messageInputRef.current.focus();
    };

    return (
        <Background>
            <nav className="Chat-navbar">
                <ul>
                    <li><p>User: </p><p>{user}</p></li>
                    <li onClick={logout} className="Chat-navbar-icon">
                        <MaterialIcon
                            icon="meeting_room"
                            color="#25c5fa"/>    
                        <p>Sair</p>
                    </li>
                </ul>
            </nav>
            <div className="Chat-container">
                    <ul className="Chat-message-box" >
                        
                        {messages && messages.map(message => {
                            return (
                                <li key={message.id}
                                    className={message.author === user
                                        ? "Chat-message-content"
                                        : "Chat-message-content Chat-message-anotheruser" }>
                                            {/* TODO Message background color must be a random one from a list of colors, to supports multiple users in one chatscreen */}

                                    <span>
                                        <strong>{`${message.author}: `}</strong>{message.message}
                                    </span>
                                </li>
                                );
                            })}
                        <div ref={messagesEndRef}></div>
                    </ul>
                <div className="Chat-input-box">
                    <form>
                        <input onSubmit={handleSubmit}
                            type="text"
                            className="Chat-message-input"
                            placeholder="Escreva sua mensagem..."
                            ref={messageInputRef}
                            onChange={changeMessageInput}
                            value={messageInput}/>
                        <button
                            type="submit"
                            className="Chat-message-btn-send"
                            onClick={handleSubmit}>
                            <MaterialIcon
                                icon="send"
                                color="#FFF"
                                size="20"/>
                        </button>
                    </form>
                </div>
            </div>
        </Background>
    );
}