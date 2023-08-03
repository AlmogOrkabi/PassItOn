import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState, useContext } from 'react'
import { styles } from '../Styles';
import { TextInput, Button } from 'react-native-paper';
import { AppContext } from '../Contexts/AppContext';
import { login, getUserAddress } from '../api/index'

export default function Login({ navigation }) {

    const { users, Login, setLoggedUser, loggedUser, setUserToken, userToken } = useContext(AppContext)


    const [email, setEmail] = useState('') // change to email address???
    const [password, setPassword] = useState('')
    // const someUser = {
    //     userName: "someUser",
    //     password: "what2233"
    // }

    async function userLogin() {
        try {
            const user = await login(email, password);
            if (!user) {
                console.log('not found');
            }
            else {
                // console.log("USER LOGGED:", user)
                // console.log("USER LOGGED:", JSON.stringify(user, null, 2));
                user.user.address = await getUserAddress(user.user.address_id, user.token);
                setLoggedUser(user.user);
                setUserToken(user.token);
                // console.log("logged user:", JSON.stringify(loggedUser, null, 2))
                navigation.navigate('LoggedIn');
            }
        } catch (error) {
            console.log("login error:", error)
        }
    }


    return (
        <SafeAreaView style={[styles.main_container, styles.container]}>
            <Text style={[styles.title, { marginBottom: 40 }]}>דף התחברות</Text>
            <View style={[]}>
                <TextInput style={[styles.input,]} label="כתובת דואר אלקטרוני" value={email} onChangeText={email => setEmail(email)} theme={{ colors: { onSurfaceVariant: 'black', placeholder: 'white', primary: '#66686c' } }} />


                {/* need to hide the password */}
                <TextInput style={[styles.input]} label="סיסמה" value={password} onChangeText={password => setPassword(password)} theme={{
                    colors: { onSurfaceVariant: 'black', placeholder: 'white', primary: '#66686c' }
                }} />
                <TouchableOpacity><Text style={[styles.form_small_heading, { marginLeft: 10 }]} onPress={() => { c }} >שחכתי סיסמה</Text></TouchableOpacity>
                <Button style={styles.btn} mode="contained" onPress={() => { userLogin() }}  >התחברות</Button>
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