import { select, put } from 'redux-saga/effects';

import ContactActions from '../ducks/contacts';

import { contactModel, relationshipModel } from '~/services/models/autoload';

import UUIDGenerator from 'react-native-uuid-generator';

export function* loadContact(search) {
    try {
        yield put(
            ContactActions.loadContactSuccess(yield contactModel.findAll(search.search))
        );
    } catch (error) {
        console.log(error);
        yield put(ContactActions.loadContactFailure());
    }
}

export function* loadContactSession(id) {
    try {

        let contact = { id: null, nome: null, codtelemovel: null, telemovel: null, codtelemovelop: null, telemovelop: null, email: null, observacoes: null };
        let associates = [];

        if (id.id != null) {
            contact = yield contactModel.findOne(id.id);
            associates = yield contactModel.findAllAssociated(id.id, null);
        }

        yield put(ContactActions.loadContactSessionSuccess(contact));
        yield put(ContactActions.loadContactAssociatedSuccess(associates));

    } catch (error) {
        console.log(error);
        yield put(ContactActions.loadContactFailure());
    }
}

export function* loadContactAssociated(search) {

    try {

        const id = yield select(state => state.contact.session.id);

        yield put(ContactActions.loadContactAssociatedSuccess(yield contactModel.findAllAssociated(id, search.search)));

    } catch (error) {
        console.log(error);
        yield put(ContactActions.loadContactFailure());
    }
}

export function* removeRelationship(id) {

    try {
        yield relationshipModel.delete(id.id);
        yield loadContactAssociated({ search: '' });
    } catch (error) {
        console.log(error);
    }
}

export function* loadContactForm(id) {
    /*
    try {
        const dataBase = new Database();
        const contactModel = new ContactModel(dataBase.db);
        console.log(id);

    } catch (error) {
        console.log(error);
        yield put(ContactActions.loadContactFailure());
    }*/
}

export function* saveContact(data) {
    try {

        let { id, nome, email, codtelemovel, telemovel, codtelemovelop, telemovelop, observacoes } = data.data;
        
        let id_utilizador = yield select(state => state.auth.user.id);

        if (id == null) {
            yield UUIDGenerator.getRandomUUID().then((uuid) => { id = uuid; });
            yield contactModel.create({ id, nome, email, codtelemovel, telemovel, codtelemovelop, telemovelop, observacoes, id_utilizador });
        }
        else {
            yield contactModel.update({ nome, email, codtelemovel, telemovel, codtelemovelop, telemovelop, observacoes, id_utilizador }, id);
        }

        yield put(ContactActions.loadContactSessionSuccess({ id, nome, email, codtelemovel, telemovel, codtelemovelop, telemovelop, observacoes, id_utilizador }));
        yield put(ContactActions.loadContactSuccess(yield contactModel.findAll()));

    } catch (error) {
        console.log(error);
        //yield put(ContactActions.loadContactFailure());
    }
}