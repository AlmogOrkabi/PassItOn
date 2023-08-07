import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'

import { RadioButton } from 'react-native-paper';
import { styles } from '../Styles'


export default function ChooseLocation() {

    const [fromLocation, setFromLocation] = useState('user')

    useEffect(() => {
        console.log("fromLocation", fromLocation)
    }, [fromLocation]);



    return (
        <View>
            <View >
                <RadioButton.Group onValueChange={newValue => setFromLocation(newValue)} value={fromLocation}>
                    <View style={[styles.flexRow, { justifyContent: 'center' }]}>
                        <View style={[styles.flexRow]}>
                            <RadioButton value="user" />
                            <Text>המיקום שלי</Text>
                        </View>
                        <View style={[styles.flexRow]}>
                            <RadioButton value="newLocation" />
                            <Text>מיקום חדש</Text>
                        </View>
                    </View>
                </RadioButton.Group>
            </View>
        </View>
    )
}