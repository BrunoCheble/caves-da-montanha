import React, { useEffect, useState } from 'react';
import { Container, Title, TextBlock, BoxInput, Input, BtnUnlock, BtnText } from './styles';

import { ViewRow, MsgErro } from '~/assets/styles';
import Icon from 'react-native-vector-icons/FontAwesome';

export default FormUnlock = ({ setModalUnlockVisible, handleBlockDocument, unlockFormula }) => {

    const [password, setPassword] = useState('');
    const [result, setResult] = useState(1);
    const [lock, setLock] = useState(0);
    const [msg, setMsg] = useState('');
    const [chances, setChances] = useState(3);

    const habdleUnlockDocument = () => {
        if (password == result) {
            handleBlockDocument(false);
            setMsg('');
        }
        else {
            setMsg(`Contra-senha inválida - Restam ${chances} tentativas.`);
            setChances(chances-1);
        }
    }
    useEffect(() => {
        if(chances == 0) {
            setModalUnlockVisible(false);
        }
    }, [chances]);

    useEffect(() => {
        setLock(Math.floor(Math.random() * (999 - 100 + 1) + 100));
    }, [1]);

    useEffect(() => {
        if (lock != 0) {
            let exp = unlockFormula;
            setResult(eval(exp.replace(/<chave>/g, lock)));
        }
    }, [lock]);

    useEffect(() => {
        console.log(result);
    }, [result]);
    /**/
    return (
        <Container>
            <Title>Crédito bloqueado, digite a contra-senha para desbloquear.</Title>
            <BoxInput>
                <TextBlock>{lock}</TextBlock>
                <Input keyboardType={'numeric'} onChangeText={(value) => setPassword(value)} placeholder="DIGITE AQUI A CONTRA-SENHA" />
                {msg != '' ? (<MsgErro>{msg}</MsgErro>) : <></>}
                <ViewRow style={{ marginTop: 10 }}>
                    <BtnUnlock onPress={() => setModalUnlockVisible(false)}><Icon name="angle-left" style={{ fontSize: 50, color: '#fff' }} /></BtnUnlock>
                    <BtnUnlock onPress={() => handleBlockDocument(true)}><BtnText>Desbloquear Depois</BtnText></BtnUnlock>
                    <BtnUnlock onPress={() => habdleUnlockDocument()}><BtnText>Desbloquear Agora</BtnText></BtnUnlock>
                </ViewRow>
            </BoxInput>
        </Container>
    )
}