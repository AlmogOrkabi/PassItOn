import { View, Text, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useContext } from 'react'
import { styles, paperStyles } from '../Styles';
import { TextInput, Button } from 'react-native-paper';
import { AppContext } from '../Contexts/AppContext';
import { login, getAddress } from '../api/index'
import Logo from '../Components/Logo';

export default function Login({ navigation }) {

    const [loading, setLoading] = useState(false);

    const { setLoggedUser, loggedUser, serverError, setServerError } = useContext(AppContext)

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState(null) //* to display an error for the user

    const resetForm = () => {
        setPasswordVisible(false);
        setEmail('');
        setPassword('');
    }

    async function userLogin() {
        try {

            setLoading(true);
            const user = await login(email, password);
            user.user.address = await getAddress(user.user.address_id);
            setLoggedUser(user.user);


            setErr((prev) => null);
            resetForm();
            navigation.navigate('LoggedIn');

        } catch (error) {
            if (error.status === 500) {
                await setServerError({ status: 500, msg: 'אופס, התרחשה שגיאה בשרת' })
                // console.log(serverError)
                return;
            }
            else {
                // console.log("status log error " + error.status)
                // console.log("login error:", error.msg);
                setErr((prev) => error.msg);
            }
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
                    <Text style={[styles.title, { marginBottom: 40 }]}>התחברות</Text>
                    <TextInput
                        inputMode='email' style={[styles.input]} label="כתובת דואר אלקטרוני" value={email} onChangeText={email => setEmail(email)}
                        mode='outlined'
                        outlineStyle={styles.outlinedInputBorder} />

                    <TextInput style={[styles.input]} label="סיסמה" value={password}
                        onChangeText={password => setPassword(password)}
                        secureTextEntry={!passwordVisible}
                        right={<TextInput.Icon icon="eye" size={paperStyles.inputIcon.size} name={passwordVisible ? "eye-off" : "eye"} onPress={() => setPasswordVisible(!passwordVisible)} />}
                        outlineStyle={styles.outlinedInputBorder}
                        mode='outlined'
                    />

                    {err ? <Text style={[styles.errMsg]}>{err}</Text> : null}
                    <Button style={styles.btn} mode="contained" onPress={() => { userLogin() }}  >התחברות</Button>

                </View>}

        </SafeAreaView>
    )
}
