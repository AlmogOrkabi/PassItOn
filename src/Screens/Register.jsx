import { View, Text, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { styles } from '../Styles';
import { TextInput, Button } from 'react-native-paper';

export default function Register() {
    return (
        <SafeAreaView style={[styles.main_container, styles.container]}>
            <Text style={[styles.title, { marginBottom: 40 }]}>דף הרשמה</Text>
            <View style={[]}>
                <TextInput style={[styles.input,]} label="שם משתמש" value={null} theme={{ colors: { onSurfaceVariant: 'black', placeholder: 'white', primary: '#66686c' } }} />

                <TextInput style={[styles.input]} label="סיסמה" value={null} theme={{
                    colors: { onSurfaceVariant: 'black', placeholder: 'white', primary: '#66686c' }
                }} />

                <Button style={styles.btn} mode="contained" onPress={() => { navigation.navigate('Register') }}  >הרשמה</Button>
            </View>
        </SafeAreaView>
    )
}