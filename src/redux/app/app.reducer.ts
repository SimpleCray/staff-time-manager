import { CALENDAR_SHOW_TYPE } from '../../shared/constants';
import { Action } from '../rootReducer';
import { AppActionTypes } from './app.types';

const initialState = {
    testAppReducer: 'initial',
    startTime: '09:00',
    endTime: '18:00',
    selectedDay: new Date(),
    workingHours: null,
    schedule: null,
    showType: CALENDAR_SHOW_TYPE.AVAILABLE_TIME,
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

        case AppActionTypes.SET_SELECTED_DAY:
            return {
                ...state,
                selectedDay: action.payload,
            };

        case AppActionTypes.SET_START_END_TIME:
            return {
                ...state,
                startTime: action.payload.start,
                endTime: action.payload.end,
            };

        case AppActionTypes.SET_CALENDAR_SHOW_TYPE:
            return {
                ...state,
                showType: action.payload,
            };

        default:
            return state;
    }
};

export default appReducer;
