import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect, useReducer, useState } from 'react'
import { styles } from '../Styles';
import { TextInput, Button, IconButton } from 'react-native-paper';
import BasicDetailsForm from '../Components/BasicDetailsForm';
import SecurityDetailsForm from '../Components/SecurityDetailsForm';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AddressesForm from '../Components/AddressesForm';



const initialState = {
    basicDetails: {
        userName: '',
        firstName: '',
        lastName: '',
        image: ''
    },
    securityDetails: {
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
        //phone number
    },
    addresses: {
        location: {},
        addressInput: ''
    }
}

function formReducer(state, action) {
    switch (action.type) {
        case 'updateField':
            return {
                ...state,
                [action.form]: {
                    ...state[action.form],
                    [action.field]: action.value
                }
            }
        default:
            throw new Error();
    }
}


export default function Register() {

    const [formPage, setFormPage] = useState(1);
    //const [formState, setFormState] = useState(initialState);
    const [formState, dispatch] = useReducer(formReducer, initialState);

    useEffect(() => {
        console.log(formPage)
    }, [formPage])


    const handleChange = (form, field, value) => {
        dispatch({ type: 'updateField', form, field, value });
    };

    return (
        <SafeAreaView style={[styles.main_container, styles.container]}>
            <Text style={[styles.title, { marginBottom: 30 }]}>דף הרשמה</Text>

            {
                formPage == 1 ?
                    <BasicDetailsForm state={formState.basicDetails} dispatch={dispatch} handleChange={handleChange} /> :
                    formPage == 2 ?
                        <SecurityDetailsForm state={formState.securityDetails} dispatch={dispatch} handleChange={handleChange} /> : formPage == 3 ? <AddressesForm state={formState.addresses} dispatch={dispatch} handleChange={handleChange} /> : null

            }

            <View style={[styles.flexRow,]}>
                <IconButton
                    icon="arrow-right"
                    size={30}
                    onPress={() => formPage > 1 ? setFormPage(formPage - 1) : null}
                />
                <IconButton
                    icon="arrow-left"
                    size={30}
                    onPress={() => formPage < 3 ? setFormPage(formPage + 1) : null}
                />
            </View>
        </SafeAreaView>
    )
}