import { View, Text, Image } from 'react-native'
import React from 'react'
import { styles } from '../Styles'

export default function Logo({ width, height }) {
    return (
        <View style={[styles.logocontainer, styles.sub_container]} >
            <Image style={[{ resizeMode: 'contain' }, { width: width }, { height: height }]} source={require('../Pictures/bpio.png')} />
        </View>
    )
}