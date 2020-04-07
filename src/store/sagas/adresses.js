import { put, select } from 'redux-saga/effects';

import AdresseActions from '../ducks/adresses';

import { contactModel, attendanceModel, adresseModel } from '~/services/models/autoload';

import UUIDGenerator from 'react-native-uuid-generator';

export function* loadAdresseSession(id) {
    try {
        let adresse = yield adresseModel.findOne(id.id);

        if (adresse.id_contacto == '') {
            const contacts = yield contactModel.findAllAssociatedByEntity('CLIENTE', adresse.id_entidade);
            if (contacts.length > 0) {
                let { nome, email, telemovel } = contacts[0];
                adresse = { ...adresse, nome, email, telemovel };
            }
        }

        yield put(AdresseActions.loadAdresseSessionSuccess(adresse));
        yield put(AdresseActions.saveAttendancesFailure(false));

        const list_attendances = attendanceModel.getDefaultAttendances(yield attendanceModel.findAll(adresse.id));
        yield put(AdresseActions.loadAttendancesSuccess(list_attendances));

    } catch (error) {
        console.log(error);
    }
}

export function* updateAttendancesSession(data) {
    try {
        const { day, time, period, id_adresse } = data.data;

        let attendances = yield select(state => state.adresse.attendances);
        attendances = attendances.map((periods, index) => index == day ? periods.map((oldTime, timePeriod) => (timePeriod == period ? time : oldTime)) : periods);

        yield put(AdresseActions.saveAttendancesSaved(false));
        yield put(AdresseActions.loadAttendancesSuccess(attendances));
    }
    catch (error) {
        console.log(error);
    }
}

export function* saveLocation(data) {
    try {
        const { latitude, longitude } = data.data;

        let { id } = yield select(state => state.adresse.session);
        adresseModel.updateGeo(latitude, longitude, id);
        yield loadAdresseSession({ id });
    }
    catch (error) {
        console.log(error);
    }
}

export function* saveAttendances() {
    try {

        const attendances = yield select(state => state.adresse.attendances);
        const adresse = yield select(state => state.adresse.session);
        const validate = yield attendanceModel.validateAllIntervals(attendances);

        if (validate) {

            yield attendanceModel.deleteAllByAdresse(adresse.id);

            for (let i = 0; i < attendances.length; i++) {
                let [dia, manha_inicio, manha_fim, tarde_inicio, tarde_fim] = attendances[i];

                if ((manha_inicio != '' && manha_fim != '') || (tarde_inicio != '' && tarde_fim != '')) {
                    dia = i;
                    let id = '';
                    yield UUIDGenerator.getRandomUUID().then((uuid) => { id = uuid; });
                    yield attendanceModel.create({ id, id_endereco: adresse.id, dia, manha_inicio, manha_fim, tarde_inicio, tarde_fim });
                }
            }

            const list_attendances = attendanceModel.getDefaultAttendances(yield attendanceModel.findAll(adresse.id));
            yield put(AdresseActions.loadAttendancesSuccess(list_attendances));
        }

        yield put(AdresseActions.saveAttendancesSaved(validate));
        yield put(AdresseActions.saveAttendancesFailure(!validate));
    }
    catch (error) {
        console.log(error);
    }
}