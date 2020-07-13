import { v4 as uuidv4 } from 'uuid';

function newMessage(message) {
    return {
        id: uuidv4(),
        author: "",
        message,
    };
};

export {
    newMessage,
};