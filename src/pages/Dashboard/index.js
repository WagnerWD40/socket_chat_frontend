import React, { useEffect, useState } from 'react';
import './styles.css';
import MaterialIcon from 'material-icons-react';

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
    const [createFormVisibility, setCreateFormVisibility] = useState(true);

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

    function handleClickAddChatroom() {
        setCreateFormVisibility(!createFormVisibility);
    };

    return (
        <Background>
            <nav className="Dashboard-navbar">
                <ul className="Dashboard-iconrow">
                    <li>
                        <MaterialIcon
                                icon="more_vert"
                                color="#25c5fa"/>   
                    </li>
                    <li>
                        <MaterialIcon
                                icon="person"
                                color="#25c5fa"/>   
                    </li>
                    <li onClick={handleClickAddChatroom}>
                        <MaterialIcon
                                icon="queue"
                                color="#25c5fa"/>   
                    </li>
                    <li>
                        <MaterialIcon
                                icon="settings"
                                color="#25c5fa"/>   
                    </li>
                    <li>
                        <MaterialIcon
                                icon="meeting_room"
                                color="#25c5fa"/>   
                    </li>
                </ul>              
            </nav>
            <form 
                onSubmit={handleSubmit}
                className={createFormVisibility
                            ? "Dashboard-create-chatroom-form"
                            : "Dashboard-create-chatroom-form Dashboard-hidden"}>
                <input
                    value={chatroomName}
                    onChange={changeHandleChatroomName}
                    placeholder="New chatroom name..."
                    className="Dashboard-create-chatroom-input" />
                <button
                    type="submit"
                    className="Dashboard-create-chatroom-button">
                        <MaterialIcon
                            icon="add"
                            color="#25c5fa"/>
                </button>
            </form>
            <div className="Dashboard-chatroom-list-container">
                <ul className="ul">
                    {
                        chatrooms && chatrooms.map(chatroom =>
                            <li
                                key={chatroom.name} 
                                className="Dashboard-chatroom"
                                onClick={() => handleClickChatroom(chatroom.name)}>
                                <div className="Dashboard-chatroom-title">
                                    {chatroom.name}
                                </div>
                                <div className="Dashboard-chatroom-content">
                                </div>
                            </li>
                        )
                    }
                </ul>
            </div>
        </Background>
    );
};