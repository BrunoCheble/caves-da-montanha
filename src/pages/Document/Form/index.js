import React, { useState, useEffect } from 'react';
import { Container, BoxInput, Buttons, SubmitBtn, SubmitText, BtnBack, TextBack } from './styles';
/**/
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FormDocumentActions from '~/store/ducks/forms/documents';
/**/
import RNPickerSelect from 'react-native-picker-select';

const Form = ({ navigation, data, listCustomers, listTypes, listAdresses, loadListAdressesRequest, saveDocumentRequest, loadListFormDocumentRequest }) => {

    const [cliente, setCliente] = useState(data.id_cliente_erp);
    const [adresse, setAdresse] = useState(data.id_endereco);
    const [type, setType] = useState(data.id_tipo_transacao);

    useEffect(() => {
        loadListFormDocumentRequest();
    }, []);

    useEffect(() => {
        loadListAdressesRequest(cliente);
    }, [cliente]);

    useEffect(() => {
        setCliente(data.id_cliente_erp);
    }, [data]);

    useEffect(() => {
        if (listAdresses.length > 0) {
            setTimeout(() => setAdresse(listAdresses[0].value), 1500);
        }
    }, [listAdresses]);

    handleSubmitFormDocument = () => {
        saveDocumentRequest({ id: data.id, id_cliente_erp: cliente, id_endereco: adresse, id_tipo_transacao: type });
        navigation.navigate('DocumentViewScreen');
    }

    return (
        <Container>
            <BoxInput>
                
                <RNPickerSelect
                    onValueChange={(value) => setCliente(value)}
                    items={listCustomers}
                    value={cliente}
                    placeholder={{
                        label: 'Selecione o cliente',
                        value: null,
                    }}
                />

                <RNPickerSelect
                    onValueChange={(value) => setAdresse(value)}
                    items={listAdresses}
                    value={adresse}
                    placeholder={{
                        label: 'Selecione o endereço de entrega',
                        value: null,
                    }}
                />

                <RNPickerSelect
                    onValueChange={(value) => setType(value)}
                    items={listTypes}
                    value={type}
                    placeholder={{
                        label: 'Selecione o tipo de transação',
                        value: null,
                    }}
                />
                <Buttons>
                    <BtnBack onPress={() => navigation.navigate('DocumentViewScreen')}><TextBack>Voltar</TextBack></BtnBack>
                    <SubmitBtn onPress={() => handleSubmitFormDocument()}><SubmitText>Guardar</SubmitText></SubmitBtn>
                </Buttons>
            </BoxInput>
        </Container>
    );
}

const mapStateToProps = state => ({
    data: state.formDocument.data,
    listCustomers: state.formDocument.listCustomers,
    listAdresses: state.formDocument.listAdresses,
    listTypes: state.formDocument.listTypes,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(FormDocumentActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Form);