import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import Mergers from 'seamless-immutable-mergers';

/**
 * Action types & creators
 */
const { Types, Creators } = createActions({
    loadSyncRequest: ['data'],
    loadSyncSuccess: ['data'],
    loadSyncFailure: null,
    loadSyncCompleteRequest: null,
    loadSyncResetRequest: null,
    loadSyncSchemaRequest: null,
    toggleSyncLoading: ['status'],
    toggleSyncLoadingText: ['msg'],
});

export const SyncTypes = Types;
export default Creators;

/**
 * Handlers
 */
const INITIAL_STATE = Immutable({
    data: [
        { id: 'attachments', name: 'Anexos', isActive: true },
        { id: 'documents', name: 'Vendas', isActive: true },
        { id: 'salesoff', name: 'Liquidações', isActive: true }
    ],
    loading: false,
    loadingText: ''
});

/**
 * Reducer
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.LOAD_SYNC_SUCCESS]: (state, { data }) => ({ ...state, data }),
    [Types.TOGGLE_SYNC_LOADING]: (state, { status }) => ({ ...state, loading: status }),
    [Types.TOGGLE_SYNC_LOADING_TEXT]: (state, { msg }) => ({ ...state, loadingText: msg }),
});
