import socketio from 'socket.io-client';

const socket = socketio('http://localhost:8000', { autoConnect: false});

function connect() {
    socket.connect();
};

 function disconnect() {
    if (socket.connected) {
        socket.disconnect();
    };
 };

 function subscribeToChatroomStream(chatrooms, setChatrooms) {
    socket.on('chatroom created', () => socket.emit('get available chatrooms', null));
    socket.emit('get available chatrooms', null);
    socket.on('sent available chatrooms', sentChatrooms => setChatrooms(sentChatrooms));
 };

 function subscribeToMessageStream(chatroomName, updateFunc) {
    socket.on('send message', message => updateFunc(message));
 };

 function createChatroom(chatroomName) {
    socket.emit('create chatroom', chatroomName);
 };

 function enterChatroom(chatroomName) {
    socket.emit('enter chatroom', chatroomName);
 };

 function sendMessage(message, chatroomName) {
    socket.emit('send message', { chatroomName, message });
 };

function exitChatroom(user, chatroomName) {
   socket.emit('exit chatroom', user);
};

 export {
    connect,
    disconnect,
    createChatroom,
    subscribeToChatroomStream,
    enterChatroom,
    subscribeToMessageStream,
    sendMessage,
    exitChatroom,
 };