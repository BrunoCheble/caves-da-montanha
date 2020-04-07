import React, { useState, useEffect } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SyncActions from '~/store/ducks/syncs';

import { Container, BtnReset, Title } from './styles';
import Color from '~/config/colors';

import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';

import RNRestart from 'react-native-restart';
import {  } from 'react-native-gesture-handler';

const Reset = ({ navigation, loading, loadingText, loadSyncResetRequest }) => {

    const [pressed, setPressed] = useState(false);

    useEffect(() => {
        if (!loading && pressed) {
            RNRestart.Restart();
        }
    }, [loading]);

    function handleLoadSyncReset() {
        setPressed(true);
        loadSyncResetRequest();
        navigation.navigate('Auth');
    }

    return (
        <Container>
            <Spinner
                visible={loading}
                textContent={loadingText}
            />
            <BtnReset onPress={() => handleLoadSyncReset()}><Title>RESETAR TUDO</Title></BtnReset>
        </Container>
    );
};

const mapStateToProps = state => ({
    loading: state.sync.loading,
    loadingText: state.sync.loadingText
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(SyncActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Reset);
