import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';

const BackButton = () => {

    useEffect(() => {

        BackHandler.addEventListener('hardwareBackPress', () => (true));

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', () => (true));
        }

    }, []);

    return (<></>);
}

export default BackButton;