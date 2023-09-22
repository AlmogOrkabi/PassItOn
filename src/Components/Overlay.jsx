import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import React from 'react'
import { Portal } from 'react-native-paper'
import { overlayStyle } from '../Styles'


export default function Overlay({ onClose }) {
    return (

        <TouchableWithoutFeedback onPress={onClose}>
            <View style={overlayStyle}></View>
        </TouchableWithoutFeedback>

    )
}