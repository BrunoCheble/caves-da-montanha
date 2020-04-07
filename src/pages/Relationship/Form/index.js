import React, { useState, useEffect } from 'react';
import { Container, BoxInput, Buttons, SubmitBtn, SubmitText, BtnBack, TextBack, MsgErro } from './styles';

import SearchableDropdown from 'react-native-searchable-dropdown';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RelationshipActions from '~/store/ducks/forms/relationships';

import RNPickerSelect from 'react-native-picker-select';

const FormRelationship = ({ navigation, listAssociates, listTypeEntities, listTypeRelatioships, loadRelationshipRequest, loadRelationshipListAssociatesRequest, createRelationshipRequest }) => {

    const [typeEntity, setTypeEntity] = useState('');
    const [typeRelationship, setTypeRelationship] = useState('');
    const [associate, setAssociate] = useState('');
    const [erro, setErro] = useState('');

    handleAddRelationship = () => {

        if (associate == '' || typeRelationship == '' || typeEntity == '') {
            setErro('Todos os campos são obrigatórios');
            return;
        }
        setErro('');
        createRelationshipRequest({ typeEntity, associate, typeRelationship });
        navigation.navigate('ContactView');
        setTypeEntity('');
        setTypeRelationship('');
        setAssociate('');
    }

    handleChangeTypeEntity = (value) => {
        loadRelationshipListAssociatesRequest(value);
        setTypeEntity(value);
    }

    useEffect(() => {
        loadRelationshipRequest(navigation.getParam('id'));
        setErro('');
        setTypeEntity('');
        setTypeRelationship('');
        setAssociate('');
    }, [navigation.getParam('id')]);

    useEffect(() => {
        console.log(listAssociates);
    }, [listAssociates]);

    useEffect(() => {
        console.log(listTypeEntities);
    }, [listTypeEntities]);

    useEffect(() => {
        console.log(listTypeRelatioships);
    }, [listTypeRelatioships]);

    return (
        <Container>
            {erro != '' ? (<MsgErro>{erro}</MsgErro>) : (<></>)}
            <BoxInput>
                <RNPickerSelect
                    onValueChange={(value) => handleChangeTypeEntity(value)}
                    items={listTypeEntities}
                    value={typeEntity}
                    placeholder={{
                        label: 'Selecione o tipo de entidade',
                        value: null,
                    }}
                />

                <RNPickerSelect
                    onValueChange={(value) => setAssociate(value)}
                    items={listAssociates}
                    value={associate}
                    placeholder={{
                        label: 'Selecione',
                        value: null,
                    }}
                />

                <RNPickerSelect
                    onValueChange={(value) => setTypeRelationship(value)}
                    items={listTypeRelatioships}
                    value={typeRelationship}
                    placeholder={{
                        label: 'Selecione o tipo de relação',
                        value: null,
                    }}
                />

                <Buttons>
                    <BtnBack onPress={() => navigation.navigate('ContactView', { id: navigation.getParam('id') })}><TextBack>Voltar</TextBack></BtnBack>
                    <SubmitBtn onPress={() => handleAddRelationship()}><SubmitText>Guardar</SubmitText></SubmitBtn>
                </Buttons>

            </BoxInput>
        </Container>
    );
}

const mapStateToProps = state => ({
    listAssociates: state.relationship.listAssociates,
    listTypeEntities: state.relationship.listTypeEntities,
    listTypeRelatioships: state.relationship.listTypeRelatioships
});

const mapDispatchToProps = dispatch => bindActionCreators(RelationshipActions, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormRelationship);

/*
                <SearchableDropdown
                    onTextChange={text => console.log(text)}
                    onItemSelect={item => setAssociate(item.id)}
                    containerStyle={{ padding: 5 }}
                    textInputStyle={{
                        padding: 12,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        backgroundColor: '#FAF7F6',
                    }}
                    itemStyle={{
                        padding: 10,
                        marginTop: 2,
                        backgroundColor: '#FAF9F8',
                        borderColor: '#bbb',
                        borderWidth: 1,
                    }}
                    itemTextStyle={{
                        color: '#222',
                    }}
                    itemsContainerStyle={{
                        maxHeight: '60%',
                    }}
                    items={listAssociates}
                    placeholder="placeholder"
                    resetValue={resetValue}
                    underlineColorAndroid="transparent"
                />
    */