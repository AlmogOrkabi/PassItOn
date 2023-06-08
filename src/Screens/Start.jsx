import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper';
import { styles } from '../Styles'


export default function Start({ navigation }) {
    return (
        <SafeAreaView style={[styles.main_container, styles.container]}>
            <View>
                <Text style={[styles.title,]}>ברוכים הבאים</Text>
                <Button style={styles.btn} mode="contained" onPress={() => { navigation.navigate('Login') }}>התחברות</Button>
                <Button style={styles.btn} mode="contained" onPress={() => { navigation.navigate('Register') }}  >הרשמה</Button>
            </View>
        </SafeAreaView >
    )
}