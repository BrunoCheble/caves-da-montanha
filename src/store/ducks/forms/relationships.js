import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
// import Mergers from 'seamless-immutable-mergers';

/**
 * Action types & creators
 */
const { Types, Creators } = createActions({
    loadRelationshipListAssociatesRequest: ['typeEntity'],
    loadRelationshipListAssociatesSuccess: ['listAssociates'],
    loadListTypeEntitiesSuccess: ['listTypeEntities'],
    loadListTypeRelationshipsSuccess: ['listTypeRelatioships'],
    loadRelationshipRequest: ['id_contact'],
    loadRelationshipSuccess: ['id_contact'],
    createRelationshipRequest: ['data'],
});

export const RelationshipTypes = Types;
export default Creators;

/**
 * Handlers
 */
const INITIAL_STATE = Immutable({
    listAssociates: [],
    listTypeEntities: [],
    listTypeRelatioships: [],
    id_contact: null
});

/**
 * Reducer
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.LOAD_RELATIONSHIP_SUCCESS]: (state, { id_contact }) => ({ ...state, id_contact }),
    [Types.LOAD_RELATIONSHIP_LIST_ASSOCIATES_SUCCESS]: (state, { listAssociates }) => ({ ...state, listAssociates }),
    [Types.LOAD_LIST_TYPE_ENTITIES_SUCCESS]: (state, { listTypeEntities }) => ({ ...state, listTypeEntities }),
    [Types.LOAD_LIST_TYPE_RELATIONSHIPS_SUCCESS]: (state, { listTypeRelatioships }) => ({ ...state, listTypeRelatioships }),
});
