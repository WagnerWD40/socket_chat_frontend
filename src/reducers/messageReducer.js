import { MESSAGE_ACTIONS } from './actions/messageActions';

function messageReducer(messages, action) {
    switch (action.type) {
        case MESSAGE_ACTIONS.ADD:
            return [...messages, action.payload.message];
            
        default:
            return messages;
    };
};

export {
    messageReducer,
};