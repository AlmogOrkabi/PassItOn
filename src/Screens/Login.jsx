import { View, Text, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { styles } from '../Styles';
import { TextInput, Button } from 'react-native-paper';


export default function Login() {
    const [userName, SetUserName] = useState('') // change to email address???
    const [password, SetPassword] = useState('')
    const someUser = {
        userName: "someUser",
        password: "what2233"
    }


    return (
        <SafeAreaView style={[styles.main_container, styles.container]}>
            <Text style={[styles.title, { marginBottom: 40 }]}>דף התחברות</Text>
            <View style={[]}>
                <TextInput style={[styles.input,]} label="שם משתמש" value={userName} onChangeText={userName => SetUserName(userName)} theme={{ colors: { onSurfaceVariant: 'black', placeholder: 'white', primary: '#66686c' } }} />

                <TextInput style={[styles.input]} label="סיסמה" value={password} onChangeText={password => SetPassword(password)} theme={{
                    colors: { onSurfaceVariant: 'black', placeholder: 'white', primary: '#66686c' }
                }} />

                <Button style={styles.btn} mode="contained" onPress={() => { navigation.navigate('Register') }}  >הרשמה</Button>
            </View>
        </SafeAreaView>
    )
}

/*
text input style changes:
theme={{ colors: {
    onSurfaceVariant: 'black', --> text color
    placeholder: 'white', --> ?
    primary: '#66686c' --> border and text color on focus
}}}

*/


// <TextInput style={[styles.input,]} label="סיסמה" value={password} onChangeText={password => SetPassword(password)} theme={{
//     colors: { onSurfaceVariant: 'black', placeholder: 'white', primary: '#66686c' }
// }
// } onFocus={() => setFocused(true)}
//     onBlur={() => setFocused(false)} />