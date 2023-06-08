import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper';
import { styles } from '../Styles'


export default function Start() {
    return (
        <SafeAreaView style={[styles.container,]}>
            <View>
                <Text>ברוכים הבאים</Text>
                <TouchableOpacity style={[styles.btn,]}><Text>התחברות</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.btn,]}><Text>הרשמה</Text></TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}