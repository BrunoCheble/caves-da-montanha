import React from 'react';
import { Text, View, ScrollView } from 'react-native';

import { BtnBack, TextBack, ModalTitle, TextPresentation } from './styles';

export default ModalConcurrents = ({ concurrents, handleCloseModal }) => (
    <ScrollView>
        <ModalTitle>Produtos Concorrentes</ModalTitle>
        <View style={{ padding: 10 }}>
            <BtnBack onPress={() => handleCloseModal()}>
                <TextBack>Voltar</TextBack>
            </BtnBack>
        </View>
    </ScrollView>
);
