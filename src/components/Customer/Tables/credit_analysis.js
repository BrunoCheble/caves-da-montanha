import React, { useEffect, useState } from 'react';

import { Table, Row, Rows, TableWrapper, Cell } from 'react-native-table-component';
import { TextMask } from 'react-native-masked-text';
import Color from '~/config/colors';

import { formatMoney, formatMoneyNegative, getColorDisponibilidade } from '~/assets/helper';

export default TableCredit = ({ customer }) => {

    const [valuesCustomer, setValuesCustomer] = useState([]);
    
    useEffect(() => {
        setValuesCustomer([
            customer.dispo,
            customer.limite_saldo_valor,
            customer.valor_contencioso,
            customer.valor_pend_menor_com_cheque,
            customer.valor_pend_menor_sem_cheque,
            customer.valor_pend_maior_com_cheque,
            customer.valor_pend_maior_sem_cheque,
            customer.valor_contencioso,
        ]);
    }, [customer]);

    return (
        <Table borderStyle={{ borderWidth: 1, borderColor: Color.soft }} style={{ marginBottom: 10 }}>
            <Row data={[
                'Disponib.',
                'Crédito',
                'ELC Pend.',
                'P<90dscCH',
                'P<90dssCH',
                'P>90dscCH',
                'P>90dssCH',
                'Contenc.',
            ]} style={{ height: 25, backgroundColor: Color.primary }} textStyle={{ fontWeight: 'bold', fontSize: 10, textAlign: 'center', color: '#fff' }} />

            <TableWrapper key={0} style={{ flexDirection: 'row' }} >
                {
                    valuesCustomer.map((cellData, cellIndex) => (
                        <Cell
                            key={cellIndex}
                            data={
                                <TextMask value={cellData} type={'money'} options={cellData < 0 ? formatMoneyNegative : formatMoney} style={{
                                    textAlign: 'center',
                                    fontWeight: (cellIndex == 0 ? 'bold' : 'normal'),
                                    margin: 2,
                                    fontSize: 10,
                                    color: (cellIndex == 0 ? getColorDisponibilidade(customer.valor_pend_maior_sem_cheque, customer.dispo, customer.valor_contencioso, customer.valor_pend_maior_com_cheque) : Color.dark)
                                }} />
                            }
                        />
                    ))
                }
            </TableWrapper>
        </Table>
    );
}