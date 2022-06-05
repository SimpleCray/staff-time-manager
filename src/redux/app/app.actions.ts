import { Action } from '../rootReducer';
import { AnyAction } from 'redux';
import { AppActionTypes } from './app.types';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import axios from 'axios';
import { ENDPOINT_API } from '../../shared/endPointApi';

export const testAction = (value: string): Action => ({
    type: AppActionTypes.TEST_ACTION,
    payload: value,
});

export const thunkSendMessage =
    (): ThunkAction<void, RootState, unknown, AnyAction> =>
    async (dispatch) => {
        try {
            const response = await axios.get(ENDPOINT_API.STAFF.GET_STAFF_DATA);
            dispatch({
                type: AppActionTypes.GET_WORKING_HOURS,
                payload: response.data,
            })
        } catch (error) {
            console.error(error);
        }
    };
