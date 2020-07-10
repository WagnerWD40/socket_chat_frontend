import React, { useState } from 'react';
import './styles.css';

import Background from '../../components/Background';
import useInputState from '../../hooks/useInputState';

import logo from '../../assets/images/logo.png';

export default function Home({ user, setUser }) {
    const [username, handleChangeUsername, resetUsername] = useInputState('');
    const [password, handleChangePassword, resetPassword] = useInputState('');

    function login() {
        console.log({ username, password });
        resetUsername();
        resetPassword();
    };

    return (
        <Background>
            <div className="Home-container">
                <img src={logo} class="Home-logo" alt="logo" />
                <h1 className="Home-title">Powered Chat</h1>
                <input
                    type="text"
                    placeholder="Seu nome de usuário..."
                    className="Home-input" 
                    onChange={handleChangeUsername}
                    value={username}/>
                <input
                    type="text"
                    placeholder="Sua password..."
                    className="Home-input" 
                    onChange={handleChangePassword}
                    value={password}/>
                <button className="Home-btn" onClick={ () => login() }>Entrar</button>
            </div>
        </Background>
    );
}