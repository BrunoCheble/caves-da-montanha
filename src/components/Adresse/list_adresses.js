import React from 'react';
import { FlatList, Item, Title, Endereco, Complemento, Contacto } from './styles';
import Color from '~/config/colors';

import { Table, Row, Rows } from 'react-native-table-component';

const FlatListItem = ({ item, index, navigation, goback }) => (
    <Item onPress={() => navigation.navigate('AdresseView', { id: item.id, goback })}>
        <Endereco>{item.morada}</Endereco>
        <Complemento>{item.cod_postal_local} | {item.distrito} | {item.pais}</Complemento>
        {item.nome != null ? (<Contacto>Contacto: {item.nome} | {item.telemovel} | {item.email}</Contacto>) : (<></>)}
        {
            item.attendances.length > 0 ? (
                <Table borderStyle={{ borderWidth: 1, borderColor: Color.soft }} style={{ marginTop: 10 }}>
                    <Row data={['Dia', 'Manhã Início', 'Manhã Fim', 'Tarde Início', 'Tarde Fim']} style={{ height: 20, backgroundColor: Color.primary }} textStyle={{ fontWeight: 'bold', textAlign: 'center', fontSize: 11, color: '#fff' }} />
                    <Rows data={item.attendances} textStyle={{ margin: 5, textAlign: 'center', fontSize: 9, color: Color.dark }} />
                </Table>
            ) : (<></>)
        }
    </Item>
);

const ListAdresse = ({ navigation, adresses, goback }) => (
    <>
        <Title>Endereços</Title>
        <FlatList
            data={adresses}
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={({ item, index }) => {
                return (
                    <FlatListItem item={item} index={index} navigation={navigation} goback={goback} />
                );
            }}
        />
    </>
);

export default ListAdresse;
