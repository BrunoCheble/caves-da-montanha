import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import { BtnBackDark, TextBack } from './styles';
import PDFView from 'react-native-view-pdf';

export default ModalPdf = ({ file, handleCloseModal }) => {

    return (
        <View style={{ padding: 0, flex: 1 }}>
            <PDFView
                fadeInDuration={250.0}
                style={{ backgroundColor: '#000', flex: 1 }}
                resource={file}
                resourceType={'file'}
                onLoad={() => console.log(`PDF rendered from `)}
                onError={() => console.log('Cannot render PDF', error)}
            />
            <BtnBackDark onPress={() => handleCloseModal()}>
                <TextBack>Voltar</TextBack>
            </BtnBackDark>
        </View>
    );
}
