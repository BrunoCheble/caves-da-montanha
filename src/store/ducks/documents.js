import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
// import Mergers from 'seamless-immutable-mergers';

/**
 * Action types & creators
 */
const { Types, Creators } = createActions({
    loadDocumentRequest: ['search'],
    loadDocumentSuccess: ['data'],
    loadDocumentFailure: null,
});

export const DocumentTypes = Types;
export default Creators;

/**
 * Handlers
 */
const INITIAL_STATE = Immutable({
    data: []
});

/**
 * Reducer
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.LOAD_DOCUMENT_SUCCESS]: (state, { data }) => ({ ...state, data }),
});
