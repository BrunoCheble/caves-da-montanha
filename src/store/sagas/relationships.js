import { call, select, put } from 'redux-saga/effects';

import RelationshipActions from '../ducks/forms/relationships';
import ContactActions from '../ducks/contacts';

import { externalEntityModel, relationshipModel, customerModel, sellerModel, contactModel } from '~/services/models/autoload';

import UUIDGenerator from 'react-native-uuid-generator';

export function* loadRelationship(id_contact) {
    try {

        const listTypeEntities = yield relationshipModel.findAllTypeEntities();
        const listTypeRelationships = yield relationshipModel.findAllTypeRelationships();

        yield put(RelationshipActions.loadRelationshipSuccess(id_contact.id_contact));

        yield put(RelationshipActions.loadListTypeEntitiesSuccess(listTypeEntities));
        yield put(RelationshipActions.loadListTypeRelationshipsSuccess(listTypeRelationships));

    } catch (error) {
        console.log(error);
        //yield put(ContactActions.loadContactFailure());
    }
}

export function* loadRelationshipListAssociates(typeEntity) {

    try {

        let listData = [];
        switch (typeEntity.typeEntity) {
            case 'CLIENTE':
                listData = yield customerModel.findAll('');
                break;
            case 'VENDEDOR':
                listData = yield sellerModel.findAll('');
                break;
            case 'CONTACTO':
                const id_contact = yield select(state => state.contact.session.id);
                listData = yield contactModel.findAllAnother(id_contact);
                break;
            case 'EXTERNA':
                listData = yield externalEntityModel.findAll('');
                break;
        }

        listData = listData.map((value) => ({ label: value.nome, value: value.id }));

        yield put(RelationshipActions.loadRelationshipListAssociatesSuccess(listData));

    } catch (error) {
        console.log(error);
        //yield put(ContactActions.loadContactFailure());
    }
}

export function* createRelationship(data) {    
    try {

        let id = "";
        yield UUIDGenerator.getRandomUUID().then((uuid) => { id = uuid; });

        const id_contact = yield select(state => state.contact.session.id);

        const { associate, typeEntity, typeRelationship } = data.data;

        const validate = yield relationshipModel.findExist(id_contact, associate, typeEntity);

        if (validate == 0) {

            yield relationshipModel.create({ id, id_contact, associate, typeEntity, typeRelationship });

            if (typeEntity == 'CONTACTO') {
                yield UUIDGenerator.getRandomUUID().then((uuid) => { id = uuid; });
                yield relationshipModel.create({ id, id_contact: associate, associate: id_contact, typeEntity, typeRelationship });
            }

            yield put(ContactActions.loadContactAssociatedSuccess(yield contactModel.findAllAssociated(id_contact, '')));
        }

    } catch (error) {
        console.log(error);
        //yield put(ContactActions.loadContactFailure());
    }
}