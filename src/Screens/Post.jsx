import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState, useContext } from 'react'
import { styles } from '../Styles';
import { TextInput, Button } from 'react-native-paper';
import { AppContext } from '../Contexts/AppContext';


export default function ProductPage({route}) {

  const { selected } = route.params;
const { AddToCart } = useContext(OrdersContext);

function handlePress() {
  AddToCart(selected);
}
  return (
    <View style={styles.pageContainer}>

            <View style={[styles.productContainer, styles.boxShadow]}>
                <Text style={[styles.title, { marginTop: 25, marginBottom: 0 }]}>{selected.name}</Text>
                <Image source={{ uri: selected.img }} style={[styles.productImg]}></Image>
                <View style={{ margin: '3%', }}>
                    <Text style={styles.productPageText} > {selected.storage}.</Text>
                    <Text style={[styles.productPageText, styles.priceText]}>    price:{selected.price}</Text>
                    <Button style={{ margin: '3%' }} title="Add to Cart" onPress={() => handlePress()} />
                </View>
            </View>
        </View >
  )
}