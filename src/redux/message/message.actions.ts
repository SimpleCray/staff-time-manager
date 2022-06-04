import { Action } from '../rootReducer';
import { MessageActionTypes } from './message.types';

export const showMessage = (message: String, variant: String): Action => ({
    type: MessageActionTypes.SHOW_MESSAGE,
    payload:  { message, variant },
});

export const clearMessage = (): Action => ({
    type: MessageActionTypes.CLEAR_MESSAGE,
    payload: '',
});

