import React, { useState, useEffect } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SyncActions from '~/store/ducks/syncs';
import AuthActions from '~/store/ducks/auths';

import { Image, StyleSheet, Dimensions, NetInfo, Platform, PermissionsAndroid } from 'react-native';
import { BoxLogo, Input, BoxInput, SignIn, SignInText, Title, Container } from './styles';

import logo from '~/images/logo.png';
import Spinner from 'react-native-loading-spinner-overlay';

const Auth = ({ navigation, session, loadAuthRequest, loadAuthSessionRequest }) => {
    [user, setUser] = useState('vitor');
    [pass, setPass] = useState('123');
    [loading, setLoading] = useState(false);
    [loadingText, setLoadingText] = useState('');
    [parameters, setParameters] = useState({});
    [redirect, setRedirect] = useState('Customer');

    validatePermissions = async () => {
        try {
            if (Platform.OS === "android") {
                await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                ]);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        // Localiza se existe registo
        loadAuthSessionRequest();
    }, []);

    useEffect(() => {
        validatePermissions();
        
        setLoading(true);
        // Não existe utilizador, logo é a primeira sincronização completa
        if (session.id != "" && session.id != null) {
            setLoading(false);
            navigation.navigate(redirect, parameters);
        }
        else {
            setTimeout(() => {
                setLoading(false);
            },1500);
        }
    }, [session.id]);

    function handlerAuth() {

        if (session.id != "" && session.id != null && session.username == user && session.password != '') {
            navigation.navigate('Customer');
            return;
        }
        setLoadingText('Entrando...');
        setLoading(true);

        setTimeout(() => {
            setParameters({ autosync: true });
            setRedirect('Sync');

            // Autenticação
            loadAuthRequest({ username: user, password: pass });

            // Validação
            if (session.id == null) {
                setLoading(false);
                Alert.alert('Falha na Autenticação', 'Utilizador e/ou Senha inválidos ou o perfil não condiz com o utilizador.', [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
            }
        }, 500);
    }

    return (
        <Container
            source={{
                uri:
                    'http://media.cavesdamontanha.pt//MULTIMEDIA/FOTOS/12/0003E0CEF2ABE8.jpg',
            }}
            style={styles.container}
            resizeMode="cover"
        >
            <Spinner
                visible={loading}
                textContent={loadingText}
                textStyle={styles.spinnerText}
            />
            <BoxLogo>
                <Image source={logo} style={styles.logo} resizeMode="contain" />
            </BoxLogo>
            <BoxInput>
                <Title>Faça seu login</Title>

                <Input
                    placeholder="Utilizador"
                    value={user}
                    onChangeText={setUser}
                />
                <Input
                    secureTextEntry={true}
                    placeholder="Senha"
                    value={pass}
                    onChangeText={setPass}
                />
                
                
                <SignIn onPress={() => handlerAuth()}>
                    <SignInText>Entrar</SignInText>
                </SignIn>

            </BoxInput>
        </Container>
    );
};

const styles = StyleSheet.create({
    logo: {
        height: Dimensions.get('window').height * 0.15,
        marginVertical: Dimensions.get('window').height * 0.05,
        width: Dimensions.get('window').height * 0.15 * (1950 / 662),
    },
    spinnerText: {
        color: '#FFF',
    }
});

const mapStateToProps = state => ({
    session: state.auth.user
});

const mapDispatchToProps = dispatch => bindActionCreators(Object.assign({}, AuthActions, SyncActions), dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Auth);
