import React, { useState, useEffect } from 'react';

import {
    Container,
    Header,
    FlatList,
    Item,
    ViewColumn,
    ViewRow,
    Title,
    SubTitle,
    DelButton,
    BtnBack,
    TextBack,
    Nome,
    Telefone,
    TitleAssociated,
    ItemDetail,
    TipoRelacao,
    Observations,
    BtnEdit,
    TextBtnEdit
} from './styles';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ContactActions from '~/store/ducks/contacts';

import Icon from 'react-native-vector-icons/Entypo';

import Search from '~/components/Search';
import { formatTextPhone } from '~/assets/helper';

//import { Table, Row, Rows, TableWrapper, Cell } from 'react-native-table-component';

const ViewContact = ({ navigation, contact, associates, loadContactAssociatedRequest, removeRelationshipRequest, loadContactSessionRequest }) => {

    const [beforeid, setBeforeid ] = useState('');

    useEffect(() => {
        setBeforeid('');
    }, [navigation.getParam('id')]);

    handleActionAdd = () => {
        navigation.navigate('RelationshipForm', { id: navigation.getParam('id') });
    }

    handleClickAssociate = entity => {
        if(entity.tipo_entidade == 'CONTACTO') {
            setBeforeid(contact.id);
            loadContactSessionRequest(entity.id_entidade);
        }
    }

    handleBackPage = () => { 
        if(beforeid != '' && beforeid != contact.id) {
            loadContactSessionRequest(beforeid);
        }
        else {
            navigation.navigate('ContactScreen');
        }
    }

    return (
        <Container>
            <Header>
                <ViewRow>
                    <Title>{contact.nome}</Title>
                    <SubTitle>{formatTextPhone(contact.codtelemovel, contact.telemovel)} | {(contact.telemovelop != null && contact.telemovelop != '' ? formatTextPhone(contact.codtelemovelop, contact.telemovelop) + ' | ' : '')}{contact.email}</SubTitle>
                    <BtnEdit onPress={() => navigation.navigate('ContactForm', { id: contact.id })}>
                        <TextBtnEdit>Editar</TextBtnEdit>
                    </BtnEdit>
                </ViewRow>
                <Observations>Obs.: {contact.observacoes}</Observations>
            </Header>

            <TitleAssociated>Cliente(s) e Entidade(s) associadas</TitleAssociated>

            <Search addRequest={handleActionAdd} searchRequest={loadContactAssociatedRequest} />
            <FlatList
                data={associates}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item, index }) => (
                    <Item>
                        <ItemDetail onPress={() => handleClickAssociate(item)}>
                            <Nome>{item.nome}</Nome>
                            <ViewRow>
                                <Telefone>Tel.: {
                                    formatTextPhone(item.codtelefone,item.telefone)}
                                    {item.telefoneop != null && item.telefoneop != '' ? ' | '+formatTextPhone(item.codtelefoneop,item.telefoneop) : ''}
                                </Telefone>
                                <TipoRelacao>{item.tipo_relacao_contacto}</TipoRelacao>
                            </ViewRow>
                        </ItemDetail>
                        <DelButton onPress={() => removeRelationshipRequest(item.id)}><Icon name="minus" size={14} color="#FFF" /></DelButton>
                    </Item>
                )}
            />

            <BtnBack onPress={() => handleBackPage()}>
                <TextBack>Voltar</TextBack>
            </BtnBack>

        </Container>
    );
}

const mapStateToProps = state => ({
    contact: state.contact.session,
    associates: state.contact.associates
});

const mapDispatchToProps = dispatch => bindActionCreators(ContactActions, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewContact);

/*
<Table borderStyle={{ borderWidth: 1, borderColor: Color.soft }} style={{ marginTop: 10 }}>
<Row
    data={['Nome', 'Tipo de Entidade', 'Tipo de Relação','']}
    style={{ height: 40, backgroundColor: Color.primary }}
    textStyle={{ fontWeight: 'bold', fontSize: 11, textAlign: 'center', color: '#fff' }}
/>
{
    list.map((rowData, index) => (
        <TableWrapper key={index} style={{ flexDirection: 'row' }}>
            {
                rowData.map((cellData, cellIndex) => (
                    <Cell key={cellIndex} data={cellIndex === 3 ? (<BtnDel><Icon style={{ paddingHorizontal: 12, paddingVertical: 10 }} name="trash" size={20} color="#fff" /></BtnDel>) : cellData} textStyle={{ fontSize: 11, textAlign: 'center', color: Color.dark }} />
                ))
            }
        </TableWrapper>
    ))
}
</Table>
*/