import { put, select } from 'redux-saga/effects';

import DocumentActions from '../ducks/documents';
import ProductActions from '../ducks/products';
import CustomerActions from '../ducks/customers';

import FormDocumentActions from '../ducks/forms/documents';
import FormDocumentItemActions from '../ducks/forms/document_items';

import { transactionModel, adresseModel, customerModel, documentItemModel, documentModel } from '~/services/models/autoload';

import UUIDGenerator from 'react-native-uuid-generator';

export function* loadDocument(search) {
    try {
        yield put(
            DocumentActions.loadDocumentSuccess(yield documentModel.findAll(search.search))
        );
    } catch (error) {
        yield put(DocumentActions.loadDocumentFailure());
    }
}

export function* loadListFormDocument() {
    try {

        yield put(FormDocumentActions.loadDocumentListAdressesSuccess([]));

        let list = yield customerModel.findAll();
        list = list.map((item, index) => ({ value: item.id, label: item.name }));
        yield put(FormDocumentActions.loadDocumentListCustomersSuccess(list));
        yield put(FormDocumentActions.loadDocumentListTypesSuccess(yield transactionModel.findAll()));

    } catch (error) {
        yield put(FormDocumentActions.loadDocumentSessionFailure());
    }
}

export function* loadListAdresses(id) {

    try {
        let list = yield adresseModel.findAll('CLIENTE', id.id);
        list = list.map((item, index) => ({ value: item.id, label: item.localidade }));

        yield put(FormDocumentActions.loadDocumentListAdressesSuccess(list));
    } catch (error) {
        yield put(FormDocumentActions.loadDocumentListAdressesSuccess([]));
    }
}

export function* loadDocumentSession(data) {
    try {
        console.log(' ----------- LOAD DOCUMENT SESSION -----------');

        const document = yield documentModel.findOne(data.data.id);

        let document_id = null;

        if (document.id_estado == 'RASCUNHO') {
            document_id = document.id;
        }
        else {
            const customer = yield customerModel.findOne(document.id_cliente_erp);
            yield put(CustomerActions.loadCustomerSessionSuccess(customer));
        }

        yield put(ProductActions.toggleDocument(document_id));

        yield put(FormDocumentActions.loadDocumentSessionSuccess(document));
        yield loadDocumentItem(document.id);

    } catch (error) {
        yield put(FormDocumentActions.loadDocumentSessionFailure());
    }
}

export function* saveDocument(data) {
    try {

        console.log(' ----------- SAVE DOCUMENT -----------');

        let { id, id_cliente_erp, id_endereco, id_tipo_transacao } = data.data;

        yield documentModel.update({ id_cliente_erp, id_endereco, id_tipo_transacao }, id);

        yield loadDocumentSession(data);

    } catch (error) {
        console.log(error);
        yield put(FormDocumentActions.loadDocumentSessionFailure());
    }
}

export function* finishDocument(id) {
    try {
        yield documentModel.updateStatus('FINALIZADO', id.id);
        yield put(ProductActions.toggleDocument(null));
        yield put(DocumentActions.loadDocumentSuccess(yield documentModel.findAll('')));
    }
    catch (error) {
        console.log(error);
    }
}

export function* updblockDocument(data) {
    try {
        const { block, motivo, id } = data.data;

        yield documentModel.updateBlock(block, motivo, id);
        yield put(ProductActions.toggleDocument(null));
        yield put(DocumentActions.loadDocumentSuccess(yield documentModel.findAll('')));
    }
    catch (error) {
        console.log(error);
    }
}

export function* createDocument() {

    try {

        let id_vendedor = yield select(state => state.auth.user.id_seller);
        let id = '';

        yield UUIDGenerator.getRandomUUID().then((uuid) => {
            id = uuid;
        });

        _customer = yield customerModel.findFirst();

        let id_cliente_erp = _customer.id;
        let id_tipo_transacao = _customer.id_tipo_transacao;

        _adresse = yield adresseModel.findOneMainAdresse('CLIENTE', id_cliente_erp);
        let id_endereco = _adresse.id;

        yield documentModel.create({ id, id_vendedor, id_cliente_erp, id_tipo_transacao, id_endereco });

        yield loadDocumentSession({ data: { id, id_vendedor, id_cliente_erp, id_tipo_transacao } });

    } catch (error) {
        console.log(error);
    }
}

export function* createDocumentCustomer(customer) {

    try {

        let id_vendedor = yield select(state => state.auth.user.id_seller);
        let id = '';

        yield UUIDGenerator.getRandomUUID().then((uuid) => {
            id = uuid;
        });

        _customer = yield customerModel.findOne(customer.customer);

        let id_cliente_erp = _customer.id;
        let id_tipo_transacao = _customer.id_tipo_transacao;

        _adresse = yield adresseModel.findOneMainAdresse('CLIENTE', id_cliente_erp);
        let id_endereco = _adresse.id;

        yield documentModel.create({ id, id_vendedor, id_cliente_erp, id_tipo_transacao, id_endereco });

        yield loadDocumentSession({ data: { id, id_vendedor, id_cliente_erp, id_tipo_transacao } });

    } catch (error) {
        console.log(error);
    }
}

