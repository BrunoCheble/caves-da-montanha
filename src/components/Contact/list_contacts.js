import React, { useState, useEffect } from 'react';
import { RefreshControl } from 'react-native';
import { FlatList, Item, Title, SubTitle } from './styles';
import { formatTextPhone } from '~/assets/helper';

const FlatListItem = ({ item, index, handleContactSession }) => (
    <Item onPress={() => handleContactSession(item.id)}>
        <Title>{item.nome}</Title>
        <SubTitle>
            {formatTextPhone(item.codtelemovel, item.telemovel)}
            {(item.telemovelop != null && item.telemovelop != '' ? ' | ' + formatTextPhone(item.codtelemovelop, item.telemovelop) : '')}
        </SubTitle>
    </Item>
);

const ListContact = ({ navigation, contacts, loadContactRequest, loadContactSessionRequest }) => {

    const [refreshing, setRefreshing] = useState(false);

    _onRefresh = () => {
        setRefreshing(true);
        loadContactRequest();
        setRefreshing(false);
    }

    useEffect(() => {
        loadContactRequest();
    }, []);

    handleContactSession = id => {
        loadContactSessionRequest(id);
        navigation.navigate('ContactView', { id });
    }
    return (
        <FlatList
            data={contacts}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={_onRefresh}
                />
            }
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={({ item, index }) => {
                return (
                    <FlatListItem item={item} index={index} handleContactSession={handleContactSession} />
                );
            }}
        />
    );
};

export default ListContact;
