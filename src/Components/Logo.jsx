import { View, Text, Image, useWindowDimensions } from 'react-native'
import React from 'react'
import { styles } from '../Styles'
//import { Dimensions } from 'react-native'


export default function Logo({ width = 200, height = 70, }) {

    const window = useWindowDimensions();
    const marginTop = window.height * 0.05;

    return (
        <View style={[styles.logocontainer, { marginTop: marginTop }]} >
            <Image style={[{ resizeMode: 'contain', }, { width: width }, { height: height },]} source={require('../Pictures/bpio.png')} />
        </View>
    )
}