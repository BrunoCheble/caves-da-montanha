import React, { useState, useEffect } from 'react';
import { Container } from './styles';
import ListProduct from '~/components/Product/list_products';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ProductActions from '~/store/ducks/products';

import FormDocumentItemActions from '~/store/ducks/forms/document_items';

const Product = ({ navigation, products, document, loadProductRequest, toggleDocument, saveDocumentItemRequest }) => (
    <Container>
        <ListProduct
            products={products}
            loadProductRequest={loadProductRequest}
            navigation={navigation}
            toggleDocument={toggleDocument}
            document={document}
            saveDocumentItemRequest={saveDocumentItemRequest} />
    </Container>
);

const mapStateToProps = state => ({
    products: state.product.data,
    document: state.product.document
});

const mapDispatchToProps = dispatch => bindActionCreators(Object.assign({}, ProductActions, FormDocumentItemActions), dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Product);