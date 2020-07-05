import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8000');

function subscribeToMessageService(messages, setMessages) {
    socket.on('receivedMessage', message => setMessages([...messages, message]));
};

function sendMessage(message) {
    socket.emit('chat message', message);
};

export {
    subscribeToMessageService,
    sendMessage,
};

