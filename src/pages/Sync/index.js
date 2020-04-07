import React, { useState, useEffect } from 'react';
import { Container, Title } from './styles';
import ListSync from '~/components/Sync/list_syncs';

const Sync = ({ navigation }) =>
    <Container>
        <ListSync navigation={navigation} />
    </Container>

export default Sync;
