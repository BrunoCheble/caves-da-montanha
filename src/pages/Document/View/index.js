import React, { useEffect, useState } from 'react';
import { Modal, PixelRatio, Alert, Text } from 'react-native';
/**/

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FormDocumentItemActions from '~/store/ducks/forms/document_items';
import FormDocumentActions from '~/store/ducks/forms/documents';

/**/
import { ViewColumn } from '~/assets/styles';

import {
    Container, Header, Title, SubTitle, Section, HeaderSection, AddArticle, TextAddArticle, Total,
    TipoTransacao, UpdOrder, TextUpdOrder, DetailHeader, ViewTotal, Buttons, FinishOrder, TextFinishOrder,
    BtnDisplayMC, TextDisplayMC, RemoveOrder, TextRemoveOrder
} from './styles';

import ListArticle from '~/components/Order/List/edit';
import ProductAssociates from '~/components/Product/ProductAssociates';

import FormUnlock from '~/components/Document/FormUnlock';
import TableCredit from '~/components/Order/Tables/credit_analysis';
import TableSales from '~/components/Order/Tables/sales_analysis';
import TableMargins from '~/components/Order/Tables/margins_analysis';

import { TextMask } from 'react-native-masked-text';

import { formatMoney, formatMoneyNegative, formatPercent } from '~/assets/helper';

