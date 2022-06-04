import { combineReducers } from 'redux';
import appReducer from './app/app.reducer';
import messageReducer from './message/message.reducer';

export type Action = { type: string; payload: any };

export const rootReducer = combineReducers({
    app: appReducer,
    message: messageReducer,
});

