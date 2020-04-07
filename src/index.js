import React from 'react';
import { StatusBar } from 'react-native';

import '~/config/ReactotronConfig';
import BackButton from '~/config/backhandler';

import { Provider } from 'react-redux';
import store from './store';

import Routes from '~/routes';

const App = () => (
    <Provider store={store}>
        <BackButton />
        <StatusBar barStyle="light-content" backgroundColor="#221e1f" />
        <Routes />
    </Provider>
);

export default App;
