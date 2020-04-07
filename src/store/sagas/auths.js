import DeviceInfo from 'react-native-device-info';
import { put, call } from 'redux-saga/effects';
import api from '~/services/api';
import qs from 'qs';

import AuthActions from '../ducks/auths';

import { userModel } from '~/services/models/autoload';

export function* loadAuth(data) {
    console.log('%c Execute load Auth', 'background: #222; color: #bada55; font-weight: bold; font-size: 16px;');
    try {
        const response = yield call(api.post, 'Utilizadores/UtilizadorValido', qs.stringify({
            'login' : data.user.username,
            'password' : data.user.password,
            'perfil': 'ADMIN',
            'deviceID': DeviceInfo.getUniqueID()
        }));
        
        if (response.status == 200) {
            
            yield userModel.create(response.data);
            
            const { IdClienteERP, IdVendedorERP, IdUtilizador, Nome, Email, Login, Password } = response.data;
            
            yield put(AuthActions.loadAuthSuccess({
                id: IdUtilizador,
                id_seller: IdVendedorERP,
                id_customer: IdClienteERP,
                name: Nome,
                email: Email,
                username: Login,
                password: Password
            }));
        }
        
    } catch (error) {
        alert('Houve uma falha de conexão, favor verifique sua internet.');
        yield put(AuthActions.loadAuthFailure());
    }
}

export function* loadAuthSession() {
    console.log('%c Execute load Session', 'background: #222; color: #bada55; font-weight: bold; font-size: 16px;');
    try {
        const user = yield userModel.findOne();
        yield put(AuthActions.loadAuthSuccess(user));
    } catch (error) {
        yield put(AuthActions.loadAuthFailure());
    }
}
