import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState, useContext } from 'react'
import { styles } from '../Styles';
import { TextInput, Button } from 'react-native-paper';
import { AppContext } from '../Contexts/AppContext';


export default function Login({ navigation }) {

    const { users, Login, setLoggedUser, loggedUser } = useContext(AppContext)


    const [userName, SetUserName] = useState('') // change to email address???
    const [password, SetPassword] = useState('')
    // const someUser = {
    //     userName: "someUser",
    //     password: "what2233"
    // }

    function userLogin() {
        const user = Login(userName, password);
        if (!user) {
            console.log('not found');
        }
        else {
            setLoggedUser(user);
            console.log("LOGGED")
            navigation.navigate('LoggedIn');
        }
    }


    return (
        <SafeAreaView style={[styles.main_container, styles.container]}>
            <Text style={[styles.title, { marginBottom: 40 }]}>דף התחברות</Text>
            <View style={[]}>
                <TextInput style={[styles.input,]} label="שם משתמש" value={userName} onChangeText={userName => SetUserName(userName)} theme={{ colors: { onSurfaceVariant: 'black', placeholder: 'white', primary: '#66686c' } }} />


                {/* need to hide the password */}
                <TextInput style={[styles.input]} label="סיסמה" value={password} onChangeText={password => SetPassword(password)} theme={{
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