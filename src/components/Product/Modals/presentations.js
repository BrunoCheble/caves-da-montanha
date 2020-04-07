import React from 'react';
import { Text, View, ScrollView } from 'react-native';

import { BtnBack, TextBack, ModalTitle, TextPresentation } from './styles';

export default ModalPresentation = ({ product, handleCloseModal }) => (
    <ScrollView>
        <ModalTitle>Protocolo de Apresentação</ModalTitle>
        <View style={{ padding: 10 }}>
            <TextPresentation>{product.protocolo_apresentacao}</TextPresentation>
            <BtnBack onPress={() => handleCloseModal()}>
                <TextBack>Voltar</TextBack>
            </BtnBack>
        </View>
    </ScrollView >
);
