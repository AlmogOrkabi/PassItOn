import { View, SafeAreaView } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Button } from 'react-native-paper';
import { styles, theme } from '../Styles'
import Logo from '../Components/Logo';
import { AppContext } from '../Contexts/AppContext';

export default function Start({ navigation }) {
    const { resetLoggedUser } = useContext(AppContext);
    useEffect(() => {
        resetLoggedUser();
    }, []);

    return (
        <SafeAreaView style={[styles.main_container2, { justifyContent: 'space-evenly' }]} >
            <View style={[]}>
                <Logo width={300} height={100} />
            </View>
            <View style={[styles.sub_container3]}>
                <Button style={[styles.btn, { backgroundColor: theme.mainColor }]} mode="contained" onPress={() => { navigation.navigate('Login') }}>התחברות</Button>
                <Button style={[styles.btn, { backgroundColor: theme.mediumGreen }]} mode="contained" onPress={() => { navigation.navigate('Register') }}  >הרשמה</Button>
            </View>

        </SafeAreaView >
    )
}