import React from 'react';

import { BoxSearch, Input, AddButton } from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';

export default Search = ({ searchRequest, addRequest })  => {

    function handleSearch(text) {
        if (text.length > 3) {
            searchRequest(text);
        }
        else if (text.length == 0) {
            searchRequest();
        }
    }

    return (
        <BoxSearch>
            <Icon style={{paddingLeft: 10, paddingRight: 10}} name="search" size={14} color="#0d0d0d" />
            <Input
                placeholder="Localizar"
                underlineColorAndroid="transparent"
                onChangeText={(text) => handleSearch(text)}
            />
            {addRequest != null ? (<AddButton onPress={() => addRequest()}><Icon name="plus" size={14} color="#FFF" /></AddButton>) : (<></>)}
        </BoxSearch>
    );
}
