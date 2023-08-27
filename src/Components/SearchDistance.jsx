import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { styles } from '../Styles'



import Slider from '@react-native-community/slider';


export default function SearchDistance({ min, max, value, setValue }) {

    return (
        <View style={[styles.container]}>
            <Text>מרחק בקילומטרים: <Text style={[styles.mediumText]}>{value}</Text></Text>
            <Slider
                style={[{ width: 300, height: 40 },]}
                minimumValue={min}
                maximumValue={max}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                value={value}
                onValueChange={setValue}
                step={1}
            />
        </View>
    )
}