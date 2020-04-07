import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/**
 * Action types & creators
 */
const { Types, Creators } = createActions({
    loadSettingRequest: null,
    loadSettingSuccess: ['setting']
});

export const SettingsTypes = Types;
export default Creators;

/**
 * Handlers
 */
const INITIAL_STATE = Immutable({
    presentation: null,
    unlockFormula: null
});

/**
 * Reducer
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.LOAD_SETTING_SUCCESS]: (state, { setting }) => setting
});
