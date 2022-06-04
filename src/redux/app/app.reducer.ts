import { Action } from '../rootReducer';
import { AppActionTypes } from './app.types';

const initialState = {
    testAppReducer: 'initial',
    startTime: '09:00',
    endTime: '18:00',
    selectedDay: new Date(),
};

const appReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case AppActionTypes.TEST_ACTION:
            return {
                ...state,
                testAppReducer: action.payload,
            };

        default:
            return state;
    }
};

export default appReducer;
