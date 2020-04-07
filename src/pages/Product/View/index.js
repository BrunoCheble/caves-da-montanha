import React, { useState, useEffect } from 'react';
import { Modal, Image } from 'react-native';

import { Container, Item, ViewColumn, ViewRow, Title, SubTitle, Buttons, ButtonDefault, ButtonTextDefault, ButtonPCV, BtnBack, TextBack, ModalTitle, Bold } from './styles';

import ProductAssociates from '~/components/Product/ProductAssociates';
import ModalPrices from '~/components/Product/Modals/prices';
import ModalDatasheets from '~/components/Product/Modals/datasheets';
import ModalPresentation from '~/components/Product/Modals/presentations';
import ModalPdf from '~/components/Product/Modals/pdf';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ProductActions from '~/store/ducks/products';

import RNFS from 'react-native-fs';

import { TextMask } from 'react-native-masked-text';

import { formatMoney, formatMoneyNegative } from '~/assets/helper';

const ViewProduct = ({ navigation, product, datasheet, associates, loadViewProductRequest }) => {
    
    const [merchandisingVisible, setMerchandisingVisible] = useState(false);
    const [visiblepvc, setVisiblepvc] = useState(false);
    const [modalPrecosVisible, setModalPrecosVisible] = useState(false);
    const [modalFichaVisible, setModalFichaVisible] = useState(false);
    const [modalApresentacaoVisible, setModalApresentacaoVisible] = useState(false);
    const [modalPdfVisible, setModalPdfVisible] = useState(false);
    const [file, setFile] = useState('');

    useEffect(() => {
        loadViewProductRequest(navigation.getParam('item'));
    }, [navigation.getParam('item')]);

    useEffect(() => {
        if (product.id != null) {
            validatePdf();
        }
    }, [product]);

    validatePdf = async () => {
        let attachment = RNFS.DocumentDirectoryPath + '/products/' + product.attachment;
        if (await RNFS.exists(attachment)) {
            setFile(attachment);
        }
        else {
            setFile(null);
        }
    }
    handleToggleVisiblePCV = () => {
        setVisiblepvc(!visiblepvc);
    }

    handleCloseModal = () => {
        setModalPrecosVisible(false);
        setModalFichaVisible(false);
        setModalApresentacaoVisible(false);
        setModalPdfVisible(false);
    }

    handleClickItem = (id, preco) => {
        navigation.navigate('ProductView', { item: { id, preco } });
    }

    return (
        <Container>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalPrecosVisible || modalFichaVisible || modalApresentacaoVisible || modalPdfVisible}
                onRequestClose={() => handleCloseModal()}>
                {
                    modalPrecosVisible ?
                        (<ModalPrices product={product} handleCloseModal={handleCloseModal} />)
                        : modalFichaVisible ?
                            (<ModalDatasheets datasheet={datasheet} handleCloseModal={handleCloseModal} />)
                            : modalApresentacaoVisible ?
                                (<ModalPresentation product={product} handleCloseModal={handleCloseModal} />)
                                : modalPdfVisible ?
                                    (<ModalPdf file={file} handleCloseModal={handleCloseModal} />)
                                    : <></>
                }
            </Modal>
            <Item>
                <Image
                    source={{ uri: 'file://' + RNFS.DocumentDirectoryPath + '/products/' + product.imagem }}
                    style={{ width: 140, height: 280, marginRight: 0 }}
                />
                <ViewColumn>
                    <ViewRow style={{ marginLeft: 10 }}>
                        <Title>
                            {product.nome}
                        </Title>
                        <ButtonPCV onPress={() => handleToggleVisiblePCV()}></ButtonPCV>
                    </ViewRow>
                    <ViewRow>
                        <ViewColumn style={{ marginHorizontal: 10 }}>
                            <SubTitle>{product.codigo}</SubTitle>
                            <SubTitle>Stk. Actual: {product.stock_atual}</SubTitle>
                            <SubTitle>Preço Tabela: <TextMask value={product.preco} type={'money'} options={formatMoney} /></SubTitle>
                            <SubTitle>IEC: <TextMask value={product.valor_taxa} type={'money'} options={formatMoney} /></SubTitle>
                            {visiblepvc ? (<SubTitle>PCV: <TextMask value={product.preco_custo_vendedor} type={'money'} options={formatMoney} /></SubTitle>) : <></>}
                            <SubTitle><Bold>Região:</Bold> {product.regiao}</SubTitle>
                            <SubTitle><Bold>Castas:</Bold> {product.castas}</SubTitle>
                            <SubTitle><Bold>Nota Prova:</Bold> {product.nota_prova}</SubTitle>
                            <SubTitle><Bold>Gastronomia:</Bold> {product.gastronomia}</SubTitle>
                            <SubTitle><Bold>Família:</Bold> {product.familia}</SubTitle>
                        </ViewColumn>

                        <Buttons>
                            <ButtonDefault><ButtonTextDefault onPress={() => setModalApresentacaoVisible(true)}>Protocolo Apresentação</ButtonTextDefault></ButtonDefault>
                            <ButtonDefault><ButtonTextDefault onPress={() => setModalPrecosVisible(true)}>Consultar Preços</ButtonTextDefault></ButtonDefault>
                            <ButtonDefault><ButtonTextDefault>Produtos Concorrentes</ButtonTextDefault></ButtonDefault>
                            <ButtonDefault><ButtonTextDefault onPress={() => setModalFichaVisible(true)}>Ficha Técnica</ButtonTextDefault></ButtonDefault>
                            {file != '' ? (<ButtonDefault><ButtonTextDefault onPress={() => setModalPdfVisible(true)}>FT PDF</ButtonTextDefault></ButtonDefault>) : (<></>)}
                            <ButtonDefault><ButtonTextDefault onPress={() => setMerchandisingVisible(!merchandisingVisible)}>Merchandising</ButtonTextDefault></ButtonDefault>
                            <ButtonDefault><ButtonTextDefault onPress={() => { }}>Anexos</ButtonTextDefault></ButtonDefault>
                        </Buttons>
                    </ViewRow>
                </ViewColumn>
            </Item>
            {merchandisingVisible ? (<ProductAssociates title="Merchandising" handleClickItem={handleClickItem} products={associates} />) : (<></>)}
            <ProductAssociates title="Artigos Relacionados" handleClickItem={handleClickItem} products={associates} />
            <BtnBack onPress={() => navigation.navigate('ProductScreen')}>
                <TextBack>Voltar</TextBack>
            </BtnBack>

        </Container>
    );
}

const mapStateToProps = state => ({
    associates: state.product.associates,
    datasheet: state.product.datasheet,
    product: state.product.session,
    concurrents: state.product.concurrents,
});

const mapDispatchToProps = dispatch => bindActionCreators(ProductActions, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewProduct);
