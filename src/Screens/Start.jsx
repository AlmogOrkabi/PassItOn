import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Button } from 'react-native-paper';
import { styles } from '../Styles'
import Logo from '../Components/Logo';
import { AppContext } from '../Contexts/AppContext';

export default function Start({ navigation }) {
    const { resetLoggedUser } = useContext(AppContext);
    useEffect(() => {
        resetLoggedUser();
    }, []);

    return (
        <SafeAreaView style={[styles.main_container, styles.container]} >
            <View >
                <Logo width={300} height={100} />

                <Button style={styles.btn} mode="contained" onPress={() => { navigation.navigate('Login') }}>התחברות</Button>
                <Button style={styles.btn} mode="contained" onPress={() => { navigation.navigate('Register') }}  >הרשמה</Button>
            </View>
        </SafeAreaView >
    )
}