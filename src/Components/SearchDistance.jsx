import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'




import Slider from '@react-native-community/slider';


export default function SearchDistance({ min, max, value, setValue }) {

    return (
        <View>
            <Text>{value}</Text>
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