export function* loadDocumentItem(id) {
    try {
        yield put(FormDocumentItemActions.loadDocumentItemSuccess(yield documentItemModel.findAllByDocument(id)));
    } catch (error) {
        yield put(FormDocumentItemActions.loadDocumentFailure());
    }
}

export function* loadSuggestion() {
    try {

        const document = yield documentModel.findOne(yield select(state => state.product.document));

        const listByProducts = yield documentItemModel.findAllSuggestiveProducts(document.id);
        let ignoredProducts = listByProducts.map((value,index) => value.id);
        const listBySales = yield documentItemModel.findAllSuggestiveProductsByCustomer(document.id_cliente_erp, document.id, ignoredProducts);
        
        yield put(FormDocumentItemActions.loadSuggestionSuccess([
            ...listByProducts,
            ...listBySales
        ]));

    } catch (error) {
        yield put(FormDocumentItemActions.loadSuggestionFailure());
    }
}

export function* updateListDocumentItens(data) {
    let listDocumentItem = yield select(state => state.formDocumentItem.data);
    listDocumentItem = listDocumentItem.map((item) => (item.id_artigo == data.id_artigo ? data : item));
    yield put(FormDocumentItemActions.loadDocumentItemSuccess(listDocumentItem));
}

export function* updateListProducts(data) {

    const { quantidade, preco, desconto, oferta, id_artigo } = data;

    let listProduct = yield select(state => state.product.data);
    listProduct = listProduct.map((item) => (item.id == id_artigo ? { ...item, quantidade, preco, desconto, oferta } : item));
    yield put(ProductActions.loadProductSuccess(listProduct));
}

export function* saveDocumentItem(data) {
    try {
        const id_cab = yield select(state => state.product.document);
        let { quantidade, preco, id_artigo, oferta, desconto, id_iva } = data.data;

        if (String(preco).includes('€ ')) {
            preco = parseFloat(preco.replace('€ ', '').replace('.', '').replace(',', '.'));
        }

        var numberInt = /^\d+$/;
        const erroQtd = (!numberInt.test(quantidade) && quantidade != '');
        const erroOferta = (!numberInt.test(oferta) && oferta != '');
        const erroDesconto = (!numberInt.test(desconto) && desconto != '') || desconto > 99;

        if (erroQtd || erroOferta || erroDesconto) {
            return;
        }

        /* Update List Products */
        yield updateListProducts({ quantidade, preco, desconto, oferta, id_artigo });
        yield updateListDocumentItens(data.data);

        if (quantidade === '') {
            return;
        }

        const documentItem = yield documentItemModel.findOneByProductAndDocument(id_artigo, id_cab);
        // Caso exista, é para atualizar

        if (documentItem != null) {
            documentItemModel.update({ quantidade, oferta, preco, desconto }, documentItem.id);
        }
        else {
            let id = "";
            yield UUIDGenerator.getRandomUUID().then((uuid) => { id = uuid; });
            documentItemModel.create({ id, id_cab, id_artigo, quantidade, preco, oferta, desconto, id_iva });
        }

        yield loadDocumentSession({ data: { id: id_cab } });

    } catch (error) {
        console.log(error);
        yield put(FormDocumentItemActions.loadDocumentItemSuccess([]));
    }
}

export function* addDocumentItem(data) {

    let { preco, id_artigo, id_iva } = data.data;
    let quantidade = 1;
    let oferta = 0;
    let desconto = 0;
    const id_cab = yield select(state => state.product.document);

    let listDocumentItem = yield select(state => state.formDocumentItem.data);

    let exist = yield listDocumentItem.filter((data, index) => data.id_artigo == id_artigo);

    if (exist.length == 0) {

        exist = yield documentItemModel.findOneByProductAndDocument(id_artigo,id_cab);

        if(exist == null) {
            let id = "";
            yield UUIDGenerator.getRandomUUID().then((uuid) => { id = uuid; });
            yield documentItemModel.create({ id, id_cab, id_artigo, preco, id_iva, quantidade, oferta, desconto });
            yield updateListProducts({ quantidade, preco, desconto, oferta, id_artigo });
        }

        yield loadDocumentSession({ data: { id: id_cab } });
    }
}

export function* removeDocument(id) {
    try {
        
        const document = yield documentModel.findOne(id.id);

        let document_id = null;

        if (document.id_estado == 'FINALIZADO' || document.id_estado == 'RASCUNHO') {
            yield documentModel.delete(id.id);
            yield documentItemModel.deleteAllByDocument(id.id);
        }
        else {
            yield documentModel.closeDocument(id.id);
        }

        yield put(ProductActions.toggleDocument(null));
        yield put(DocumentActions.loadDocumentSuccess(yield documentModel.findAll('')));
    } catch (error) {
        console.log(error);
    }
}

/*export function* updateQttProduct(product) {
    // Valida se existe;
    // Caso seja igual a zero delete document_itens
    // Caso exista update document_itens
    // Caso não exista insert document_itens
    // Busca product na lista e atualiza
}*/