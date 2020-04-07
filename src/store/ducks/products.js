import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
// import Mergers from 'seamless-immutable-mergers';

/**
 * Action types & creators
 */
const { Types, Creators } = createActions({
    loadViewProductRequest: ['data'],
    loadDatasheetSuccess: ['datasheet'],
    loadAssociatedProductSuccess: ['associates'],
    loadConcurrentProductSuccess: ['concurrents'],
    loadProductRequest: ['search'],
    loadProductSuccess: ['data'],
    loadProductSessionSuccess: ['session'],
    loadProductFailure: null,
    loadAssociatedProductFailure: null,
    toggleDocument: ['document'],
});

export const ProductTypes = Types;
export default Creators;

/**
 * Handlers
 */
const INITIAL_STATE = Immutable({
    data: [],
    associates: [],
    concurrents: [],
    document: null,
    datasheet: null,
    session: { id : null}
});

/**
 * Reducer
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.LOAD_PRODUCT_SUCCESS]: (state, { data }) => ({ ...state, data }),
    [Types.LOAD_PRODUCT_SESSION_SUCCESS]: (state, { session }) => ({ ...state, session }),
    [Types.LOAD_ASSOCIATED_PRODUCT_SUCCESS]: (state, { associates }) => ({ ...state, associates }),
    [Types.LOAD_ASSOCIATED_PRODUCT_FAILURE]: (state, {}) => ({  ...state, associates: [] }),
    [Types.TOGGLE_DOCUMENT]: (state, { document }) => ({ ...state, document }),
    [Types.LOAD_DATASHEET_SUCCESS]: (state, { datasheet }) => ({ ...state, datasheet }),
    [Types.LOAD_CONCURRENT_PRODUCT_SUCCESS]: (state, { concurrents }) => ({ ...state, concurrents }),
});
