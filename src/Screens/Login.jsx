import { View, Text, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useContext } from 'react'
import { styles, paperStyles } from '../Styles';
import { TextInput, Button } from 'react-native-paper';
import { AppContext } from '../Contexts/AppContext';
import { login, getAddress } from '../api/index'
import Logo from '../Components/Logo';

export default function Login({ navigation }) {

    const [loading, setLoading] = useState(false);

    const { setLoggedUser, loggedUser, setUserToken, userToken } = useContext(AppContext)

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState(null) // to display an error for the user

    async function userLogin() {
        try {

            setLoading(true);
            const user = await login(email, password);

            user.user.address = await getAddress(user.user.address_id, user.token);
            setLoggedUser(user.user);
            setUserToken(user.token);
            setErr((prev) => null);
            navigation.navigate('LoggedIn');

        } catch (error) {
            console.log("login error:", error.message);
            setErr((prev) => error.message);
        }
        finally {
            setLoading(false);
        }
    }


    return (
        <SafeAreaView style={[styles.main_container, styles.container,]}>
            <View style={[{ marginTop: -150 }, { marginBottom: 50 }]}>
                <Logo width={300} height={60} />
            </View>




            {loading ? <ActivityIndicator /> :
                <View style={[]}>
                    <Text style={[styles.title, { marginBottom: 40 }]}>דף התחברות</Text>
                    <TextInput
                        inputMode='email' style={[styles.input,]} label="כתובת דואר אלקטרוני" value={email} onChangeText={email => setEmail(email)} theme={{ colors: { onSurfaceVariant: 'black', placeholder: 'white', primary: '#66686c' } }} />

                    <TextInput style={[styles.input]} label="סיסמה" value={password}
                        onChangeText={password => setPassword(password)}
                        secureTextEntry={!passwordVisible}
                        right={<TextInput.Icon icon="eye" size={paperStyles.inputIcon.size} name={passwordVisible ? "eye-off" : "eye"} onPress={() => setPasswordVisible(!passwordVisible)} />}
                        theme={{
                            colors: { onSurfaceVariant: 'black', placeholder: 'white', primary: '#66686c' }
                        }} />

                    {err ? <Text style={[styles.errMsg]}>{err}</Text> : null}

                    <TouchableOpacity><Text style={[styles.form_small_heading, { marginLeft: 10 }]} onPress={() => { }} >שחכתי סיסמה</Text></TouchableOpacity>
                    <Button style={styles.btn} mode="contained" onPress={() => { userLogin() }}  >התחברות</Button>

                </View>}

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