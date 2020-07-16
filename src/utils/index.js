import { v4 as uuidv4 } from 'uuid';

function newMessage(message) {
    return {
        id: uuidv4(),
        author: "",
        message,
    };
};

function setToken(value) {
    localStorage.setItem('token', value);
};

function getToken(value) {
    return localStorage.getItem('token');
};

export {
    newMessage,
    setToken,
    getToken,
};