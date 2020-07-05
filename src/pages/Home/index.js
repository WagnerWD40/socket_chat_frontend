import React, { useState } from 'react';
import './styles.css';

import logo from '../../assets/images/logo.png';

export default function Home({ setActiveWindow, user, setUser }) {
    const [loginInput, setLoginInput] = useState('');

    function login() {
        setUser(loginInput);
        setActiveWindow('Chat')
    };

    return (
        <div class="Home-background">
            <div class="Home-container">
                <img src={logo} class="Home-logo" />
                <h1 class="Home-title">Powered Chat</h1>
                <input
                    type="text"
                    placeholder="Seu nome de usuário..."
                    class="Home-input" 
                    onChange={e => setLoginInput(e.target.value)}/>
                <button class="Home-btn" onClick={ () => login() }>Entrar</button>
            </div>
        </div>
    );
}