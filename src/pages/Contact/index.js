import React, { useState, useEffect } from 'react';
import { Container } from './styles';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ContactActions from '~/store/ducks/contacts';

import Search from '~/components/Search';
import ListContact from '~/components/Contact/list_contacts';

const Contact = ({ navigation, contacts, loadContactRequest, loadContactSessionRequest }) => {
    
    handleAddContact = () => {
        loadContactSessionRequest(null);
        navigation.navigate('ContactForm');
    }

    return (
        <Container>
            <Search searchRequest={loadContactRequest} addRequest={handleAddContact} />
            <ListContact contacts={contacts} loadContactRequest={loadContactRequest} loadContactSessionRequest={loadContactSessionRequest} navigation={navigation} />
        </Container>
    );
}

const mapStateToProps = state => ({
    contacts: state.contact.data,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(ContactActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Contact);