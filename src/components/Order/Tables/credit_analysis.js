import React, { useEffect, useState } from 'react';
import { PixelRatio } from 'react-native';

import { Table, Row, Rows, TableWrapper, Cell } from 'react-native-table-component';
import { TextMask } from 'react-native-masked-text';
import Color from '~/config/colors';

import { formatMoney, formatMoneyNegative, getColorDisponibilidade } from '~/assets/helper';

export default TableCredit = ({ document }) => {

    const [valuesCustomer, setValuesCustomer] = useState([]);

    useEffect(() => {
        setValuesCustomer([
            document.dispo,
            document.limite_saldo_valor,
            document.valor_contencioso,
            document.valor_pend_menor_com_cheque,
            document.valor_pend_menor_sem_cheque,
            document.valor_pend_maior_com_cheque,
            document.valor_pend_maior_sem_cheque,
            document.valor_contencioso,
        ]);
    }, [document]);

    return (
        <Table borderStyle={{ borderWidth: 1, borderColor: Color.soft }}>
            <Row
                data={['Disponib.', 'Crédito', 'ELC Pend.', 'P<90dscCH', 'P<90dssCH', 'P>90dscCH', 'P>90dssCH', 'Contenc.']}
                style={{ height: 18, backgroundColor: Color.primary }} textStyle={{ fontWeight: 'bold', fontSize: 10, textAlign: 'center', color: '#fff' }}
            />

            <TableWrapper key={0} style={{ flexDirection: 'row', height: 18 }} >
                {
                    valuesCustomer.map((cellData, cellIndex) => (
                        <Cell
                            key={cellIndex}
                            data={
                                <TextMask value={cellData} type={'money'} options={cellData < 0 ? formatMoneyNegative : formatMoney} style={{
                                    textAlign: 'center',
                                    fontWeight: (cellIndex == 0 ? 'bold' : 'normal'),
                                    margin: 1,
                                    fontSize: 9,
                                    color: (cellIndex == 0 ? getColorDisponibilidade(document.valor_pend_maior_sem_cheque, document.dispo, document.valor_contencioso, document.valor_pend_maior_com_cheque) : Color.dark)
                                }} />
                            }
                        />
                    ))
                }
            </TableWrapper>
        </Table>
    );
}