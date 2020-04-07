import React, { useEffect, useState } from 'react';
import { Modal } from 'react-native';
import { Container, ViewRow, RowColumn, Title, Nome, CondPag, Text, ColText, Nif, Telefone, BtnBack, TextBack, Header, Email, EnderecoWeb, Disponibilidade, Btn, BtnText } from './styles';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CustomerActions from '~/store/ducks/customers';
import SalesoffActions from '~/store/ducks/salesoffs';

import ListAdresse from '~/components/Adresse/list_adresses';
import ModalSales from '~/components/Customer/Modals/sales';
import ModalProducts from '~/components/Customer/Modals/products';
import ModalHistorics from '~/components/Customer/Modals/historics';
import ModalPending from '~/components/Customer/Modals/pending';
import ModalContacts from '~/components/Customer/Modals/contacts';

import TableCredit from '~/components/Customer/Tables/credit_analysis';
import TableSales from '~/components/Customer/Tables/sales_analysis';
import TableMargins from '~/components/Customer/Tables/margins_analysis';


const ViewCustomer = ({ navigation, customer, sales, historics, pending, products, contacts, loadCustomerPendingSuccess, saveSalesoffRequest, removeSalesoffRequest, loadCustomerSalesRequest }) => {

    const [exibemc, setExibemc] = useState(false);
    const [modalVendasVisible, setModalVendasVisible] = useState(false);
    const [modalProdutosVisible, setModalProdutosVisible] = useState(false);
    const [modalHistoricoVisible, setModalHistoricoVisible] = useState(false);
    const [modalPendentesVisible, setModalPendentesVisible] = useState(false);
    const [modalContactosVisible, setModalContactosVisible] = useState(false);
    const [contact, setContact] = useState({});

    useEffect(() => {
        let _contact = contacts.length > 0 ? contacts[0] : { id: null, nome: null, email: null, telemovel: null, telemovelop: null };
        setContact(_contact);
        setExibemc(false);
    }, [contacts]);

    handleToggleMC = () => {
        setExibemc(!exibemc);
    }
    
    handleCloseModal = () => {
        setModalVendasVisible(false);
        setModalProdutosVisible(false);
        setModalHistoricoVisible(false);
        setModalPendentesVisible(false);
        setModalContactosVisible(false);
    }

    handleCustomerSales = (start, end, online) => {

        if(!online) {
            if(!(start > 0) && !(end > 0)) {
                start = 1;
                end = 12;
            }
    
            start = start == '' || start == null ? end : start;handleCustomerSales
            end = end == '' || end == null ? start : end;
        }
        
        loadCustomerSalesRequest({start, end, id: customer.id, online });
    }

    return (
        <Container>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVendasVisible || modalProdutosVisible || modalHistoricoVisible || modalPendentesVisible || modalContactosVisible}
                onRequestClose={() => handleCloseModal()}>
                {
                    modalVendasVisible ?
                        (<ModalSales sales={sales} handleCustomerSales={handleCustomerSales} handleCloseModal={handleCloseModal} />)
                        : modalProdutosVisible ?
                            (<ModalProducts products={products} handleCloseModal={handleCloseModal} />)
                            : modalHistoricoVisible ?
                                (<ModalHistorics historics={historics} handleCloseModal={handleCloseModal} />)
                                : modalPendentesVisible ?
                                    (<ModalPending pending={pending} removeSalesoffRequest={removeSalesoffRequest} saveSalesoffRequest={saveSalesoffRequest} loadCustomerPendingSuccess={loadCustomerPendingSuccess} handleCloseModal={handleCloseModal} />)
                                    : modalContactosVisible ?
                                        (<ModalContacts contacts={contacts} handleCloseModal={handleCloseModal} />)
                                        : <></>
                }
            </Modal>
            <Header>
                <ViewRow>
                    <Nome>{customer.nome}</Nome>
                    <CondPag>C.P.: {customer.cond_pag}</CondPag>
                </ViewRow>
                <ViewRow>
                    <Nif>NIF: {customer.nif}</Nif>
                    <Telefone>Tel.: {customer.telefone}</Telefone>
                </ViewRow>

                <ViewRow>
                    <Email>E-mail: {customer.email}</Email>
                    <EnderecoWeb onPress={() => {handleToggleMC()}}>Endereço web: {customer.endereco_web}</EnderecoWeb>
                </ViewRow>
            </Header>

            <TableCredit customer={customer} />
            <TableSales customer={customer} />
            {exibemc ? (<TableMargins customer={customer} />) : (<></>)}

            <ViewRow style={{marginTop: 10}}>
                <Btn onPress={() => setModalVendasVisible(true)}>
                    <BtnText>Análise de vendas</BtnText>
                </Btn>
                <Btn style={{ marginLeft: 10 }} onPress={() => setModalHistoricoVisible(true)}>
                    <BtnText>Extrato de C/C</BtnText>
                </Btn>
                <Btn style={{ marginLeft: 10 }} onPress={() => setModalProdutosVisible(true)}>
                    <BtnText>Preços</BtnText>
                </Btn>
                <Btn style={{ marginLeft: 10 }} onPress={() => setModalPendentesVisible(true)}>
                    <BtnText>Pendentes</BtnText>
                </Btn>
            </ViewRow>

            <ViewRow>
                <RowColumn style={{ flex: 1 }}>
                    <Title>Nome do contacto: {contact.nome}</Title>
                    <Text>Telefone: {contact.telemovel} | {contact.email}</Text>
                </RowColumn>
                {contacts.length > 1 ? (
                    <Btn onPress={() => setModalContactosVisible(true)}>
                        <BtnText>Outros contactos</BtnText>
                    </Btn>
                ) : <></>}

            </ViewRow>

            <ListAdresse adresses={customer.adresses} navigation={navigation} goback={'CustomerView'} />

            <BtnBack onPress={() => navigation.navigate('CustomerScreen')}>
                <TextBack>Voltar</TextBack>
            </BtnBack>
        </Container>
    );
}

const mapStateToProps = state => ({
    customer: state.customer.session,
    contact: state.customer.contact,
    sales: state.customer.sales,
    historics: state.customer.historics,
    products: state.customer.products,
    pending: state.customer.pending,
    contacts: state.customer.contacts,
});

const mapDispatchToProps = dispatch => bindActionCreators(Object.assign({}, CustomerActions, SalesoffActions), dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewCustomer);

/*
<Btn style={{ marginLeft: 10 }} onPress={() => navigation.navigate('CustomerScreen')}>
                    <BtnText>Clientes do cliente</BtnText>
                </Btn>
                <Btn style={{ marginLeft: 10 }} onPress={() => navigation.navigate('CustomerScreen')}>
                    <BtnText>Interações</BtnText>
                </Btn>
<TableWrapper key={0} style={{ flexDirection: 'row', height: 40, backgroundColor: Color.primary }} >
                    {
                        [
                            '01/01-29/10\nFA 2019',
                            '01/01-29/10\nFA 2018',
                            '%',
                            'FA 2018',
                            '%',
                            'Objetivo',
                            '%'
                        ].map((cellData, cellIndex) => (
                            <Cell
                                key={cellIndex}
                                data={cellData}
                                textStyle={{ fontWeight: 'bold', fontSize: 11, textAlign: 'center', color: '#fff' }}
                                style={{ (cellData == '%' ? width: 30 : flex: 1) }}
                            />
                        ))
                    }
                </TableWrapper>*/
