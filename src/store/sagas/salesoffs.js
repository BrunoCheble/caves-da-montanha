import { put, select } from 'redux-saga/effects';

import CustomerActions from '../ducks/customers';

import { salesoffModel, salesAnalysisModel } from '~/services/models/autoload';

import UUIDGenerator from 'react-native-uuid-generator';

export function* saveSalesoff(data) {

    let pending = yield select(state => state.customer.pending);
    let id_vendedor = yield select(state => state.auth.user.id_seller);
    let id_cliente_erp = yield select(state => state.customer.session.id);

    try {

        const salesoff = pending.filter((value, index) => value.isActive);

        if (salesoff.length > 0) {
            let id_liq_cab = '';
            yield UUIDGenerator.getRandomUUID().then((uuid) => { id_liq_cab = uuid; });

            const { paymentDate, paymentType } = data.data;
            
            yield salesoffModel.createHeader({ id_liq_cab, id_vendedor, id_cliente_erp, id_documento_erp: null, paymentDate, paymentType });

            for (let i = 0; i < salesoff.length; i++) {
                let { id_historico, liquidacao } = salesoff[i];
                let id = '';
                yield UUIDGenerator.getRandomUUID().then((uuid) => { id = uuid; });
                yield salesoffModel.createRow({ id, id_liq_cab, id_historico, liquidacao });
            }

            yield put(CustomerActions.loadCustomerPendingSuccess(yield salesAnalysisModel.findAllPendingByCustomer(id_cliente_erp)));

        }

    } catch (error) {
        console.log(error);
    }
}

export function* removeSalesoff(data) {

    let id_cliente_erp = yield select(state => state.customer.session.id);

    const { id, id_cab } = data.data;
    yield salesoffModel.deleteRow(id);

    yield salesoffModel.updateAllHeaderDate([id_cab]);
    yield salesoffModel.deleteAllHeaderEmpty();

    yield put(CustomerActions.loadCustomerPendingSuccess(yield salesAnalysisModel.findAllPendingByCustomer(id_cliente_erp)));
}