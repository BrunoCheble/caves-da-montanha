import React from 'react';

import { TextMask } from 'react-native-masked-text';

import { 
    List, 
    CodeArticle, 
    BoxNumbers, 
    ValueBase, 
    TotalArticle, 
    Item, 
    DetailArticle, 
    TextQttItem,
    TextOfferItem,
    ValueItem, 
    OfferHeader, 
    DetailHeader, 
    OffHeader, 
    PriceHeader, 
    PVMItem, 
    PVMItemHeader, 
    BtnExibeTL,
    OFFItem,
} from './styles';

import { formatMoney, formatMoneyNegative, formatPercent } from '~/assets/helper';

const ItemOrder = ({ item, exibelucro }) => {

    let totallucro = (item.quantidade * item.preco - (item.quantidade + item.oferta) * item.preco_custo_vendedor);

    return (
        <Item style={{ flex: 1, backgroundColor: '#000' }}>
            <DetailArticle>
                <CodeArticle>{item.nome}</CodeArticle>
                <BoxNumbers>
                    <ValueBase>PT: <TextMask value={item.preco_recomendado} type={'money'} options={formatMoney} /></ValueBase>
                    <ValueBase>IVA: <TextMask value={item.taxaiva} type={'money'} options={formatPercent} /></ValueBase>
                    <TotalArticle>Total Líq.: <TextMask value={item.total} type={'money'} options={formatMoney} /></TotalArticle>
                </BoxNumbers>
                <BoxNumbers>
                    <ValueBase>Total IEC: <TextMask value={item.vl_iec} type={'money'} options={formatMoney} /></ValueBase>
                    {exibelucro ? (<TotalArticle>Total Lucro: <TextMask value={totallucro} type={'money'} options={totallucro < 0 ? formatMoneyNegative : formatMoney} /></TotalArticle>) : (<></>)}
                </BoxNumbers>
            </DetailArticle>
            <TextQttItem>{(item.quantidade+item.oferta)}</TextQttItem>
            <TextOfferItem>{(item.pendente)}</TextOfferItem>
            <TextMask
                type={'money'}
                value={item.preco}
                options={formatMoney}
                style={ValueItem}
            />
            <TextMask 
                value={item.desconto} 
                type={'money'} 
                options={formatPercent} 
                style={OFFItem}
            />
            <TextMask
                type={'money'}
                value={item.pvm}
                options={formatMoney}
                style={PVMItem}
            />
        </Item>
    );
}


const ListArticle = ({ articles, handleToggleTL, exibelucro }) => {

    return (
        <>
            <Item>
                <DetailHeader>
                    <BtnExibeTL onPress={() => handleToggleTL()}></BtnExibeTL>
                </DetailHeader>
                <OfferHeader>Qtd.</OfferHeader>
                <OfferHeader>Pend.</OfferHeader>
                <PriceHeader>P.V.</PriceHeader>
                <OffHeader>Desc %</OffHeader>
                <PVMItemHeader>P.V.M.</PVMItemHeader>
            </Item>
            <List
                data={articles}
                keyExtractor={(item, index) => String(item.id)}
                renderItem={({ item, index }) => {
                    return (
                        <ItemOrder
                            item={item}
                            index={index}
                            exibelucro={exibelucro}
                        />
                    );
                }}
            />
        </>
    );
}

export default ListArticle;