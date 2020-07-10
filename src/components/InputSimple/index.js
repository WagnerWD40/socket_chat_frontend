import React, {  } from 'react';
import './styles.css';

import useInputState from '../../hooks/useInputState';

export default function InputSimple() {
    const [ value, handleChange, reset ] = useInputState('');

    return (
        <input
        type="text"
        placeholder="Seu nome de usuário..."
        className="InputSimple" 
        onChange={handleChange}
        value={value}/>
    );
};