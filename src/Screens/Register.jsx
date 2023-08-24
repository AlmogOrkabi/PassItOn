import { View, Text, SafeAreaView, Alert } from 'react-native'
import React, { useEffect, useReducer, useState } from 'react'
import { styles } from '../Styles';
import { TextInput, Button, IconButton } from 'react-native-paper';
import { uriToBase64, validateNewUserData } from '../utils/index';
import { createNewUser, checkEmailAvailability } from '../api/index'

import BasicDetailsForm from '../Components/BasicDetailsForm';
import SecurityDetailsForm from '../Components/SecurityDetailsForm';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AddressesForm from '../Components/AddressesForm';

import { useForm, Controller } from 'react-hook-form';

const initialState = {
    basicDetails: {
        username: '',
        firstName: '',
        lastName: '',
        image: ''
    },
    securityDetails: {
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
    },
    addresses: {
        location: {},
        addressInput: '',
        notes: '',
        apartment: '',
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



export default function Register({ navigation }) {
    const { control, handleSubmit, trigger, setValue, getValues, setError } = useForm();

    const [formPage, setFormPage] = useState(1);
    const [isEmailTaken, setIsEmailTaken] = useState(false);
    //const [btnState,setBtnState] = useState(false);
    //const [formState, setFormState] = useState(initialState);
    const [formState, dispatch] = useReducer(formReducer, initialState);
    const [addressData, setAddressData] = useState({ location: formState.location, addressInput: formState.addressInput })
    useEffect(() => {
        console.log(formPage)
    }, [formPage])

    const [validErr, setValidErr] = useState(null);

    const handleChange = (form, field, value) => {
        dispatch({ type: 'updateField', form, field, value });
        console.log("HERE", formState.addresses)
    };


    const onSubmit = (async () => {
        try {
            handleChange('addresses', 'location', addressData.location);
            handleChange('addresses', 'addressInput', addressData.addressInput);
            let validationRes = validateNewUserData(formState.basicDetails.username, formState.basicDetails.firstName, formState.basicDetails.lastName, formState.securityDetails.phoneNumber, formState.securityDetails.email, formState.securityDetails.password, formState.securityDetails.confirmPassword)
            if (!validationRes.valid) {
                Alert.alert(validationRes.msg)
                setFormPage((prev) => validationRes.page);
                console.log("fieldName: " + validationRes.fieldName)
                setValidErr(validationRes.fieldName)
                return;
            }
            if (formState.addresses.addressInput === '') {
                setValidErr('addressNull');
                return;
            }
            // if (!formState.isValid) { // If the form is not valid
            //     Alert.alert(
            //         "Error",
            //         "Please fix the errors in the form before submittinsg.",
            //         [
            //             { text: "OK", onPress: () => console.log("OK Pressed") }
            //         ],
            //         { cancelable: false }
            //     );
            // }

            let isEmailAvailable = await checkEmailAvailability(formState.securityDetails.email);


            const newUser = await createNewUser(formState);
            await navigation.navigate('Login')

        } catch (error) {
            console.log("registering error:", error)
            if (error.message == 409) {
                setIsEmailTaken((prev) => true);
                setFormPage((prev) => 2);
            }
            else if (error.message == 'הכתובת אינה תקינה')
                setValidErr('addressNull');

        }

    });


    // useEffect(() => {
    //     console.log("UPDATED")
    // }, [addressData]);

    useEffect(() => {
        console.log("UPDATED")
        handleChange('addresses', 'location', addressData.location);
        handleChange('addresses', 'addressInput', addressData.addressInput);
    }, [addressData]);



    return (
        <SafeAreaView style={[styles.main_container, styles.container]}>
            <Text style={[styles.title, { marginBottom: 30 }]}>דף הרשמה</Text>

            {
                formPage == 1 ?
                    <BasicDetailsForm state={formState.basicDetails} dispatch={dispatch} handleChange={handleChange} validErr={validErr} /> :
                    formPage == 2 ?
                        <SecurityDetailsForm state={formState.securityDetails} dispatch={dispatch} handleChange={handleChange} isEmailTaken={isEmailTaken} setIsEmailTaken={setIsEmailTaken} validErr={validErr} /> : formPage == 3 ? <AddressesForm state={formState.addresses} dispatch={dispatch} handleChange={handleChange} validErr={validErr} addressData={addressData} setAddressData={setAddressData} /> : null

            }
            <View>
                <View style={[styles.flexRow, { marginTop: 20 }]}>
                    <IconButton
                        icon="arrow-right"
                        size={30}
                        onPress={() => formPage > 1 ? setFormPage(formPage - 1) : null}
                        disabled={formPage <= 1 ? true : false}
                    />
                    <IconButton
                        icon="arrow-left"
                        size={30}
                        onPress={() => formPage < 3 ? setFormPage(formPage + 1) : null}
                        disabled={formPage >= 3 ? true : false}
                    />
                </View>
                {formPage == 3 ? <Button style={[styles.btn,]} mode="contained" onPress={onSubmit}  >הרשמה</Button> : null}
            </View>

        </SafeAreaView>
    )
}