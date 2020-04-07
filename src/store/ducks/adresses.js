import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
// import Mergers from 'seamless-immutable-mergers';

/**
 * Action types & creators
 */
const { Types, Creators } = createActions({
    loadAdresseSessionRequest: ['id'],
    loadAdresseSessionSuccess: ['session'],
    loadAttendancesSuccess: ['attendances'],
    updateAttendancesSessionRequest: ['data'],
    saveAttendancesRequest: null,
    saveLocationRequest: ['data'],
    saveAttendancesFailure: ['error_attendaces'],
    saveAttendancesSaved: ['saved_attendaces'],
});

export const AdresseTypes = Types;
export default Creators;

/**
 * Handlers
 */
const INITIAL_STATE = Immutable({
    session: {
        morada: ''
    },
    attendances: [],
    error_attendaces: false,
    saved_attendaces: false,
});

/**
 * Reducer
 * 
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.LOAD_ADRESSE_SESSION_SUCCESS]: (state, { session }) => state.merge({ ...state, session }),
    [Types.LOAD_ATTENDANCES_SUCCESS]: (state, { attendances }) => state.merge({ ...state, attendances }),
    [Types.SAVE_ATTENDANCES_FAILURE]: (state, { error_attendaces }) => state.merge({ ...state, error_attendaces }),
    [Types.SAVE_ATTENDANCES_SAVED]: (state, { saved_attendaces }) => state.merge({ ...state, saved_attendaces }),
});
