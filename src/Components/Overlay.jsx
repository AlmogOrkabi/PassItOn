import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import React, { useContext } from 'react'
// import { Portal } from 'react-native-paper'
import { overlayStyle } from '../Styles'
import { AppContext } from '../Contexts/AppContext';

export default function Overlay() {
    const { overlayVisible, setOverlayVisible } = useContext(AppContext);

    // function handleClose() {
    //     onClose();
    // }

    return (
        overlayVisible ?
            <TouchableWithoutFeedback onPress={() => { setOverlayVisible(false) }}>
                <View style={overlayStyle}></View>
            </TouchableWithoutFeedback>
            : null
    )
}