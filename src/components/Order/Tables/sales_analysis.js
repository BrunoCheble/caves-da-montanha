import React, { useEffect, useState } from 'react';

import { Table, Row, Rows, TableWrapper, Cell } from 'react-native-table-component';
import { TextMask } from 'react-native-masked-text';
import Color from '~/config/colors';

import { formatMoney, formatMoneyNegative } from '~/assets/helper';

export default TableSales = ({ document }) => {

    //const [valuesCustomer, setValuesCustomer] = useState([]);

    return (
        <Table borderStyle={{ borderWidth: 1, borderColor: Color.soft }} style={{ marginBottom: 10 }}>
            <Row data={['', 'FA 2019', 'FA 2018H', '%', 'FA 2018T', '%', 'Objetivo', '%']} style={{ height: 20, backgroundColor: Color.primary }} textStyle={{ fontWeight: 'bold', fontSize: 11, textAlign: 'center', color: '#fff' }} />

            <TableWrapper key={0} style={{ flexDirection: 'row' }} >
                {
                    [0, 0, 0, 0, 0, 0, 0, 0].map((cellData, cellIndex) => (
                        <Cell
                            key={cellIndex}
                            data={
                                <TextMask value={cellData} type={'money'} options={formatMoney} style={{
                                    textAlign: 'center',
                                    fontWeight: (cellData < 0 && cellIndex == 0 ? 'bold' : 'normal'),
                                    margin: 1,
                                    fontSize: 9,
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