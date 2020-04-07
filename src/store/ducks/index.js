import { combineReducers } from 'redux';
import { reducer as auth } from './auths';
import { reducer as customer } from './customers';
import { reducer as contact } from './contacts';
import { reducer as document } from './documents';
import { reducer as formDocument } from './forms/documents';
import { reducer as formDocumentItem } from './forms/document_items';
import { reducer as relationship } from './forms/relationships';
import { reducer as product } from './products';
import { reducer as adresse } from './adresses';
import { reducer as sync } from './syncs';
import { reducer as setting } from './settings';
import { reducer as salesoff } from './salesoffs';

const reducers = combineReducers({
    auth,
    customer,
    contact,
    document,
    formDocument,
    formDocumentItem,
    product,
    sync,
    adresse,
    relationship,
    setting,
    salesoff
});

export default reducers;
