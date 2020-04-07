import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';

import { BtnBack, TextBack, ModalTitle, TextHeader } from './styles';

import { Table, Row, Rows, TableWrapper, Cell } from 'react-native-table-component';

import { TextMask } from 'react-native-masked-text';

import { formatMoney } from '~/assets/helper';

import Color from '~/config/colors';

export default ModalPrices = ({ product, handleCloseModal }) => {

    const [valuesProduct, setValuesProduct] = useState([]);
    const [iec, setIEC] = useState(0);
    const headersValues = [
        'Tabela',
        'Consumidor Final',
        'Horeca',
        'Garrafeira',
        'Cash',
        'Distribuidor',
        'Grandes Superfícies',
        'Export',
    ];

    useEffect(() => {
        setValuesProduct([
            product.preco_tabela,
            product.preco_consumidor_final,
            product.preco_horeca,
            product.preco_garrafeira,
            product.preco_cash,
            product.preco_distribuidor,
            product.preco_venda_grande_superfice,
            product.preco_mercado_internacional
        ]);
        setIEC(product.valor_taxa);
    }, [product]);

    return (
        <ScrollView>
            <ModalTitle>Consulta de Preços</ModalTitle>
            <View style={{ padding: 10 }}>
                <Table borderStyle={{ borderWidth: 1, borderColor: Color.soft }} style={{ marginBottom: 15 }}>
                    <TableWrapper key={0} style={{ flexDirection: 'row', height: 30, backgroundColor: Color.primary }} >
                        <Cell key={0} style={{ width: 150 }} data={<TextHeader>Tipos</TextHeader>} />
                        <Cell key={1} data={<TextHeader>PV CM</TextHeader>} />
                        <Cell key={2} data={<TextHeader>IEC</TextHeader>} />
                        <Cell key={3} data={<TextHeader>PV CM + IEC</TextHeader>} />
                        <Cell key={4} data={<TextHeader>PVP (s/IVA)</TextHeader>} />
                        <Cell key={5} data={<TextHeader>PVP</TextHeader>} />
                    </TableWrapper>
                    {
                        valuesProduct.map((cellData, cellIndex) => (
                            <TableWrapper key={cellIndex} style={{ flexDirection: 'row' }} >
                                <Cell
                                    key={0}
                                    style={{ width: 150 }} 
                                    data={<Text style={{ margin: 5, fontSize: 12, fontWeight: 'bold', color: Color.dark }}>{headersValues[cellIndex]}</Text>}
                                />
                                <Cell
                                    key={1}
                                    data={<TextMask value={cellData} type={'money'} options={formatMoney} style={{ fontWeight: 'bold', textAlign: 'center', margin: 5, fontSize: 11, color: Color.primary }} />}
                                />
                                <Cell
                                    key={2}
                                    data={<TextMask value={iec} type={'money'} options={formatMoney} style={{ fontWeight: 'bold', textAlign: 'center', margin: 5, fontSize: 11, color: Color.primary }} />}
                                />
                                <Cell
                                    key={3}
                                    data={<TextMask value={(iec+cellData)} type={'money'} options={formatMoney} style={{ fontWeight: 'bold', textAlign: 'center', margin: 5, fontSize: 11, color: Color.primary }} />}
                                />
                                <Cell
                                    key={4}
                                    data={<TextMask value={0} type={'money'} options={formatMoney} style={{ fontWeight: 'bold', textAlign: 'center', margin: 5, fontSize: 11, color: Color.primary }} />}
                                />
                                <Cell
                                    key={5}
                                    data={<TextMask value={0} type={'money'} options={formatMoney} style={{ fontWeight: 'bold', textAlign: 'center', margin: 5, fontSize: 11, color: Color.primary }} />}
                                />
                            </TableWrapper>
                        ))
                    }
                </Table>

                <BtnBack onPress={() => handleCloseModal()}>
                    <TextBack>Voltar</TextBack>
                </BtnBack>
            </View>
        </ScrollView>
    );
}
