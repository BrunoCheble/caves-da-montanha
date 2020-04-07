import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert } from 'react-native';

import { BtnBack, TextBack, ModalTitle, TextHeader, TextBody, BtnSave, TextSave, Buttons, Header, Total, Payment, BtnPayment, PaymentText } from './styles';

import { Table, TableWrapper, Cell } from 'react-native-table-component';

import Color from '~/config/colors';

import { formatMoney, formatMoneyNegative, formatDate } from '~/assets/helper';
import { ViewColumn, ViewRow } from '~/assets/styles';

import { TextMask, TextInputMask } from 'react-native-masked-text';

import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';
import moment from "moment";
export default ModalPending = ({ pending, handleCloseModal, loadCustomerPendingSuccess, saveSalesoffRequest, removeSalesoffRequest }) => {

    const [totalPagar, setTotalpagar] = useState(0);
    const [totalPendente, setTotalPendente] = useState(0);
    const [totalLiquidado, setTotalLiquidado] = useState(0);
    const [totalDoc, setTotalDoc] = useState(0);
    const [paymentDate, setPaymentDate] = useState('');
    const [paymentType, setPaymentType] = useState('CHEQUE');

    handleSaveSalesoff = () => {
        const _totalPagar = pending.reduce((prev, next) => prev + next.liquidacao, 0);
        if(_totalPagar < 0) {
            alert('O total do valor À Receber não pode ser negativo.');
        }
        else {
            let date = paymentDate == '' ? moment().format('DD/MM/YYYY') : paymentDate;
            saveSalesoffRequest({ paymentType, paymentDate: moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD') });
        }
    }

    handleRemoveSalesoff = (item) => {
        Alert.alert(`Tem certeza que deseja remover o CHC de € ${item.valor_liquidado} ? `, '',
            [
                {},
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Sim, remover.', onPress: () => removeSalesoffRequest(item) },
            ],
            { cancelable: false },
        );
    }

    handleUpdatePending = (item) => {

        const positive = (item.liquidacao + item.valor_liquidado) > item.valor_total && item.liquidacao > item.valor_pendente && item.valor_pendente >= 0;
        const negative = (item.liquidacao - item.valor_liquidado) < item.valor_total && item.liquidacao < item.valor_pendente && item.valor_pendente <= 0;

        if (positive || negative) {
            item.liquidacao = (item.valor_total - item.valor_liquidado);
        }
        else if (item.liquidacao != 0) {
            item.isActive = true;
        }
        else {
            item.isActive = false;
        }

        item.valor_pendente = item.valor_total - (item.liquidacao + item.valor_liquidado);

        const _peding = pending.map((value, index) => item.id == value.id ? item : value);
        loadCustomerPendingSuccess(_peding);
    }

    const getElementDate = (value, style) => (<TextMask style={{ margin: 5, fontSize: 10, color: Color.primary, textAlign: 'center', ...style }} value={value} type={'datetime'} options={formatDate} />);
    const getElementValue = (value, style) => (<TextMask style={{ margin: 5, fontSize: 10, color: Color.primary, textAlign: 'right', ...style }} value={value} type={'money'} options={value < 0 ? formatMoneyNegative : formatMoney} />);

    const getElementRemove = (item) => <Icon onPress={() => handleRemoveSalesoff(item)} name="trash" size={20} color={Color.dark} />
    const getElementCheck = (item) => (
        item.isActive ?
            <Icon onPress={() => handleUpdatePending({ ...item, isActive: false, liquidacao: 0 })} name="check-square" size={30} color={Color.primary} /> :
            <Icon onPress={() => handleUpdatePending({ ...item, isActive: true, liquidacao: item.valor_pendente })} name="square-o" size={30} color={Color.primary} />);

    const getElementInputValue = (item) => (
        <TextInputMask
            value={item.liquidacao}
            type={'money'}
            options={item.valor_total < 0 ? formatMoneyNegative : formatMoney}
            onChangeText={(value) => handleUpdatePending({ ...item, liquidacao: parseFloat(value.replace('€ ', '').replace('.', '').replace(',', '.')) })}
            style={{ margin: 5, fontSize: 10, color: Color.primary, textAlign: 'center', height: 40 }} />
    );

    const getElementPayment = () => (
        paymentType == 'CHEQUE' ?
            <Icon onPress={() => setPaymentType('NUMERARIO')} style={{ textAlignVertical: 'center' }} name="check-square" size={30} color={Color.primary} /> :
            <Icon onPress={() => setPaymentType('CHEQUE')} style={{ textAlignVertical: 'center' }} name="square-o" size={30} color={Color.primary} />);

    const getElementPaymentDisabled = (cheque) => (
        cheque == 'CHEQUE' ?
            <Icon name="check-square" size={30} color={'#ccc'} /> :
            <Icon name="square-o" size={30} color={'#ccc'} />);

    useEffect(() => {
        const _totalPagar = pending.reduce((prev, next) => prev + next.liquidacao, 0);
        const _totalPende = pending.reduce((prev, next) => prev + next.valor_pendente, 0);
        const _totalLiqui = pending.filter((value, index) => value.estado == 'CHC').reduce((prev, next) => prev + next.valor_liquidado, 0);

        setTotalDoc(_totalPagar+_totalPende+_totalLiqui);
        setTotalLiquidado(_totalLiqui);
        setTotalPendente(_totalPende);
        setTotalpagar(_totalPagar);
    }, [pending]);

    const validateHandlePending = (item) => (((item.valor_liquidado < item.valor_total && item.valor_total > 0) || (item.valor_liquidado > item.valor_total && item.valor_total < 0)) && item.estado == 'PEN');

    return (
        <ScrollView>
            <ModalTitle>Pendentes</ModalTitle>

            <View style={{ padding: 10 }}>

                <Header>
                    <ViewRow>
                        <Total>Total Doc.: <TextMask value={totalDoc} type={'money'} options={formatMoney} /></Total>
                        <Total>Total Pendente: <TextMask value={totalPendente} type={'money'} options={formatMoney} /></Total>
                        <Total>Total CHC: <TextMask value={totalLiquidado} type={'money'} options={formatMoney} /></Total>
                    </ViewRow>
                </Header>

                <Table borderStyle={{ borderWidth: 1, borderColor: Color.soft }} style={{ marginBottom: 15 }}>

                    <TableWrapper key={0} style={{ flexDirection: 'row', height: 40, backgroundColor: Color.primary }} >
                        <Cell key={0} style={{ width: 30 }} data={<></>} />
                        <Cell key={1} style={{ width: 100 }} data={<TextHeader>Documento</TextHeader>} />
                        <Cell key={2} data={<TextHeader>Data Venc.</TextHeader>} />
                        <Cell key={3} data={<TextHeader>Total</TextHeader>} />
                        <Cell key={4} data={<TextHeader>Detalhe</TextHeader>} />
                        <Cell key={5} data={<TextHeader>À Receber</TextHeader>} />
                        <Cell key={6} style={{ width: 30 }} data={<TextHeader>CH</TextHeader>} />
                        <Cell key={7} data={<TextHeader>Data Pag.</TextHeader>} />
                        <Cell key={8} style={{ width: 30, justifyContent: 'center', alignItems: 'center' }} data={<TextHeader>ST</TextHeader>} />
                    </TableWrapper>

                    <TableWrapper key={1} style={{ flexDirection: 'row', height: 40 }} >
                        <Cell key={0} style={{ width: 30 }} data={<></>} />
                        <Cell key={1} style={{ width: 100 }} data={<></>} />
                        <Cell key={2} data={<></>} />
                        <Cell key={3} data={<></>} />
                        <Cell key={4} data={<></>} />
                        <Cell key={5} data={getElementValue(totalPagar, { textAlign: 'center', fontWeight: 'bold' })} />
                        <Cell key={6} style={{ width: 30 }} data={<></>} />
                        <Cell key={7} data={<></>} />
                        <Cell key={8} style={{ width: 30, justifyContent: 'center', alignItems: 'center' }} data={<></>} />
                    </TableWrapper>
                    {
                        pending.map((cellData, cellIndex) => (

                            <TableWrapper key={cellIndex} style={{ flexDirection: 'row', height: 30 }} >

                                <Cell key={0} style={{ width: 30, justifyContent: 'center', alignItems: 'center' }} data={(validateHandlePending(cellData) ? getElementCheck(cellData) : getElementRemove(cellData))} />
                                <Cell key={1} style={{ width: 100 }} data={
                                    <View style={{ justifyContent: 'center', textAlignVertical: 'center', margin: 5 }}>
                                        <TextBody style={{ fontWeight: 'bold', marginLeft: 0, marginBottom: 0, marginTop: 0 }}>{cellData.tipo_doc} {cellData.num_doc}/{cellData.serie}</TextBody>
                                        {getElementDate(cellData.data, { margin: 0, textAlign: 'left' })}
                                    </View>
                                } />
                                <Cell key={2} data={getElementDate(cellData.data_vencimento)} />
                                <Cell key={3} data={getElementValue(cellData.valor_total)} />
                                <Cell key={4} data={cellData.estado == 'CHC' ? getElementValue(cellData.valor_liquidado) : getElementValue(cellData.valor_pendente)} />
                                <Cell key={5} data={validateHandlePending(cellData) ? getElementInputValue(cellData) : <></>} />
                                <Cell key={6} style={{ width: 30, justifyContent: 'center', alignItems: 'center' }} data={cellData.estado == 'CHC' ? getElementPaymentDisabled(cellData.cheque) : (<></>)} />
                                <Cell key={7} data={cellData.estado == 'CHC' ? getElementDate(cellData.data) : (<></>)} />
                                <Cell key={8} style={{ width: 30, justifyContent: 'center', alignItems: 'center' }} data={<TextBody style={{ fontWeight: 'bold' }}>{cellData.estado}</TextBody>} />

                            </TableWrapper>
                        ))
                    }
                </Table>

                <ViewRow style={{ marginBottom: 40 }}>

                    <BtnBack onPress={() => handleCloseModal()}>
                        <TextBack>Voltar</TextBack>
                    </BtnBack>

                    <Payment>

                        {getElementPayment()}

                        <DatePicker
                            style={{ width: 150 }}
                            date={paymentDate}
                            mode="date"
                            format="DD/MM/YYYY"
                            confirmBtnText="Confirmar"
                            cancelBtnText="Cancelar"
                            customStyles={{
                                dateIcon: {
                                    bottom: 2,
                                },
                                dateInput: {
                                    bottom: 2,
                                    height: 28,
                                    alignItems: 'center',
                                    borderColor: Color.primary,
                                    justifyContent: 'center',
                                    alignContent: 'center',
                                    marginLeft: 10
                                }
                            }}
                            onDateChange={setPaymentDate}
                        />
                        <BtnSave onPress={() => handleSaveSalesoff()}>
                            <TextSave><Icon name="save" size={12} color="#fff" /> Gerar Recibo</TextSave>
                        </BtnSave>
                    </Payment>

                </ViewRow>
            </View>
        </ScrollView >
    );
}
