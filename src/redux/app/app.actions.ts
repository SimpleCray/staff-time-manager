import { Action } from '../rootReducer';
import { AppActionTypes } from './app.types';

export const testAction = (value: string): Action => ({
    type: AppActionTypes.TEST_ACTION,
    payload: value,
});
