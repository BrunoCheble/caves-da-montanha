import React from 'react';
import { Image } from 'react-native';
import { List, Item, Title, Thumb, Price, Name } from './styles';
import RNFS from 'react-native-fs';

const ItemProduct = ({ item, index, handleClickItem }) => (
    <Item onPress={() => handleClickItem(item)}>
        <Image
            source={{ uri: 'file://' + RNFS.DocumentDirectoryPath + '/products/' + item.imagem }}
            style={Thumb}
        />
    </Item>
);

const ProductAssociates = ({ title, products, handleClickItem }) => (
    <>
    <Title>{title}</Title>
    <List
        data={products}
        horizontal={true}
        keyExtractor={(item, index) => String(item.id)}
        renderItem={({ item, index }) => (
            <ItemProduct handleClickItem={handleClickItem} item={item} index={index} />
        )}
    />
    </>
);

export default ProductAssociates;