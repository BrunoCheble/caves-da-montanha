import { call, put, select } from 'redux-saga/effects';
import qs from 'qs';

import api from '~/services/api';

import CustomerActions from '../ducks/customers';

import { customerModel, adresseModel, attendanceModel, contactModel, salesAnalysisModel, productModel, sellerModel } from '~/services/models/autoload';

export function* loadCustomerSession(id) {
    try {

        const customer = yield customerModel.findOne(id.id);
        customer.adresses = yield adresseModel.findAll('CLIENTE', id.id);

        const contacts = yield contactModel.findAllAssociatedByEntity('CLIENTE', id.id);
        yield put(CustomerActions.loadCustomerContactsSuccess(contacts));

        const historics = yield salesAnalysisModel.findAllHistoricByCustomer(id.id);
        yield put(CustomerActions.loadCustomerHistoricsSuccess(historics));

        const pending = yield salesAnalysisModel.findAllPendingByCustomer(id.id);
        yield put(CustomerActions.loadCustomerPendingSuccess(pending));

        const products = yield productModel.findAllSpecialPriceByCustomer(id.id);
        yield put(CustomerActions.loadCustomerProductsSuccess(products));

        yield put(CustomerActions.loadCustomerSalesSuccess([]));

        const days_week = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];

        for (let i = 0; i < customer.adresses.length; i++) {

            if (customer.adresses[i].id_contacto == '' && contacts.length > 0) {
                let { nome, email, telemovel } = contacts[0];
                customer.adresses[i] = { ...customer.adresses[i], nome, email, telemovel };
            }

            customer.adresses[i].attendances = [];

            let attendances = yield attendanceModel.findAll(customer.adresses[i].id);

            customer.adresses[i].attendances = attendances.map(attendance => [
                days_week[attendance.dia],
                attendance.manha_inicio,
                attendance.manha_fim,
                attendance.tarde_inicio,
                attendance.tarde_fim
            ]);
        }

        yield put(CustomerActions.loadCustomerSessionSuccess(customer));

    } catch (error) {
        yield put(CustomerActions.loadCustomerFailure());
    }
}

export function* loadCustomer(search) {
    try {
        yield put(
            CustomerActions.loadCustomerSuccess(yield customerModel.findAll(search.search))
        );
    } catch (error) {
        yield put(CustomerActions.loadCustomerFailure());
    }
}

export function* loadCustomerSales(data) {
    const { id, start, end, online } = data.data;
    let sales = [];

    if (!online) {
        sales = yield salesAnalysisModel.findAllSalesByCustomer(id, start, end);
    }
    else {

        const id_seller = yield select(state => state.auth.user.id_seller);
        const { vendedor_erp } = yield sellerModel.findOne(id_seller);
        const { cliente_erp } = yield customerModel.findOne(id);

        try {

            response = yield call(api.post, 'ConsultasOnLine/EstatisticasVendas', qs.stringify({
                Vendedor: vendedor_erp,
                DataInicio: start,
                DataFim: end,
                Cliente: cliente_erp
            }));

            if (response.status == 200) {
                sales = response.data.map(value => ({
                    ano: 2019,
                    artigo: value.Artigo,
                    qtd: value.QtdPeriodoN,
                    qtd_h: value.QtdPeriodoN_1,
                    valor: value.ValorPeriodoN,
                    valor_h: value.ValorPeriodoN_1,
                    margem: 0,
                    margem_h: 0
                }));
            }
        }
        catch (error) {
            alert('Houve uma falha de conexão, favor verifique sua internet.');
        }
    }
    
    yield put(CustomerActions.loadCustomerSalesSuccess(sales));
}
