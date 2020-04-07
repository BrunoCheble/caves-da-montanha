import React, { useState } from 'react';
import { RefreshControl } from 'react-native';
import { FlatList, Item, Title, SubTitle, ItemDetail, BtnLinkDocument } from './styles';

import Icon from 'react-native-vector-icons/FontAwesome';

const FlatListItem = ({ item, index, handleViewCustomer, handleAddDocument }) => (
    <Item>
        <ItemDetail onPress={() => handleViewCustomer(item.id)}>
            <Title>{item.nome}</Title>
            <SubTitle>{item.nif}</SubTitle>
        </ItemDetail>
        <BtnLinkDocument onPress={() => handleAddDocument(item.id)}><Icon name="shopping-cart" size={14} color="#FFF" /></BtnLinkDocument>
    </Item>
);

export default ListCustomer = ({ navigation, customers, loadCustomerRequest, loadCustomerSessionRequest, createDocumentCustomerRequest }) => {

    const [refreshing, setRefreshing] = useState(false);

    _onRefresh = () => {
        setRefreshing(true);
        loadCustomerRequest();
        setRefreshing(false);
    }

    handleViewCustomer = id => {
        console.log(id);
        loadCustomerSessionRequest(id);
        navigation.navigate('CustomerViewScreen');
    }

    handleAddDocumentWithCustomer = id => {
        createDocumentCustomerRequest(id);
        navigation.navigate('DocumentViewScreen');
    }

    return (
        <FlatList
            data={customers}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={_onRefresh}
                />
            }
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={({ item, index }) => {
                return (
                    <FlatListItem item={item} index={index} handleViewCustomer={handleViewCustomer} handleAddDocument={handleAddDocumentWithCustomer} />
                );
            }}
        />
    );
};