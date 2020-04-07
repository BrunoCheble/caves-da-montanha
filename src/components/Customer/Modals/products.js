import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';

import { BtnBack, TextBack, ModalTitle } from './styles';

import { formatMoney, formatMoneyNegative, formatPercent } from '~/assets/helper';

import { Table, TableWrapper, Cell } from 'react-native-table-component';
import { TextMask } from 'react-native-masked-text';

import Color from '~/config/colors';

export default ModalProducts = ({ products, handleCloseModal }) => (
    <ScrollView>
        <ModalTitle>Preços de Artigos</ModalTitle>
        <View style={{ padding: 10 }}>
            <Table borderStyle={{ borderWidth: 1, borderColor: Color.soft }} style={{ marginBottom: 15 }}>
                <TableWrapper key={0} style={{ flexDirection: 'row', height: 40, backgroundColor: Color.primary }} >
                    <Cell key={0} data={<Text style={{ margin: 10, fontSize: 11, color: '#FFF', fontWeight: 'bold', textAlign: 'center' }}>Artigo</Text>} />
                    <Cell key={1} style={{ width: 100 }} data={<Text style={{ margin: 10, fontSize: 11, color: '#FFF', fontWeight: 'bold', textAlign: 'center' }}>Preço</Text>} />
                </TableWrapper>
                {
                    products.map((cellData, cellIndex) => (
                        <TableWrapper key={cellIndex} style={{ flexDirection: 'row' }} >
                            <Cell key={0} data={<Text style={{ margin: 10, fontSize: 11, color: Color.primary, fontWeight: 'bold' }}>{cellData.artigo}</Text>} />
                            <Cell key={1} style={{ width: 100 }} data={
                                <TextMask style={{ margin: 10, fontSize: 11, color: Color.primary, textAlign: 'right' }} value={cellData.preco} type={'money'} options={cellData.preco < 0 ? formatMoneyNegative : formatMoney} />
                            } />
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