import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
// import Mergers from 'seamless-immutable-mergers';

/**
 * Action types & creators
 */
const { Types, Creators } = createActions({
    loadCustomerRequest: ['search'],
    loadCustomerSuccess: ['data'],
    loadCustomerFailure: null,
    loadCustomerSessionRequest: ['id'],
    loadCustomerSessionSuccess: ['session'],
    loadCustomerContactsSuccess: ['contacts'],
    loadCustomerSalesRequest: ['data'],
    loadCustomerSalesSuccess: ['sales'],
    loadCustomerHistoricsSuccess: ['historics'],
    loadCustomerProductsSuccess: ['products'],
    loadCustomerPendingSuccess: ['pending'],
});

export const CustomerTypes = Types;
export default Creators;

/**
 * Handlers
 */
const INITIAL_STATE = Immutable({
    data: [],
    session: {
        id: null,
        nome: null,
        nif: null,
    },
    contacts: [],
    sales: [],
    historics: [],
    products: [],
    pending: [],
});

/**
 * Reducer
 */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.LOAD_CUSTOMER_SUCCESS]: (state, { data }) => ({ ...state, data }),
    [Types.LOAD_CUSTOMER_SALES_SUCCESS]: (state, { sales }) => ({ ...state, sales }),
    [Types.LOAD_CUSTOMER_HISTORICS_SUCCESS]: (state, { historics }) => ({ ...state, historics }),
    [Types.LOAD_CUSTOMER_PENDING_SUCCESS]: (state, { pending }) => ({ ...state, pending }),
    [Types.LOAD_CUSTOMER_PRODUCTS_SUCCESS]: (state, { products }) => ({ ...state, products }),
    [Types.LOAD_CUSTOMER_SESSION_SUCCESS]: (state, { session }) => ({ ...state, session }),
    [Types.LOAD_CUSTOMER_CONTACTS_SUCCESS]: (state, { contacts }) => ({ ...state, contacts }),
});
