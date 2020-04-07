import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';

import { BtnBack, TextBack, ModalTitle, TextHeader, TextBody } from './styles';
import { formatTextPhone } from '~/assets/helper';

import { Table, TableWrapper, Cell } from 'react-native-table-component';

import Color from '~/config/colors';

export default ModalContacts = ({ contacts, handleCloseModal }) => {

    return (
        <ScrollView>
            <ModalTitle>Contactos</ModalTitle>
            <View style={{ padding: 10 }}>

                <Table borderStyle={{ borderWidth: 1, borderColor: Color.soft }} style={{ marginBottom: 15 }}>
                    <TableWrapper key={0} style={{ flexDirection: 'row', height: 30, backgroundColor: Color.primary }} >
                        <Cell key={0} style={{ width: 150 }} data={<TextHeader>Nome</TextHeader>} />
                        <Cell key={1} data={<TextHeader>Telemóvel</TextHeader>} />
                        <Cell key={2} data={<TextHeader>E-mail</TextHeader>} />
                        <Cell key={3} data={<TextHeader>Tipo de Relação</TextHeader>} />
                    </TableWrapper>
                    {
                        contacts.map((cellData, cellIndex) => (
                            <TableWrapper key={cellIndex} style={{ flexDirection: 'row' }} >
                                <Cell key={0} style={{ width: 150 }} data={<TextBody style={{ fontWeight: 'bold' }}>{cellData.nome}</TextBody>} />
                                <Cell key={1} data={
                                    <TextBody>
                                        {formatTextPhone(cellData.codtelemovel, cellData.telemovel)}
                                        {(cellData.telemovelop != null && cellData.telemovelop != '' ? ' | ' + formatTextPhone(cellData.codtelemovelop, cellData.telemovelop) : '')}
                                    </TextBody>
                                } />
                                <Cell key={2} data={<TextBody>{cellData.email}</TextBody>} />
                                <Cell key={3} data={<TextBody>{cellData.tipo_relacao_contacto}</TextBody>} />
                            </TableWrapper>
                        ))
                    }
                </Table>

                <BtnBack style={{ marginBottom: 40 }} onPress={() => handleCloseModal()}>
                    <TextBack>Voltar</TextBack>
                </BtnBack>
            </View>
        </ScrollView>
    );
}
