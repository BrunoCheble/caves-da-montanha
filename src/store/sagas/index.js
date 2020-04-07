import { all, takeLatest } from 'redux-saga/effects';

/* Get Types */
import { AuthTypes } from '../ducks/auths';
import { CustomerTypes } from '../ducks/customers';
import { AdresseTypes } from '../ducks/adresses';
import { ContactTypes } from '../ducks/contacts';
import { DocumentTypes } from '../ducks/documents';
import { ProductTypes } from '../ducks/products';
import { SyncTypes } from '../ducks/syncs';
import { SettingsTypes } from '../ducks/settings';
import { SalesoffTypes } from '../ducks/salesoffs';

/* Get Types From forms */
import { FormDocumentTypes } from '../ducks/forms/documents';
import { FormDocumentItemTypes } from '../ducks/forms/document_items';
import { RelationshipTypes } from '../ducks/forms/relationships';

/* Get Actions from Saga */
import { loadAuth, loadAuthSession } from './auths';
import { loadCustomer, loadCustomerSession, loadCustomerSales } from './customers';
import { loadContact, loadContactSession, loadContactAssociated, removeRelationship, loadContactForm, saveContact } from './contacts';
import { loadAdresseSession, updateAttendancesSession, saveAttendances, saveLocation } from './adresses';
import {
    loadDocument,
    loadDocumentSession,
    saveDocument,
    createDocument,
    createDocumentCustomer,
    loadListFormDocument,
    loadDocumentItem,
    saveDocumentItem,
    addDocumentItem,
    loadSuggestion,
    loadListAdresses,
    finishDocument,
    updblockDocument, 
    removeDocument 
} from './documents';

import { loadProduct, loadViewProduct } from './products';
import { loadSync, loadSyncComplete, loadSyncReset } from './syncs';
import { loadRelationship, loadRelationshipListAssociates, createRelationship } from './relationships';
import { loadSetting } from './settings';
import { saveSalesoff, removeSalesoff } from './salesoffs';

export default function* rootSaga() {
    yield all([
        takeLatest(AuthTypes.LOAD_AUTH_SESSION_REQUEST, loadAuthSession),
        takeLatest(AuthTypes.LOAD_AUTH_REQUEST, loadAuth),

        takeLatest(SyncTypes.LOAD_SYNC_REQUEST, loadSync),
        takeLatest(SyncTypes.LOAD_SYNC_RESET_REQUEST, loadSyncReset),
        takeLatest(SyncTypes.LOAD_SYNC_COMPLETE_REQUEST, loadSyncComplete),

        takeLatest(ContactTypes.LOAD_CONTACT_REQUEST, loadContact),
        takeLatest(ContactTypes.LOAD_CONTACT_FORM_REQUEST, loadContactForm),
        
        takeLatest(ContactTypes.LOAD_CONTACT_SESSION_REQUEST, loadContactSession),
        takeLatest(ContactTypes.LOAD_CONTACT_ASSOCIATED_REQUEST, loadContactAssociated),
        takeLatest(ContactTypes.REMOVE_RELATIONSHIP_REQUEST, removeRelationship),
        takeLatest(ContactTypes.SAVE_CONTACT_REQUEST, saveContact),

        takeLatest(CustomerTypes.LOAD_CUSTOMER_REQUEST, loadCustomer),
        takeLatest(CustomerTypes.LOAD_CUSTOMER_SESSION_REQUEST, loadCustomerSession),
        takeLatest(CustomerTypes.LOAD_CUSTOMER_SALES_REQUEST, loadCustomerSales),
        
        takeLatest(ProductTypes.LOAD_PRODUCT_REQUEST, loadProduct),
        takeLatest(ProductTypes.LOAD_VIEW_PRODUCT_REQUEST, loadViewProduct),
        
        takeLatest(DocumentTypes.LOAD_DOCUMENT_REQUEST, loadDocument),

        takeLatest(FormDocumentItemTypes.LOAD_DOCUMENT_ITEM_REQUEST, loadDocumentItem),
        takeLatest(FormDocumentItemTypes.SAVE_DOCUMENT_ITEM_REQUEST, saveDocumentItem),
        takeLatest(FormDocumentItemTypes.ADD_DOCUMENT_ITEM_REQUEST, addDocumentItem),
        takeLatest(FormDocumentItemTypes.LOAD_SUGGESTION_REQUEST, loadSuggestion),

        takeLatest(FormDocumentTypes.LOAD_LIST_FORM_DOCUMENT_REQUEST, loadListFormDocument),
        takeLatest(FormDocumentTypes.LOAD_LIST_ADRESSES_REQUEST, loadListAdresses),
        takeLatest(FormDocumentTypes.LOAD_DOCUMENT_SESSION_REQUEST, loadDocumentSession),

        takeLatest(FormDocumentTypes.REMOVE_DOCUMENT_REQUEST, removeDocument),
        takeLatest(FormDocumentTypes.FINISH_DOCUMENT_REQUEST, finishDocument),
        takeLatest(FormDocumentTypes.UPDBLOCK_DOCUMENT_REQUEST, updblockDocument),
        takeLatest(FormDocumentTypes.SAVE_DOCUMENT_REQUEST, saveDocument),
        takeLatest(FormDocumentTypes.CREATE_DOCUMENT_REQUEST, createDocument),
        takeLatest(FormDocumentTypes.CREATE_DOCUMENT_CUSTOMER_REQUEST, createDocumentCustomer),

        takeLatest(AdresseTypes.LOAD_ADRESSE_SESSION_REQUEST, loadAdresseSession),
        takeLatest(AdresseTypes.UPDATE_ATTENDANCES_SESSION_REQUEST, updateAttendancesSession),
        takeLatest(AdresseTypes.SAVE_ATTENDANCES_REQUEST, saveAttendances),
        takeLatest(AdresseTypes.SAVE_LOCATION_REQUEST, saveLocation),

        takeLatest(RelationshipTypes.LOAD_RELATIONSHIP_REQUEST, loadRelationship),
        takeLatest(RelationshipTypes.LOAD_RELATIONSHIP_LIST_ASSOCIATES_REQUEST, loadRelationshipListAssociates),
        takeLatest(RelationshipTypes.CREATE_RELATIONSHIP_REQUEST, createRelationship),

        takeLatest(SettingsTypes.LOAD_SETTING_REQUEST, loadSetting),
        takeLatest(SalesoffTypes.SAVE_SALESOFF_REQUEST, saveSalesoff),
        takeLatest(SalesoffTypes.REMOVE_SALESOFF_REQUEST, removeSalesoff),
    ]);
}
