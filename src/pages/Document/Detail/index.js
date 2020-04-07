import React, { useEffect, useState } from 'react';
import { Modal } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FormDocumentActions from '~/store/ducks/forms/documents';
import FormDocumentItemActions from '~/store/ducks/forms/document_items';

//import { Table, Row, Rows, TableWrapper, Cell } from 'react-native-table-component';
//import Color from '~/config/colors';
//import { ViewColumn } from '~/assets/styles';

import { formatMoney, formatMoneyNegative } from '~/assets/helper';

import { Container, Header, Section, Title, SubTitle, TipoTransacao, HeaderSection, ViewTotal, Total, Buttons, FinishOrder, TextFinishOrder, BtnBack, TextBack, RemoveOrder, TextRemoveOrder } from './styles';

import { TextMask } from 'react-native-masked-text';

import ListArticle from '~/components/Order/List';
import FormUnlock from '~/components/Document/FormUnlock';

const DocumentDetail = ({ navigation, document, customer, articles, unlockFormula, updblockDocumentRequest, removeDocumentRequest}) => {
    
    const [modalUnlockVisible, setModalUnlockVisible] = useState(false);
    const [exibelucro, setExibelucro] = useState(false);
        
    handleBlockDocument = (blocked) => {

        let data = { block: 0, motivo: '', id: document.id };

        if (!blocked) {
            alert('Encomenda Desbloqueada.');
            updblockDocumentRequest(data);
            navigation.navigate('DocumentScreen');
        }

        setModalUnlockVisible(false);
    }

    handleToggleTL = () => {
        setExibelucro(!exibelucro);
    }

    handleRemoveOrder = () => {
        alert('Encomenda Excluída.');
        removeDocumentRequest(document.id);
        navigation.navigate('DocumentScreen');
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
                <Title>{document.nome}</Title>
                <SubTitle>{document.endereco}</SubTitle>
                <TipoTransacao>Tipo de transação: {document.tipo_transacao}</TipoTransacao>
            </Header>

            <TableCredit customer={customer} />
            <TableSales customer={customer} />
            <TableMargins customer={customer} />
            
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
                        {exibelucro ? (<Total>Total Lucro: <TextMask value={document.totallucro} type={'money'} options={document.totallucro < 0 ? formatMoneyNegative : formatMoney} /></Total>) : (<></>)}
                    </ViewTotal>
                </HeaderSection>
                
                <ListArticle
                    handleToggleTL={handleToggleTL}
                    articles={articles}
                    exibelucro={exibelucro}
                />
                <Buttons>
                    <BtnBack onPress={() => navigation.navigate('DocumentScreen')}><TextBack>Voltar</TextBack></BtnBack>
                    {
                        document.bloqueado == 1 ? (
                            <FinishOrder onPress={() => setModalUnlockVisible(true)}>
                                <TextFinishOrder>DESBLOQUEAR ENCOMENDA</TextFinishOrder>
                            </FinishOrder>
                        ) : (<></>)
                    }
                    <RemoveOrder onPress={() => handleRemoveOrder()}>
                        <TextRemoveOrder>EXCLUIR ENCOMENDA</TextRemoveOrder>
                    </RemoveOrder>
                    
                </Buttons>
            </Section>

        </Container>
    );
}

const mapStateToProps = state => ({
    document: state.formDocument.data,
    customer: state.customer.session,
    articles: state.formDocumentItem.data,
    unlockFormula: state.setting.unlockFormula
});

const mapDispatchToProps = dispatch => bindActionCreators(Object.assign({}, FormDocumentActions, FormDocumentItemActions), dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DocumentDetail);