import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
// import Mergers from 'seamless-immutable-mergers';

/**
 * Action types & creators
 */
const { Types, Creators } = createActions({
    loadDocumentSessionRequest: ['data'],
    loadDocumentSessionSuccess: ['data'],
    loadDocumentSessionFailure: null,
    finishDocumentRequest: ['id'],
    updblockDocumentRequest: ['data'],
    saveDocumentRequest: ['data'],
    saveDocumentFailure: null,
    createDocumentRequest: null,
    createDocumentCustomerRequest: ['customer'],
    loadListFormDocumentRequest: null,
    loadDocumentListSellersSuccess: ['listSellers'],
    loadDocumentListPromotersSuccess: ['listPromoters'],
    loadDocumentListCustomersSuccess: ['listCustomers'],
    loadDocumentListCustomerSellersSuccess: ['listCustomerSellers'],
    loadListAdressesRequest: ['id'],
    loadDocumentListAdressesSuccess: ['listAdresses'],
    loadDocumentListTypesSuccess: ['listTypes'],
    removeDocumentRequest: ['id'],
});

export const FormDocumentTypes = Types;
export default Creators;

/**
 * Handlers
 */
const INITIAL_STATE = Immutable({
    data: {
        id: null,
        id_entidade_externa: '',
        id_cliente_erp: '',
        id_promotora: '',
        id_vendedor_cliente_erp: '',
        id_vendedor: '',
        id_endereco: '',
        id_tipo_transacao: '',
        total_documento: 0,
        total_desconto: 0,
        total_iec: 0,
        total_iva: 0,
        total_mercadoria: 0,
        customer: '',
        adresse: '',
    },
    listSellers: [],
    listPromoters: [],
    listCustomers: [],
    listCustomerSellers: [],
    listAdresses: [],
    listTypes: [],
});

/**
 * Reducer
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.LOAD_DOCUMENT_SESSION_SUCCESS]: (state, { data }) => ({ ...state, data }),
    [Types.LOAD_DOCUMENT_LIST_ADRESSES_SUCCESS]: (state, { listAdresses }) => ({ ...state, listAdresses }),
    [Types.LOAD_DOCUMENT_LIST_SELLERS_SUCCESS]: (state, { listSellers }) => ({ ...state, listSellers }),
    [Types.LOAD_DOCUMENT_LIST_PROMOTERS_SUCCESS]: (state, { listPromoters }) => ({ ...state, listPromoters }),
    [Types.LOAD_DOCUMENT_LIST_CUSTOMERS_SUCCESS]: (state, { listCustomers }) => ({ ...state, listCustomers }),
    [Types.LOAD_DOCUMENT_LIST_CUSTOMER_SELLERS_SUCCESS]: (state, { listCustomerSellers }) => ({ ...state, listCustomerSellers }),
    [Types.LOAD_DOCUMENT_LIST_TYPES_SUCCESS]: (state, { listTypes }) => ({ ...state, listTypes }),
});
