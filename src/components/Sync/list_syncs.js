import React, { useState, useEffect } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SyncActions from '~/store/ducks/syncs';

import { Container, FlatList, Item, Title, Buttons, BtnSync, TextSync } from './styles';
import Color from '~/config/colors';

import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';

import RNRestart from 'react-native-restart';

const FlatListItem = ({ item, toggleActiveModule }) => (
    <Item onPress={() => toggleActiveModule(item, !item.isActive)}>
        {item.isActive ? <Icon name="check-square" size={30} color={Color.primary} /> : <Icon name="square-o" size={30} color={Color.primary} />}
        <Title>{item.name}</Title>
    </Item>
);

const ListSync = ({ navigation, modules, loading, loadingText, loadSyncSuccess, loadSyncRequest, loadSyncCompleteRequest }) => {

    const [pressed, setPressed] = useState(false);

    useEffect(() => {
        if (navigation.getParam('autosync')) {
            loadSyncCompleteRequest();
            navigation.navigate('Customer');
        }
    }, []);

    useEffect(() => {
        if (!loading && pressed) {
            RNRestart.Restart();
        }
    }, [loading]);

    function handleLoadSync() {
        setPressed(true);
        const modulesActives = modules.filter(item => item.isActive).map(({ id }) => id);
        loadSyncRequest(modulesActives);
    }

    const handleToggleActive = (item, isActive) => {
        loadSyncSuccess(modules.map((value, index) => item.id == value.id ? { ...value, isActive } : value));
    }

    return (
        <Container>
            <Spinner
                visible={loading}
                textContent={loadingText}
            />
            <FlatList
                data={modules}
                keyExtractor={(item, index) => item.id.toString()}
                renderItem={({ item, index }) => {
                    return (
                        <FlatListItem item={item} toggleActiveModule={handleToggleActive} />
                    );
                }}
            />
            <Buttons>
                <BtnSync onPress={() => handleLoadSync()}><TextSync>SINCRONIZAR</TextSync></BtnSync>
            </Buttons>
        </Container>
    );
};

const mapStateToProps = state => ({
    modules: state.sync.data,
    loading: state.sync.loading,
    loadingText: state.sync.loadingText
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(SyncActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListSync);
