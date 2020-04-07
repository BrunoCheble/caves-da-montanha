import React, { useEffect } from 'react';
import { Container } from './styles';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CustomerActions from '~/store/ducks/customers';
import FormDocumentActions from '~/store/ducks/forms/documents';
import SettingActions from '~/store/ducks/settings';

import ListCustomer from '~/components/Customer/list_customers';
import Search from '~/components/Search';

const Customer = ({ navigation, customers, loadCustomerRequest, loadCustomerSessionRequest, createDocumentCustomerRequest, loading, loadSettingRequest }) => {
    
    useEffect(() => {
        if(loading == false) {
            loadCustomerRequest();
            loadSettingRequest();
        }
    }, [loading]);

    return (
        <Container>
            <Search searchRequest={loadCustomerRequest} addRequest={null} />
            <ListCustomer 
                loadCustomerSessionRequest={loadCustomerSessionRequest}
                customers={customers} 
                loadCustomerRequest={loadCustomerRequest} 
                createDocumentCustomerRequest={createDocumentCustomerRequest} 
                navigation={navigation} 
            />
        </Container>
    );
}

const mapStateToProps = state => ({
    customers: state.customer.data,
    loading: state.sync.loading
});

const mapDispatchToProps = dispatch => bindActionCreators(Object.assign({}, CustomerActions, FormDocumentActions, SettingActions), dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Customer);