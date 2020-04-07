import React from 'react';
import { Container } from './styles';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DocumentActions from '~/store/ducks/documents';
import FormDocumentActions from '~/store/ducks/forms/documents';

import Search from '~/components/Search';
import ListDocument from '~/components/Document/list_documents';

const Document = ({ navigation, documents, loadDocumentRequest, createDocumentRequest, loadDocumentSessionRequest }) => {
    
    handleAddDocument = () => {
        createDocumentRequest(null);
        navigation.navigate('DocumentViewScreen');
    }
    
    return (
        <Container>
            <Search navigation={navigation} searchRequest={loadDocumentRequest} addRequest={handleAddDocument} />
            <ListDocument 
                navigation={navigation} 
                documents={documents} 
                loadDocumentRequest={loadDocumentRequest} 
                loadDocumentSessionRequest={loadDocumentSessionRequest} 
            />
        </Container>
    );
}

const mapStateToProps = state => ({
    documents: state.document.data
});

const mapDispatchToProps = dispatch => bindActionCreators(Object.assign({}, DocumentActions, FormDocumentActions), dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Document);