const ViewDocument = ({ navigation, document, suggestion, articles, unlockFormula, loadSuggestionRequest, saveDocumentItemRequest, finishDocumentRequest, updblockDocumentRequest, addDocumentItemRequest, removeDocumentRequest, loadDocumentSessionRequest }) => {

    const [modalUnlockVisible, setModalUnlockVisible] = useState(false);
    const [exibelucro, setExibelucro] = useState(false);
    const [exibemc, setExibemc] = useState(false);
    const [motivo, setMotivo] = useState('');
    const [margeminvest, setMargeminvest] = useState(0); 
    
    useEffect(() => {
        handleSetMotivoBloqueio();
        calculateProfit(0,0);
    }, [document]);

    handleRefreshDocument = () => {
        loadDocumentSessionRequest(document);
    }

    handleSetMotivoBloqueio = () => {

        let motivoBloqueio = '';

        if (document.dispo < 0 || document.valor_pend_maior_com_cheque > 0 || document.valor_pend_maior_sem_cheque > 0 || document.valor_contencioso > 0) {
            motivoBloqueio = 'SEM CRÉDITO';
        }

        setMotivo(motivoBloqueio);
    }

    useEffect(() => {
        loadSuggestionRequest();
    }, [articles]);

    handleBlockDocument = (blocked) => {

        let data = { block: 0, motivo: '', id: document.id };

        if (blocked) {
            data = { ...data, block: 1, motivo };
            alert('Encomenda bloqueada e finalizada.');
        }
        else {
            alert('Encomenda desbloqueada e finalizada.');
        }

        updblockDocumentRequest(data);
        handleDocFinish();
        setModalUnlockVisible(false);
    }

    handleFinishOrder = () => {
        if (document.dispo < 0) {
            setModalUnlockVisible(true);
        }
        else {
            handleDocFinish();
            alert('Encomenda finalizada!');
        }
    }

    handleDocFinish = () => {
        finishDocumentRequest(document.id);
        navigation.navigate('DocumentScreen');
    }

    handleToggleMC = () => {
        setExibemc(!exibemc);
    }

    handleToggleTL = () => {
        setExibelucro(!exibelucro);
    }

    handleClickItem = item => {
        addDocumentItemRequest(item);
    }

    handleRemoveOrder = () => {
        Alert.alert('Tem certeza que deseja excluir esta encomenda ? ', '',
            [
                {},
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Sim, remover.', onPress: () => {
                        alert('Encomenda Excluída.');
                        removeDocumentRequest(document.id);
                        navigation.navigate('DocumentScreen');
                    }
                },
            ],
            { cancelable: false },
        );
    }

    calculateProfit = (margemR,investment) => {

        const r = new Number(margemR.toString().replace(',','.'));
        const i = new Number(investment.toString().replace('.','').replace(',','.'));
        /*
        console.log('-------');
        console.log(Number.isNaN(r));
        console.log(Number.isNaN(i));
        console.log(margemR === '');
        console.log(investment === '');
        console.log(margemR === null);
        console.log(investment === null);
        console.log(document.totallucro == undefined);
        */
        if(Number.isNaN(r) || Number.isNaN(i) || margemR === '' || investment === '' || margemR === null || investment === null || document.totallucro == undefined || r >= 100) {
            console.log('RUIM!');
            setMargeminvest(null);
        }
        else {            
            const lucro = document.totallucro-i-r*document.total_mercadoria;
            const lucro_perc = lucro/document.total_mercadoria;

            if(!Number.isNaN(lucro_perc)) {
                setMargeminvest(lucro_perc.toFixed(2));
            }
            else {
                setMargeminvest(null);
            }
        }
    }

    return (
        <Container>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalUnlockVisible}
                onRequestClose={() => {
                    setModalUnlockVisible(false);
                }}>
                <FormUnlock
                    unlockFormula={unlockFormula}
                    handleBlockDocument={handleBlockDocument}
                    setModalUnlockVisible={setModalUnlockVisible}
                />
            </Modal>
            <Header>
                <DetailHeader>
                    <Title>{document.nome}</Title>
                    <SubTitle>{document.endereco}</SubTitle>
                    <TipoTransacao>Tipo de transação: {document.tipo_transacao}</TipoTransacao>
                </DetailHeader>
                <ViewColumn style={{ maxWidth: PixelRatio.getPixelSizeForLayoutSize(40) }}>
                    <UpdOrder onPress={() => navigation.navigate('DocumentFormScreen')}>
                        <TextUpdOrder>Editar</TextUpdOrder>
                    </UpdOrder>

                    <BtnDisplayMC onPress={() => handleToggleMC()}>
                        <TextDisplayMC>{document.id_estado}</TextDisplayMC>
                    </BtnDisplayMC>
                </ViewColumn>
            </Header>

            <TableCredit document={document} />
            <TableSales document={document} />
            {exibemc ? (<TableMargins document={document} />) : <></>}

            <Section>
                <HeaderSection>
                    <ViewTotal>
                        <Total>Total Líq.: <TextMask value={document.total_mercadoria} type={'money'} options={formatMoney} /></Total>
                        <Total>Total Desc.: <TextMask value={document.total_desconto} type={'money'} options={formatMoney} /></Total>
                    </ViewTotal>
                    <ViewTotal>
                        <Total>Total IEC: <TextMask value={document.total_iec} type={'money'} options={formatMoney} /></Total>
                        <Total>Total s/ IVA: <TextMask value={document.total_documento - document.total_iva} type={'money'} options={formatMoney} /></Total>
                    </ViewTotal>
                    <ViewTotal>
                        {document.total_iva != 0 ? (<Total>Total c/ IVA: <TextMask value={document.total_documento} type={'money'} options={formatMoney} /></Total>) : (<></>)}
                        {exibelucro ? (
                            <Total>
                                Total Lucro:
                                <Text> <TextMask value={document.totallucro} type={'money'} options={document.totallucro < 0 ? formatMoneyNegative : formatMoney} /> </Text>
                                {margeminvest != null ? (<Text>({margeminvest}%)</Text>) : (<></>)}
                            </Total>
                            
                        ) : (<></>)}
                    </ViewTotal>
                    <AddArticle onPress={() => navigation.navigate('ProductScreen')}>
                        <TextAddArticle>+ Adicionar Artigo</TextAddArticle>
                    </AddArticle>
                </HeaderSection>
                <ListArticle
                    calculateProfit={calculateProfit}
                    handleRefreshDocument={handleRefreshDocument}
                    handleToggleTL={handleToggleTL}
                    articles={articles}
                    saveDocumentItemRequest={saveDocumentItemRequest}
                    exibelucro={exibelucro}
                />
            </Section>
            <ProductAssociates title="Artigos Recomendados"
                handleClickItem={handleClickItem}
                products={suggestion}
            />
            <Buttons>
                {
                    document.total_mercadoria > 0 ? (
                        <FinishOrder onPress={() => handleFinishOrder()}>
                            <TextFinishOrder>FINALIZAR ENCOMENDA</TextFinishOrder>
                        </FinishOrder>
                    ) : (<></>)}
                <RemoveOrder onPress={() => handleRemoveOrder()}>
                    <TextRemoveOrder>EXCLUIR ENCOMENDA</TextRemoveOrder>
                </RemoveOrder>
            </Buttons>
        </Container>
    );
};

const mapStateToProps = state => ({
    document: state.formDocument.data,
    suggestion: state.formDocumentItem.suggestion,
    articles: state.formDocumentItem.data,
    unlockFormula: state.setting.unlockFormula
});

const mapDispatchToProps = dispatch => bindActionCreators(Object.assign({}, FormDocumentActions, FormDocumentItemActions), dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewDocument);