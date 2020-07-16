import React, { useRef, useEffect } from 'react';
import './styles.css';

import Background from '../../components/Background';
import useInputState from '../../hooks/useInputState';
import api from '../../services/api';
import { setToken } from '../../utils';

import logo from '../../assets/images/logo.png';

export default function Home({ user, setUser }) {
    const [email, handleChangeEmail, resetEmail] = useInputState('');
    const [password, handleChangePassword, resetPassword] = useInputState('');

    const emailInputRef = useRef(null);

    useEffect(() => {
        emailInputRef.current.focus();
    }, []);

    async function login(e) {
        e.preventDefault();

        const payload = {
            email,
            password,
        };

        console.log(payload);

        try {
            const res = await api.post('/login', payload);

            if (res.status === 200) {
                setToken(res.data.token);
            };

        } catch (err) {
            console.error(err);
        };
        
        resetEmail();
        resetPassword();
    };

    return (
        <Background>
            <form className="Home-container" onSubmit={login}>
                <img src={logo} className="Home-logo" alt="logo" />
                <h1 className="Home-title">Powered Chat</h1>
                <input
                    ref={emailInputRef}
                    type="text"
                    placeholder="Seu nome de usuário..."
                    className="Home-input" 
                    onChange={handleChangeEmail}
                    value={email}/>
                <input
                    type="text"
                    placeholder="Sua password..."
                    className="Home-input" 
                    onChange={handleChangePassword}
                    value={password}/>
                <button className="Home-btn" type="submit">Entrar</button>
            </form>
        </Background>
    );
}