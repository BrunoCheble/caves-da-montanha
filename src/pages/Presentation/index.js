import React, { useState, useEffect } from 'react';
import { Container } from '~/assets/styles';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SettingActions from '~/store/ducks/settings';

import HTML from 'react-native-render-html';

const Presentation = ({ navigation, presentation }) => (<Container><HTML html={presentation} /></Container>);

const mapStateToProps = state => ({
    presentation: state.setting.presentation
});

const mapDispatchToProps = dispatch => bindActionCreators(SettingActions, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Presentation);
