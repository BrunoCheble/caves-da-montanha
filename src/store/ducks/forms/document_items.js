import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/**
 * Action types & creators
 */
const { Types, Creators } = createActions({
    saveDocumentItemRequest: ['data'],
    addDocumentItemRequest: ['data'],
    loadDocumentItemRequest: null,
    loadDocumentItemSuccess: ['data'],
    loadDocumentItemFailure: null,
    loadSuggestionRequest: null,
    loadSuggestionSuccess: ['suggestion'],
    loadSuggestionFailure: null,
});

export const FormDocumentItemTypes = Types;
export default Creators;

/**
 * Handlers
 */
const INITIAL_STATE = Immutable({
    data: [],
    suggestion: [],
});

/**
 * Reducer
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.LOAD_DOCUMENT_ITEM_SUCCESS]: (state, { data }) => ({ ...state, data }),
    [Types.LOAD_SUGGESTION_SUCCESS]: (state, { suggestion }) => ({ ...state, suggestion }),
});
