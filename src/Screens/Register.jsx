import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from '../Styles';
import { TextInput, Button, IconButton } from 'react-native-paper';
import BasicDetailsForm from '../Components/BasicDetailsForm';
import SecurityDetailsForm from '../Components/SecurityDetailsForm';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AddressForm from '../Components/AddressForm';
import AddressesForm from '../Components/AddressesForm';


export default function Register() {

    const [formState, SetFormState] = useState(1);

    useEffect(() => {
        console.log(formState)
    }, [formState])

    return (
        <SafeAreaView style={[styles.main_container, styles.container]}>
            <Text style={[styles.title, { marginBottom: 30 }]}>דף הרשמה</Text>

            {
                formState == 1 ?
                    <BasicDetailsForm /> :
                    formState == 2 ?
                        <SecurityDetailsForm /> : formState == 3 ? <AddressesForm /> : null
            }



            <View style={[styles.flexRow,]}>
                <IconButton
                    icon="arrow-right"
                    size={30}
                    onPress={() => formState > 1 ? SetFormState(formState - 1) : null}
                />
                <IconButton
                    icon="arrow-left"
                    size={30}
                    onPress={() => formState < 3 ? SetFormState(formState + 1) : null}
                />
            </View>
        </SafeAreaView>
    )
}