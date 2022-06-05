import { Action } from '../rootReducer';
import { AppActionTypes } from './app.types';

const initialState = {
    testAppReducer: 'initial',
    startTime: '09:00',
    endTime: '18:00',
    selectedDay: new Date(),
    workingHours: null,
    schedule: null,
};

const appReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case AppActionTypes.TEST_ACTION:
            return {
                ...state,
                testAppReducer: action.payload,
            };

        case AppActionTypes.GET_WORKING_HOURS:
            return {
                ...state,
                workingHours: action.payload.workingHours,
                schedule: action.payload.schedule,
            };

        default:
            return state;
    }
};

export default appReducer;
