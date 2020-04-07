import React, { useEffect, useState } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';

import { Container, Buttons, Title, SubTitle, NomeContato, BtnBack, TextBack, BtnSave, TextSave, BtnLocation, BtnMap, Erro, Header } from './styles';
import OpenMap from "react-native-open-map";

import Icon from 'react-native-vector-icons/Entypo';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AdresseActions from '~/store/ducks/adresses';
import CustomerActions from '~/store/ducks/customers';

import { Table, Row, Rows, TableWrapper, Cell } from 'react-native-table-component';

import { TextInputMask } from 'react-native-masked-text';
import Color from '~/config/colors';

const ViewAdresse = ({ navigation, adresse, erro, saved, attendances, loadAdresseSessionRequest, updateAttendancesSessionRequest, saveAttendancesRequest, loadCustomerSessionRequest, saveLocationRequest }) => {

    handleUpdateAttendances = (day, period, time) => {
        updateAttendancesSessionRequest({ day, period, time, id_adresse: adresse.id });
    }

    handleSaveLocation = () => {
        getPosition();
    }

    handleSaveAttendance = () => {
        saveAttendancesRequest();
    }


    handleBackToCustomer = () => {
        loadCustomerSessionRequest(adresse.id_entidade);
        navigation.navigate(navigation.getParam('goback'));
    }

    useEffect(() => {
        loadAdresseSessionRequest(navigation.getParam('id'));
    }, [navigation.getParam('id')]);

    useEffect(() => {
        if (saved) {
            handleBackToCustomer();
        }
    }, [saved]);

    const getPosition = async () => {
        Geolocation.getCurrentPosition((position) => {
            saveLocationRequest({ latitude: position.coords.latitude, longitude: position.coords.longitude });
        },
        (error) => {
            alert(error.message);
            console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 });
    };

    return (
        <React.Fragment>
            <Container>
                <Header>
                    <Title>{adresse.morada}</Title>
                    <SubTitle>{adresse.localidade} | {adresse.cod_postal_local} | {adresse.distrito} | {adresse.pais}</SubTitle>
                    <NomeContato>Contacto: {adresse.nome} | {adresse.telemovel} | {adresse.email}</NomeContato>
                </Header>

                <Title>Horário de Atendimento </Title>
                {erro ? (<Erro>Alguns horários estavam inválidos e foram desconsiderados</Erro>) : <></>}
                {
                    attendances.length > 0 ? (
                        <Table borderStyle={{ borderWidth: 1, borderColor: Color.soft }} style={{ marginTop: 10 }}>
                            <Row data={[
                                '',
                                'Manhã Início',
                                'Manhã Fim',
                                'Tarde Início',
                                'Tarde Fim',
                            ]} style={{ height: 35, backgroundColor: Color.primary }} textStyle={{ fontWeight: 'bold', fontSize: 10, textAlign: 'center', color: '#fff' }} />
                            {
                                attendances.map((rowData, day) => (
                                    <TableWrapper key={day} style={{ height: 35, flexDirection: 'row' }}>
                                        {
                                            rowData.map((time, period) => (
                                                <Cell key={period}
                                                    textStyle={{ fontWeight: 'bold', fontSize: 10, textAlign: 'center', color: '#fff', textAlignVertical: 'center' }}
                                                    style={{ flex: 1, backgroundColor: Color.primary }}
                                                    data={
                                                        period > 0 ? (
                                                            <TextInputMask
                                                                onChangeText={(new_time) => handleUpdateAttendances(day, period, new_time)}
                                                                value={time}
                                                                type={'datetime'}
                                                                options={{ format: 'HH:mm' }}
                                                                style={{ backgroundColor: '#FFF', textAlign: 'center', fontSize: 10, color: '#0d0d0d' }} />
                                                        ) : time
                                                    } />
                                            ))
                                        }
                                    </TableWrapper>
                                ))
                            }
                        </Table>
                    ) : (<></>)
                }

                <Buttons>
                    <BtnBack onPress={() => handleBackToCustomer()}>
                        <TextBack><Icon name="back" size={12} color="#fff" /> Voltar</TextBack>
                    </BtnBack>
                    {
                        adresse.latitude != 0 ? (
                            <BtnMap onPress={() => { OpenMap.show({ latitude: adresse.latitude, longitude: adresse.longitude }); getPosition(); }}>
                                <TextSave><Icon name="map" size={12} color="#fff" /> Abrir Mapa</TextSave>
                            </BtnMap>
                        ) : <></>
                    }

                    <BtnLocation onPress={() => handleSaveLocation()}>
                        <TextSave><Icon name="location" size={12} color="#fff" /> Atualizar Localização</TextSave>
                    </BtnLocation>
                    <BtnSave onPress={() => handleSaveAttendance()}>
                        <TextSave><Icon name="save" size={12} color="#fff" /> Guardar Horários</TextSave>
                    </BtnSave>
                </Buttons>
            </Container >
        </React.Fragment>
    );
}
/* 

*/
const mapStateToProps = state => ({
    adresse: state.adresse.session,
    attendances: state.adresse.attendances,
    erro: state.adresse.error_attendaces,
    saved: state.adresse.saved_attendaces
});

const mapDispatchToProps = dispatch => bindActionCreators(Object.assign({}, AdresseActions, CustomerActions), dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewAdresse);
