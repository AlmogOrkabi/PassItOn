import { View, Text, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { styles } from '../Styles';
import { TextInput, Button } from 'react-native-paper';
import BasicDetailsForm from '../Components/BasicDetailsForm';
import SecurityDetailsForm from '../Components/SecurityDetailsForm';

export default function Register() {

    const [formState, SetFormState] = useState(1);


    return (
        <SafeAreaView style={[styles.main_container, styles.container]}>
            {
                formState == 1 ?
                    <BasicDetailsForm /> :
                    formState == 2 ?
                        <SecurityDetailsForm /> : null
            }


            <Button style={styles.btn} mode="contained" onPress={() => SetFormState(formState + 1)}  > המשך</Button>
        </SafeAreaView>
    )
}