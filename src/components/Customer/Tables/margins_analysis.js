import React, { useEffect, useState } from 'react';

import { Table, Row, Rows, TableWrapper, Cell } from 'react-native-table-component';
import { TextMask } from 'react-native-masked-text';
import Color from '~/config/colors';

import { formatMoney, formatMoneyNegative } from '~/assets/helper';

export default TableMargins = ({ customer }) => {

    const [valuesCustomer, setValuesCustomer] = useState([]);

    return (
        <Table borderStyle={{ borderWidth: 1, borderColor: Color.soft }}>
            <Row data={[
                '',
                '01/01-29/10\nMC 2019',
                '01/01-29/10\nMC 2018',
                '%',
                'MC 2018',
                '%',
                'Objetivo',
                '%',
            ]} style={{ height: 30, backgroundColor: Color.primary }} textStyle={{ fontWeight: 'bold', fontSize: 10, textAlign: 'center', color: '#fff' }} />

            <TableWrapper key={0} style={{ flexDirection: 'row' }} >
                {
                    [0, 0, 0, 0, 0, 0, 0, 0].map((cellData, cellIndex) => (
                        <Cell
                            key={cellIndex}
                            data={
                                <TextMask value={cellData} type={'money'} options={cellData < 0 ? formatMoneyNegative : formatMoney} style={{
                                    textAlign: 'center',
                                    fontWeight: (cellData < 0 && cellIndex == 0 ? 'bold' : 'normal'),
                                    margin: 2,
                                    fontSize: 10,
                                    color: (cellData < 0 && cellIndex == 0 ? '#af0404' : Color.dark)
                                }} />
                            }
                        />
                    ))
                }
            </TableWrapper>
        </Table>
    );
}