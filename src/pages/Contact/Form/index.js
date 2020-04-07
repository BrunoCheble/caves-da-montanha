import React, { useState, useEffect } from 'react';

import { Container, ViewColumn, ViewRow, MsgErro } from '~/assets/styles';
import { BoxInput, Buttons, SubmitBtn, SubmitText, BtnBack, TextBack, Input, Label, MaskPhone } from './styles';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ContactActions from '~/store/ducks/contacts';

import { TextInputMask, TextMask } from 'react-native-masked-text';

const FormContact = ({ navigation, contact, saveContactRequest }) => {

    const [nome, setNome] = useState('');

    const [codtelemovel, setCodtelemovel] = useState('');
    const [telemovel, setTelemovel] = useState('');

    const [codtelemovelop, setCodtelemovelop] = useState('');
    const [telemovelop, setTelemovelop] = useState('');

    const [email, setEmail] = useState('');
    const [observacoes, setObservacoes] = useState('');
    const [erro, setErro] = useState('');

    fillFormContact = () => {
        setErro('');
        setNome(contact.nome);
        setCodtelemovel(contact.codtelemovel);
        setTelemovel(contact.telemovel);
        setCodtelemovelop(contact.codtelemovelop);
        setTelemovelop(contact.telemovelop);
        setEmail(contact.email);
        setObservacoes(contact.observacoes);
    }
    useEffect(() => {
        fillFormContact();
    }, [contact]);

    handleBackView = () => {
        if (contact.id) {
            fillFormContact();
            navigation.navigate('ContactView');
        }
        else {
            navigation.navigate('Contact');
        }
    }
    
    handleChangeCod = (value,type) => {
        
        if(type == 'telemovel') {
            setCodtelemovel(value);
            if((telemovel != '' && telemovel != null) && (telemovel.length != 9 && value == 351)) {
                setTelemovel('');
            }
        }
        else {
            setCodtelemovelop(value);
            if((telemovelop != '' && telemovelop != null) && (telemovelop.length != 9 && value == 351)) {
                setTelemovelop('');
            }
        }
    }
    
    validateEmail = () => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    validateForm = () => {

        let msg = [];
        let telemovelIsEmpty = telemovel == null || telemovel == '';
        let codtelemovelIsEmpty = codtelemovel == null || codtelemovel == '';
        let telemovelopIsEmpty = telemovelop == null || telemovelop == '';
        let codtelemovelopIsEmpty = codtelemovelop == null || codtelemovelop == '';

        if(telemovelIsEmpty && !codtelemovelIsEmpty) {
            setCodtelemovel('');
        }
        
        if(telemovelopIsEmpty && !codtelemovelopIsEmpty) {
            setCodtelemovelop('');
        }
        
        if (nome == null || nome == '') {
            msg.push('Nome é obrigatório');
        }

        if (telemovelIsEmpty) {
            msg.push('Telemóvel é obrigatório');
        }
        else if((codtelemovel == 351 || codtelemovelIsEmpty) && !telemovelIsEmpty && telemovel.length != 9){
            msg.push('Telemóvel está incorreto, ou precisa inserir o código do país.');
        }

        if((codtelemovelop == 351 || codtelemovelopIsEmpty) && !telemovelopIsEmpty && telemovelop.length != 9){
            msg.push('Telemóvel opcional está incorreto, ou precisa inserir o código do país.');
        }
        
        if (email != null && email != '' && !validateEmail()) {
            msg.push('Informe um e-mail válido');
        }

        if (msg.length > 0) {
            setErro(msg.join('\n'));
            return false;
        }

        return true;
    }

    handleSaveContact = () => {

        if (!validateForm()) {
            return false;
        }

        saveContactRequest({
            id: contact.id,
            nome,
            codtelemovel,
            telemovel,
            codtelemovelop,
            telemovelop,
            email: email != null ? email.toLowerCase() : null,
            observacoes
        });

        navigation.navigate('ContactView');
    }

    return (
        <Container>
            {erro != '' ? (<MsgErro>{erro}</MsgErro>) : <></>}
            <BoxInput>
                <Label>Nome</Label>
                <Input
                    value={nome}
                    onChangeText={(value) => setNome(value)}
                    label="Nome" />
                <Label>Telemóvel</Label>
                
                <ViewRow>
                    <Input style={{width: 80, marginRight: 10}} keyboardType={'numeric'} value={codtelemovel} onChangeText={(value) => handleChangeCod(value,'telemovel')} />
                    <Input style={{flex: 1}} maxLength={(codtelemovel == 351 ? 9 : 20)} value={telemovel} keyboardType={'numeric'} onChangeText={(value) => setTelemovel(value)} />
                </ViewRow>
                
                <Label>Telemóvel (opcional)</Label>

                <ViewRow>
                    <Input style={{width: 80, marginRight: 10}} keyboardType={'numeric'} value={codtelemovelop} onChangeText={(value) => handleChangeCod(value,'telemovelop')} />
                    <Input style={{flex: 1}} maxLength={(codtelemovelop == 351 ? 9 : 20)} value={telemovelop} keyboardType={'numeric'} onChangeText={(value) => setTelemovelop(value)} />
                </ViewRow>

                <Label>Email</Label>
                <Input value={email} keyboardType={'email-address'} onChangeText={(value) => setEmail(value)} placeholder="" />
                <Label>Observações</Label>
                <Input
                    value={observacoes}
                    onChangeText={(value) => setObservacoes(value)}
                    multiline
                    style={{height: 100}}
                    numberOfLines={4}
                    maxLength={500} />

                <Buttons>
                    <BtnBack onPress={() => handleBackView()}><TextBack>Voltar</TextBack></BtnBack>
                    <SubmitBtn onPress={() => handleSaveContact()}><SubmitText>Guardar</SubmitText></SubmitBtn>
                </Buttons>
            </BoxInput>
        </Container>
    );
}

const mapStateToProps = state => ({
    contact: state.contact.session
});

const mapDispatchToProps = dispatch => bindActionCreators(ContactActions, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormContact);