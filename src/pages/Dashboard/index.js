import React, { useEffect, useState } from 'react';
import './styles.css';

import Background from '../../components/Background';
import useInputState from '../../hooks/useInputState';

import { useHistory } from 'react-router-dom';

import {
    connect,
    disconnect,
    createChatroom,
    subscribeToChatroomStream,
    enterChatroom,
} from '../../services/socket';

export default function Dashboard({ user, setUser }) {
    const [chatroomName, changeHandleChatroomName, resetChatroomName] = useInputState('');
    const [chatrooms, setChatrooms] = useState([]);

    const history = useHistory();

    useEffect(() => {
        disconnect();
        connect();
        subscribeToChatroomStream(chatrooms, setChatrooms);
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        createChatroom(chatroomName);
        resetChatroomName();
        history.push(`/chat/${chatroomName}`);
    };

    function handleClickChatroom(chatroomName) {
        enterChatroom(chatroomName);
        history.push(`/chat/${chatroomName}`);
    };

    return (
        <Background>
            usuário
            <form onSubmit={handleSubmit}>
                <input value={chatroomName} onChange={changeHandleChatroomName} />
                <button type="submit">create new Chatroom</button>
            </form>
            <ul className="ul">
                {
                    chatrooms && chatrooms.map(chatroom =>
                        <li
                            key={chatroom.name} 
                            className="Dashboard-chatroom"
                            onClick={() => handleClickChatroom(chatroom.name)}>
                            {chatroom.name}
                        </li>
                    )
                }
            </ul>
        </Background>
    );
};