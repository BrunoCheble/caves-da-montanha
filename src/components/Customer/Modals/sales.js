import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';

import { BtnBack, TextBack, ModalTitle, BtnFilter, TextFilter } from './styles';

import { formatMoney, formatMoneyNegative, formatPercent } from '~/assets/helper';
import { ViewRow } from '~/assets/styles';

import { Table, TableWrapper, Cell } from 'react-native-table-component';
import { TextMask } from 'react-native-masked-text';

import Color from '~/config/colors';

import SalesFilterOffile from './sales_filter_offline';
import SalesFilterOnline from './sales_filter_online';

export default ModalSales = ({ sales, handleCustomerSales, handleCloseModal }) => {

    const [ano, setAno] = useState('');
    
    const [totalQtd, setTotalqtd] = useState(0);
    const [totalQtdn, setTotalqtdn] = useState(0);
    const [totalValor, setTotalvalor] = useState(0);
    const [totalValorn, setTotalvalorn] = useState(0);
    const [totalMargem, setTotalmargem] = useState(0);
    const [totalMargemn, setTotalmargemn] = useState(0);

    const [filterOnline, setFilterOnline] = useState(false);

    const handleChangeFilter = () => {
        setFilterOnline(!filterOnline);
    }

    useEffect(() => {

        let _totalQtd = 0;
        let _totalQtdn = 0;
        let _totalValor = 0;
        let _totalValorn = 0;
        let _totalMargem = 0;
        let _totalMargemn = 0;

        if (sales.length > 0) {
            setAno(sales[0].ano);
            sales.map((value, index) => {
                _totalQtd += value.qtd;
                _totalQtdn += value.qtd_h;
                _totalValor += value.valor;
                _totalValorn += value.valor_h;
                _totalMargem += value.margem;
                _totalMargemn += value.margem_h;
            });
        }

        setTotalqtd(_totalQtd);
        setTotalqtdn(_totalQtdn);
        setTotalvalor(_totalValor);
        setTotalvalorn(_totalValorn);
        setTotalmargem(_totalMargem);
        setTotalmargemn(_totalMargemn);
    }, [sales]);

    return (
        <ScrollView>
            <ModalTitle>Análise de Vendas {ano != '' ? ano + ' e ' + (ano - 1) : ''}</ModalTitle>
            <View style={{ paddingHorizontal: 10 }}>

                {
                    filterOnline ? 
                    (<SalesFilterOnline handleCustomerSales={handleCustomerSales} />) : 
                    (<SalesFilterOffile handleCustomerSales={handleCustomerSales} />)
                }
                
                <Table borderStyle={{ borderWidth: 1, borderColor: Color.soft }} style={{ marginBottom: 15, marginTop: 10 }}>
                    <TableWrapper key={0} style={{ flexDirection: 'row', height: 30, backgroundColor: Color.primary }} >
                        <Cell key={0} style={{ width: 200 }} data={<Text style={{ margin: 5, fontSize: 11, color: '#FFF', fontWeight: 'bold', textAlign: 'center' }}>Artigo</Text>} />
                        <Cell key={1} data={<Text style={{ margin: 5, fontSize: 11, color: '#FFF', fontWeight: 'bold', textAlign: 'center' }}>Qtd N</Text>} />
                        <Cell key={2} data={<Text style={{ margin: 5, fontSize: 11, color: '#FFF', fontWeight: 'bold', textAlign: 'center' }}>Qtd N-1</Text>} />
                        <Cell key={3} data={<Text style={{ margin: 5, fontSize: 11, color: '#FFF', fontWeight: 'bold', textAlign: 'center' }}>Valor N</Text>} />
                        <Cell key={4} data={<Text style={{ margin: 5, fontSize: 11, color: '#FFF', fontWeight: 'bold', textAlign: 'center' }}>Valor N-1</Text>} />
                        <Cell key={5} data={<Text style={{ margin: 5, fontSize: 11, color: '#FFF', fontWeight: 'bold', textAlign: 'center' }}>Marg. N</Text>} />
                        <Cell key={6} data={<Text style={{ margin: 5, fontSize: 11, color: '#FFF', fontWeight: 'bold', textAlign: 'center' }}>Marg. N-1</Text>} />
                    </TableWrapper>
                    <TableWrapper key={1} style={{ flexDirection: 'row', height: 40 }} >
                        <Cell key={0} style={{ width: 200 }} data={<Text></Text>} />
                        <Cell key={1} data={<Text style={{ margin: 5, fontSize: 9, fontWeight: 'bold', color: Color.primary, textAlign: 'center' }}>{totalQtd}</Text>} />
                        <Cell key={2} data={<Text style={{ margin: 5, fontSize: 9, fontWeight: 'bold', color: Color.primary, textAlign: 'center' }}>{totalQtdn}</Text>} />
                        <Cell key={3} data={<TextMask style={{ margin: 5, fontSize: 9, fontWeight: 'bold', color: Color.primary, textAlign: 'right' }} value={totalValor} type={'money'} options={totalValor < 0 ? formatMoneyNegative : formatMoney} />} />
                        <Cell key={4} data={<TextMask style={{ margin: 5, fontSize: 9, fontWeight: 'bold', color: Color.primary, textAlign: 'right' }} value={totalValorn} type={'money'} options={totalValorn < 0 ? formatMoneyNegative : formatMoney} />} />
                        <Cell key={5} data={<TextMask style={{ margin: 5, fontSize: 9, fontWeight: 'bold', color: Color.primary, textAlign: 'right' }} value={totalMargem} type={'money'} options={totalMargem < 0 ? formatMoneyNegative : formatMoney} />} />
                        <Cell key={6} data={<TextMask style={{ margin: 5, fontSize: 9, fontWeight: 'bold', color: Color.primary, textAlign: 'right' }} value={totalMargemn} type={'money'} options={totalMargemn < 0 ? formatMoneyNegative : formatMoney} />} />
                    </TableWrapper>
                    {
                        sales.map((cellData, cellIndex) => (
                            <TableWrapper key={cellIndex} style={{ flexDirection: 'row' }} >
                                <Cell key={0} style={{ width: 200 }} data={<Text style={{ margin: 5, fontSize: 9, color: Color.primary, fontWeight: 'bold' }}>{cellData.artigo}</Text>} />
                                <Cell key={1} data={<Text style={{ margin: 5, fontSize: 9, color: Color.primary, textAlign: 'center' }}>{cellData.qtd}</Text>} />
                                <Cell key={2} data={<Text style={{ margin: 5, fontSize: 9, color: Color.primary, textAlign: 'center' }}>{cellData.qtd_h}</Text>} />
                                <Cell key={3} data={<TextMask style={{ margin: 5, fontSize: 9, color: Color.primary, textAlign: 'right' }} value={cellData.valor} type={'money'} options={cellData.valor < 0 ? formatMoneyNegative : formatMoney} />} />
                                <Cell key={4} data={<TextMask style={{ margin: 5, fontSize: 9, color: Color.primary, textAlign: 'right' }} value={cellData.valor_h} type={'money'} options={cellData.valor_h < 0 ? formatMoneyNegative : formatMoney} />} />
                                <Cell key={5} data={<TextMask style={{ margin: 5, fontSize: 9, color: Color.primary, textAlign: 'right' }} value={cellData.margem} type={'money'} options={cellData.margem < 0 ? formatMoneyNegative : formatMoney} />} />
                                <Cell key={6} data={<TextMask style={{ margin: 5, fontSize: 9, color: Color.primary, textAlign: 'right' }} value={cellData.margem_h} type={'money'} options={cellData.margem_h < 0 ? formatMoneyNegative : formatMoney} />} />
                            </TableWrapper>
                        ))
                    }
                </Table>

                <ViewRow style={{ marginBottom: 40 }}>
                    <BtnBack onPress={() => handleCloseModal()}>
                        <TextBack>Voltar</TextBack>
                    </BtnBack>
                    <BtnFilter onPress={() => handleChangeFilter()}>
                        <TextFilter>Buscar outro intervalo ({filterOnline ? 'Offline' : 'Online'})</TextFilter>
                    </BtnFilter>
                </ViewRow>
            </View>
        </ScrollView>
    );
}
