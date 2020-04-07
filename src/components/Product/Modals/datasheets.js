import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';

import { BtnBack, TextBack, ModalTitle } from './styles';

import { Table, Row, Rows, TableWrapper, Cell } from 'react-native-table-component';

import { TextMask } from 'react-native-masked-text';

import { formatMoney } from '~/assets/helper';

import Color from '~/config/colors';

export default ModalDatasheets = ({ datasheet, handleCloseModal }) => {

    const [valuesDatasheet, setValuesDatasheet] = useState([]);
    const [valuesLogistic, setValuesLogistic] = useState([]);
    
    const headersLogistic = [
        'Peso',
        'Altura',
        'Diâmetro',
        'Num. Garrafas Caixa',
        'Peso Caixa',
        'Num. Garrafas Palete',
        'Num. Caixas Palete',
        'Altura Palete',
        'ITF',
        'Peso Total Palete',
        'EAN',
        'Capacidade'
    ];
    
    const headersDatasheet = [
        'Região',
        'Classificação',
        'Tipo de Produto',
        'Ano',
        'Castas',
        'Vinificação',
        'Produção',
        'Engarrafamento',
        'Graduação',
        'Acidez Total',
        'Açucar Total',
        'Nota Prova',
        'Maturação Estágio',
        'Conservação',
        'Consumo',
        'Gastronomia',
        'Ingredientes',
        'Baume',
        'Brix',
        'Metanol'
    ];

    useEffect(() => {
        const {
            peso, altura, diametro, num_garrafas_caixa,
            peso_caixa, num_garrafas_palete, num_caixas_palete, altura_palete,
            itf, peso_total_palete, regiao, classificacao, tipo_produto, 
            ano, castas, vinificacao, producao, engarrafamento, graduacao, 
            acidez_total, acucar_total, nota_prova, maturacao_estagio, 
            conservacao, consumo, gastronomia, ingredientes, baume, brix, metanol, ean, capacidade
        } = datasheet;

        setValuesLogistic([
            peso,
            altura,
            diametro,
            num_garrafas_caixa,
            peso_caixa,
            num_garrafas_palete,
            num_caixas_palete,
            altura_palete,
            itf,
            peso_total_palete, 
            ean,
            capacidade
        ]);

        setValuesDatasheet([
            regiao,
            classificacao,
            tipo_produto,
            ano,
            castas,
            vinificacao,
            producao,
            engarrafamento,
            graduacao,
            acidez_total,
            acucar_total,
            nota_prova,
            maturacao_estagio,
            conservacao,
            consumo,
            gastronomia,
            ingredientes,
            baume,
            brix,
            metanol
        ]);
    }, [datasheet]);

    return (
        <ScrollView>
            <ModalTitle>Ficha Técnica</ModalTitle>
            <View style={{ padding: 10 }}>
                <Table borderStyle={{ borderWidth: 1, borderColor: Color.soft }} style={{ marginBottom: 15 }}>
                    <Row
                        data={['Especificação', '']}
                        style={{ height: 30, backgroundColor: Color.primary }}
                        textStyle={{ fontWeight: 'bold', fontSize: 12, textAlign: 'center', color: '#fff' }}
                    />
                    {
                        valuesDatasheet.map((cellData, cellIndex) => (
                            <TableWrapper key={cellIndex} style={{ flexDirection: 'row' }} >
                                <Cell
                                    key={0}
                                    data={<Text style={{ marginLeft: 5, fontSize: 12, fontWeight: 'bold', color: Color.dark }}>{headersDatasheet[cellIndex]}</Text>}
                                />
                                <Cell
                                    key={1}
                                    data={<Text style={{ textAlign: 'center', margin: 5, fontSize: 11, color: Color.primary }}>{cellData}</Text>}
                                />
                            </TableWrapper>
                        ))
                    }
                </Table>
            </View>
            <ModalTitle>Ficha Logística</ModalTitle>
            <View style={{ padding: 10 }}>
                <Table borderStyle={{ borderWidth: 1, borderColor: Color.soft }} style={{ marginBottom: 15 }}>
                    <Row
                        data={['Especificação', '']}
                        style={{ height: 30, backgroundColor: Color.primary }}
                        textStyle={{ fontWeight: 'bold', fontSize: 12, textAlign: 'center', color: '#fff' }}
                    />
                    {
                        valuesLogistic.map((cellData, cellIndex) => (
                            <TableWrapper key={cellIndex} style={{ flexDirection: 'row' }} >
                                <Cell
                                    key={0}
                                    data={<Text style={{ marginLeft: 5, fontSize: 12, fontWeight: 'bold', color: Color.dark }}>{headersLogistic[cellIndex]}</Text>}
                                />
                                <Cell
                                    key={1}
                                    data={<Text style={{ textAlign: 'center', margin: 5, fontSize: 11, color: Color.primary }}>{cellData}</Text>}
                                />
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
