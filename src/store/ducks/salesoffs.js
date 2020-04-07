import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
// import Mergers from 'seamless-immutable-mergers';

/**
 * Action types & creators
 */
const { Types, Creators } = createActions({
    removeSalesoffRequest: ['data'],
    saveSalesoffRequest: ['data']
});

export const SalesoffTypes = Types;
export default Creators;

/**
 * Handlers
 */
const INITIAL_STATE = Immutable({});

/**
 * Reducer
 */
export const reducer = createReducer(INITIAL_STATE, {});
