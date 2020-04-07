import React, { useState, useEffect } from 'react';

import { TextInputMask, TextMask } from 'react-native-masked-text';

import { List, CodeArticle, NameArticle, BoxNumbers, ValueBase, TotalArticle, Item, DetailArticle, OfferItem, OffItem, QttItem, ValueItem, TaxItem, OfferHeader, DetailHeader, OffHeader, PriceHeader, PVMItem, PVMItemHeader, BtnExibeTL, TextHeader, InvestimentoHeader, TextSymbolHeader, RHeader, BoxControlHeader } from './styles';

import GestureRecognizer from 'react-native-swipe-gestures';

import { RefreshControl, Alert, Text } from 'react-native';

import { formatMoney, formatMoneyNegative, formatPercent } from '~/assets/helper';

const ItemOrder = ({ item, index, saveDocumentItemRequest, handleRemoveDocumentItem, exibelucro }) => {
    return (
        <GestureRecognizer
            onSwipeRight={() => handleRemoveDocumentItem(item)}
            onSwipeLeft={() => handleRemoveDocumentItem(item)}
            config={{
                velocityThreshold: 0.3,
                directionalOffsetThreshold: 80
            }}
            style={{
                flex: 1,
                backgroundColor: '#000'
            }}
        >
            <Item>
                <DetailArticle>
                    <CodeArticle>{item.nome}</CodeArticle>
                    <BoxNumbers>
                        <ValueBase>PT: <TextMask value={item.preco_recomendado} type={'money'} options={formatMoney} /></ValueBase>
                        <ValueBase>IVA: <TextMask value={item.taxaiva} type={'money'} options={formatPercent} /></ValueBase>
                        <TotalArticle>Total Líq.: <TextMask value={item.total} type={'money'} options={formatMoney} /></TotalArticle>
                    </BoxNumbers>
                    <BoxNumbers>
                        <ValueBase>Total IEC: <TextMask value={(item.vl_iec)} type={'money'} options={formatMoney} /></ValueBase>
                        {exibelucro ? (
                            <TotalArticle>Total Lucro: 
                                <Text> <TextMask value={item.totallucro} type={'money'} options={item.totallucro < 0 ? formatMoneyNegative : formatMoney} /> </Text>
                                ({(item.totallucro/item.total).toFixed(2)}%)
                            </TotalArticle>
                        ) : (<></>)}
                    </BoxNumbers>
                </DetailArticle>
                <QttItem value={String(item.quantidade)} onChangeText={(value) => saveDocumentItemRequest({ ...item, quantidade: value })} keyboardType='numeric' />
                <OfferItem value={String(item.oferta)} onChangeText={(value) => saveDocumentItemRequest({ ...item, oferta: value })} keyboardType='numeric' />
                <TextInputMask
                    type={'money'}
                    value={item.preco}
                    options={formatMoney}
                    onChangeText={(text) => saveDocumentItemRequest({ ...item, preco: text })}
                    style={ValueItem}
                />
                <OffItem value={String(item.desconto)} onChangeText={(value) => saveDocumentItemRequest({ ...item, desconto: value })} keyboardType='numeric' />
                <TextInputMask
                    type={'money'}
                    value={item.pvm}
                    disabled={true}
                    options={formatMoney}
                    style={PVMItem}
                />
            </Item>
        </GestureRecognizer>
    );
}


const ListArticle = ({ articles, handleRefreshDocument, saveDocumentItemRequest, handleToggleTL, exibelucro, calculateProfit }) => {

    const [margemR, setMargemR] = useState(0);
    const [investment, setInvestment] = useState(0);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        calculateProfit(margemR,investment);
    }, [margemR]);

    useEffect(() => {
        calculateProfit(margemR,investment);
    }, [investment]);

    _onRefresh = () => {
        setRefreshing(true);
        handleRefreshDocument();
        setRefreshing(false);
    }

    handleRemoveDocumentItem = item => {
        Alert.alert('Tem certeza que deseja remover o producto ' + item.nome + '? ', '',
            [
                {}, 
                { text: 'Cancelar', style: 'cancel'},
                { text: 'Sim, remover.', onPress: () => saveDocumentItemRequest({ ...item, quantidade: 0, preco: item.preco_recomendado, oferta: 0, desconto: 0 }) },
            ],
            { cancelable: false },
        );
    }

    return (
        <>
            <Item>
                <DetailHeader>
                    <BtnExibeTL onPress={() => handleToggleTL()}></BtnExibeTL>
                    {   
                    exibelucro ? (
                        <BoxControlHeader>
                            <TextHeader>R:</TextHeader>
                            <RHeader keyboardType='numeric' value={margemR.toString()} onChangeText={value => setMargemR(value)} />
                            <TextSymbolHeader>%</TextSymbolHeader>
                            <TextHeader>I:</TextHeader>
                            <InvestimentoHeader keyboardType='numeric' value={investment.toString()} onChangeText={value => setInvestment(value)} />
                            <TextSymbolHeader>€</TextSymbolHeader>
                        </BoxControlHeader>
                    ) : (<></>)
                    }
                </DetailHeader>
                <OfferHeader>Qtd.</OfferHeader>
                <OfferHeader>Oferta</OfferHeader>
                <PriceHeader>P.V.</PriceHeader>
                <OffHeader>Desc %</OffHeader>
                <PVMItemHeader>P.V.M.</PVMItemHeader>
            </Item>
            <List
                data={articles}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={_onRefresh}
                    />
                }
                keyExtractor={(item, index) => String(item.id)}
                renderItem={({ item, index }) => {
                    return (
                        <ItemOrder
                            item={item}
                            index={index}
                            saveDocumentItemRequest={saveDocumentItemRequest}
                            handleRemoveDocumentItem={handleRemoveDocumentItem}
                            exibelucro={exibelucro}
                        />
                    );
                }}
            />
        </>
    );
}

export default ListArticle;