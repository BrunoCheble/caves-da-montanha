import React, { useState, useEffect } from 'react';
import { RefreshControl } from 'react-native';

import { FlatList, Item, Title, Status, Blocked, ItemDetail, SubTitle } from './styles';

import { formatDate } from '~/assets/helper';

import { TextMask } from 'react-native-masked-text';

const FlatListItem = ({ item, index }) => (
    <Item onPress={() => handleDocumentSession(item)}>
        <ItemDetail>
            <Title>{item.nome}</Title>
            <SubTitle>{item.data}</SubTitle>
        </ItemDetail>
        {item.fechado == 1 ? (<Blocked>Fechado</Blocked>) : (<></>)}
        {item.bloqueado == 1 ? (<Blocked>{item.motivo_bloqueio}</Blocked>) : (<></>)}
        <Status>{item.id_estado == 'INTEGRADOERP' ? item.doc_erp : item.id_estado}</Status>
    </Item>
);

export default ListDocument = ({ navigation, documents, loadDocumentRequest, loadDocumentSessionRequest }) => {

    const [refreshing, setRefreshing] = useState(false);

    _onRefresh = () => {
        setRefreshing(true);
        loadDocumentRequest();
        setRefreshing(false);
    }

    handleDocumentSession = item => {
        loadDocumentSessionRequest(item);
        
        if(item.id_estado == 'RASCUNHO') {
            navigation.navigate('DocumentViewScreen');
        }
        else {
            navigation.navigate('DocumentDetailScreen');
        }
    }

    useEffect(() => {
        loadDocumentRequest();
    }, []);

    return (
        <FlatList
            data={documents}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={_onRefresh}
                />
            }
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={({ item, index }) => {
                return (
                    <FlatListItem item={item} index={index} handleDocumentSession={handleDocumentSession} />
                );
            }}
        />
    );
};
