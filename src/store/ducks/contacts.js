import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
// import Mergers from 'seamless-immutable-mergers';

/**
 * Action types & creators
 */
const { Types, Creators } = createActions({
    loadContactRequest: ['search'],
    loadContactFormRequest: ['id'],
    loadContactSuccess: ['data'],
    loadContactFailure: null,
    loadContactSessionRequest: ['id'],
    loadContactSessionSuccess: ['session'],
    loadContactAssociatedRequest: ['search'],
    loadContactAssociatedSuccess: ['associates'],
    removeRelationshipRequest: ['id'],
    saveContactRequest: ['data']
});

export const ContactTypes = Types;
export default Creators;

/**
 * Handlers
 */
const INITIAL_STATE = Immutable({
    data: [],
    session: {
        id: null,
        nome: null,
        codtelemovel: null,
        telemovel: null,
        codtelemovelop: null,
        telemovelop: null,
        email: null,
        observacoes: null,
        id_utilizador: null
    },
    associates: []
});

/**
 * Reducer
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.LOAD_CONTACT_SUCCESS]: (state, { data }) => ({ ...state, data }),
    [Types.LOAD_CONTACT_SESSION_SUCCESS]: (state, { session }) => ({ ...state, session }),
    [Types.LOAD_CONTACT_ASSOCIATED_SUCCESS]: (state, { associates }) => ({ ...state, associates }),
});
