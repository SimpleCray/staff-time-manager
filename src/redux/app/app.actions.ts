import { Action } from '../rootReducer';
import { AnyAction } from 'redux';
import { AppActionTypes } from './app.types';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import axios from 'axios';
import { ENDPOINT_API } from '../../shared/endPointApi';
import { showMessage } from '../message/message.actions';

export const testAction = (value: string): Action => ({
    type: AppActionTypes.TEST_ACTION,
    payload: value,
});

export const getStaffData =
    (): ThunkAction<void, RootState, unknown, AnyAction> =>
    async (dispatch) => {
        try {
            const response = await axios.get(ENDPOINT_API.STAFF.GET_STAFF_DATA);
            dispatch({
                type: AppActionTypes.GET_STAFF_DATA,
                payload: response.data,
            })
        } catch (error) {
            console.error(error);
        }
    };

export const setSelectedDay = (value: Date): Action => ({
    type: AppActionTypes.SET_SELECTED_DAY,
    payload: value,
});

export const setStartEndTime = (start: string, end: string): Action => ({
    type: AppActionTypes.SET_START_END_TIME,
    payload: {start, end},
});

export const setCalendarShowType = (type: string): Action => ({
    type: AppActionTypes.SET_CALENDAR_SHOW_TYPE,
    payload: type,
});

export const saveSchedule =
    // (date: string): ThunkAction<void, RootState, unknown, AnyAction> =>
    (date: string, schedule: { start: string; end: string }): ThunkAction<void, RootState, unknown, AnyAction> =>
    async (dispatch: any) => {
        try {
            const response = await axios.post(ENDPOINT_API.STAFF.SAVE_SCHEDULE, {date, schedule});
            if (response.status === 200) {
                dispatch(showMessage('Schedule saved!', 'success'));
                dispatch(getStaffData());
            }
        } catch (error) {
            console.error(error);
        }
    };
