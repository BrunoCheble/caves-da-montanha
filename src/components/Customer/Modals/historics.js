import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';

import { BtnBack, TextBack, ModalTitle, TextHeader, TextBody } from './styles';

import { Table, TableWrapper, Cell } from 'react-native-table-component';

import Color from '~/config/colors';

import { formatMoney, formatMoneyNegative, formatDate } from '~/assets/helper';
import { TextMask } from 'react-native-masked-text';

export default ModalHistorics = ({ historics, handleCloseModal }) => {

    const getElementDate = (value) => (<TextMask style={{ margin: 5, fontSize: 10, color: Color.primary, textAlign: 'center' }} value={value} type={'datetime'} options={formatDate} />);
    const getElementValue = (value) => (<TextMask style={{ margin: 5, fontSize: 10, color: Color.primary, textAlign: 'right' }} value={value} type={'money'} options={value < 0 ? formatMoneyNegative : formatMoney} />);

    return (
        <ScrollView>
            <ModalTitle>Histórico</ModalTitle>
            <View style={{ padding: 10 }}>

                <Table borderStyle={{ borderWidth: 1, borderColor: Color.soft }} style={{ marginBottom: 15 }}>
                    <TableWrapper key={0} style={{ flexDirection: 'row', height: 30, backgroundColor: Color.primary }} >
                        <Cell key={0} style={{ width: 150 }} data={<TextHeader>Documento</TextHeader>} />
                        <Cell key={1} data={<TextHeader>Data</TextHeader>} />
                        <Cell key={2} data={<TextHeader>Data Venc.</TextHeader>} />
                        <Cell key={3} data={<TextHeader>Data Liq.</TextHeader>} />
                        <Cell key={4} data={<TextHeader>Valor Total</TextHeader>} />
                        <Cell key={5} data={<TextHeader>Valor Pend.</TextHeader>} />
                        <Cell key={6} data={<TextHeader>Estado</TextHeader>} />
                    </TableWrapper>
                    {
                        historics.map((cellData, cellIndex) => (
                            <TableWrapper key={cellIndex} style={{ flexDirection: 'row' }} >
                                <Cell key={0} style={{ width: 150 }} data={<TextBody style={{ fontWeight: 'bold' }}>{cellData.tipo_doc} {cellData.num_doc}/{cellData.serie}</TextBody>} />
                                <Cell key={1} data={getElementDate(cellData.data)} />
                                <Cell key={2} data={getElementDate(cellData.data_vencimento)} />
                                <Cell key={3} data={getElementDate(cellData.data_liquidacao)} />
                                <Cell key={4} data={getElementValue(cellData.valor_total)} />
                                <Cell key={5} data={getElementValue(cellData.valor_pendente)} />
                                <Cell key={6} data={<TextBody>{cellData.estado}</TextBody>} />
                            </TableWrapper>
                        ))
                    }
                </Table>

                <BtnBack style={{ marginBottom: 40 }} onPress={() => handleCloseModal()}>
                    <TextBack>Voltar</TextBack>
                </BtnBack>
            </View>
        </ScrollView>
    );
}
