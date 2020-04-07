import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/**
 * Action types & creators
 */
const { Types, Creators } = createActions({
    loadAuthSessionRequest: null,
    loadAuthRequest: ['user'],
    loadAuthSuccess: ['data'],
    loadAuthFailure: null
});

export const AuthTypes = Types;
export default Creators;

/**
 * Handlers
 */
const INITIAL_STATE = Immutable({
    user: {
        id: null,
        name: null,
        email: null,
        username: null,
        password: null,
        id_seller: null,
        id_customer: null,
    }
});

/**
 * Reducer
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.LOAD_AUTH_SUCCESS]: (state, { data }) => ({ ...state, user: data }),//,,
});
