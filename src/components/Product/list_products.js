import React, { useState, useEffect } from 'react';
import { RefreshControl, Image, PermissionsAndroid, Modal } from 'react-native';
import {
    Container,
    BoxSearch,
    Search,
    FlatList,
    Item,
    ItemDetail,
    Title,
    SubTitle,
    AddButton,
    DelButton,
    CamButton,
    BtnUnlinkDocument,
    BtnLinkDocument,
    BtnBackModal,
    TextBackModal,
    QttItem,
    Buttons,
    ValueBase,
    TaxaIVA,
    Stock,
    BtnType,
    TextType
} from './styles';

import RNFS from 'react-native-fs';
import { CameraKitCameraScreen } from 'react-native-camera-kit';

import { TextMask } from 'react-native-masked-text';

import Icon from 'react-native-vector-icons/FontAwesome';

import { formatMoney } from '~/assets/helper';

const FlatListItem = ({ document, item, index, handleDisplayProduct, handleUpdateQttProduct, handleBtnQtt }) => (
    <Item>
        <Image
            source={{ uri: 'file://' + RNFS.DocumentDirectoryPath + '/products/' + item.imagem }}
            style={{ width: 75, height: 150 }}
        />
        <ItemDetail onPress={() => handleDisplayProduct(item)}>
            <Title>{item.nome}</Title>
            <SubTitle>{item.codigo}</SubTitle>
            <SubTitle><Icon name="barcode" size={12} color="#333" /> {item.ean}</SubTitle>
            <Stock>Stk. Actual: {item.stock_atual}</Stock>
            <ValueBase>Preço Tabela: <TextMask value={item.preco} type={'money'} options={formatMoney} /></ValueBase>
            <TaxaIVA>Taxa IVA: {item.taxa_iva}%</TaxaIVA>
            <TaxaIVA>IEC: <TextMask value={item.valor_taxa} type={'money'} options={formatMoney} /></TaxaIVA>
        </ItemDetail>
        {
            document !== null ? (
                <Buttons>
                    <AddButton onPress={() => handleBtnQtt(item, 1)}><Icon name="plus" size={14} color="#fff" /></AddButton>
                    <QttItem value={(item.quantidade != undefined ? String(item.quantidade) : "")} onChangeText={(value) => handleUpdateQttProduct(item, value)} keyboardType='numeric' />
                    <DelButton disabled={String(item.quantidade) == '0' || String(item.quantidade) == ''} onPress={() => handleBtnQtt(item, -1)}><Icon name="minus" size={14} color="#fff" /></DelButton>
                </Buttons>
            ) : (<></>)
        }
    </Item>
);

const ListProduct = ({ navigation, products, document, loadProductRequest, toggleDocument, saveDocumentItemRequest }) => {

    const [refreshing, setRefreshing] = useState(false);
    const [visible, setVisible] = useState(false);
    const [search, setSearch] = useState('');
    const [type, setType] = useState('UN');

    _onRefresh = () => {
        setRefreshing(true);
        loadProductRequest();
        setRefreshing(false);
    }

    useEffect(() => {
        _onRefresh();
    }, [document]);

    handleChangeType = () => {

        if (type == 'UN') {
            setType('CX');
        }
        else if (type == 'CX') {
            setType('PL');
        }
        else {
            setType('UN');
        }
    }

    handleBtnQtt = (item, value) => {

        let newValue = value;

        if (type == 'PL') {
            newValue = value * item.num_garrafas_palete;
        }
        else if (type == 'CX') {
            newValue = value * item.num_garrafas_caixa;
        }

        const quantidade = (parseInt(item.quantidade) || 0) + (newValue);

        handleUpdateQttProduct(item, quantidade);
    }

    handleUpdateQttProduct = (item, quantidade) => {

        if (quantidade < 0) {
            quantidade = 0;
        }

        saveDocumentItemRequest({ ...item, quantidade });
    }

    handleDisplayProduct = (item) => {
        navigation.navigate('ProductView', { item });
    }

    handleDisplayCamera = visible => {
        setVisible(visible);
    }

    handleSearch = text => {

        if (text.indexOf("|") != -1) {
            text = text.substring(0, text.indexOf("|"));
        }

        setSearch(text);
        if (text.length > 3) {
            loadProductRequest(text);
            setVisible(false);
        }
        else if (text.length == 0) {
            loadProductRequest();
        }
    }

    return (
        <>
            {visible ? (
                <CameraKitCameraScreen
                    actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
                    onBottomButtonPressed={(event) => handleDisplayCamera(false)}
                    scanBarcode={true}
                    onReadCode={event => handleSearch(event.nativeEvent.codeStringValue)}
                    hideControls={false}           //(default false) optional, hide buttons and additional controls on top and bottom of screen
                />
            ) : (
                    <Container>

                        <BoxSearch>
                            {
                                document !== null ? (
                                    <BtnUnlinkDocument onPress={() => toggleDocument(null)} ><Icon name="unlink" size={14} color="#FFF" /></BtnUnlinkDocument>
                                ) : (<></>)
                            }
                            <Icon style={{ paddingLeft: 10, paddingRight: 10 }} name="search" size={14} color="#0d0d0d" />
                            <Search
                                placeholder="Localizar artigo"
                                underlineColorAndroid="transparent"
                                value={search}
                                onChangeText={(text) => handleSearch(text)}
                            />
                            <CamButton onPress={() => handleDisplayCamera(true)}><Icon name="barcode" size={14} color="#FFF" /></CamButton>
                            {
                                document !== null ? (
                                    <>
                                        <BtnLinkDocument onPress={() => navigation.navigate('DocumentViewScreen')} ><Icon name="shopping-cart" size={14} color="#FFF" /></BtnLinkDocument>
                                        <BtnType onPress={() => handleChangeType()} ><TextType style={{ fontSize: 14 }}>{type}</TextType></BtnType>
                                    </>
                                ) : (<></>)
                            }
                        </BoxSearch>

                        <FlatList
                            data={products}
                            keyExtractor={(item, index) => item.id.toString()}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={_onRefresh}
                                />
                            }
                            renderItem={({ item, index }) => (
                                <FlatListItem item={item} index={index} document={document} handleDisplayProduct={handleDisplayProduct} handleBtnQtt={handleBtnQtt} handleUpdateQttProduct={handleUpdateQttProduct} />
                            )}
                        />
                    </Container>
                )
            }
        </>
    );
};

export default ListProduct;