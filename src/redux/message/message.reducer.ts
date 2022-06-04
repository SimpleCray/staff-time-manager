import { MessageActionTypes } from './message.types';

const initialState = {
    message: '',
    variant: '',
    duration: 5000,
};

const messageReducer = (state = initialState, action: { type: any; payload: { message: any; variant: any; }; }) => {
    switch (action.type) {
        
        case MessageActionTypes.SHOW_MESSAGE:
            return {
                ...state,
                message: action.payload.message,
                variant: action.payload.variant,
            }

        case MessageActionTypes.CLEAR_MESSAGE:
            return {
                ...initialState,
            }
        
        default:
            return state;
    }
}

export default messageReducer;