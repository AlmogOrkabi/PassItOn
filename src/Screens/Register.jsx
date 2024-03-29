import { View, Text, SafeAreaView, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useReducer, useState, useContext } from 'react'
import { styles, theme } from '../Styles';
import { TextInput, Button, IconButton } from 'react-native-paper';
import { uriToBase64, validateNewUserData } from '../utils/index';
import { createNewUser, checkEmailAvailability } from '../api/index';
import { AppContext } from '../Contexts/AppContext';

import BasicDetailsForm from '../Components/BasicDetailsForm';
import SecurityDetailsForm from '../Components/SecurityDetailsForm';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AddressesForm from '../Components/AddressesForm';

import { useForm, Controller } from 'react-hook-form';

import Logo from '../Components/Logo';


//~ for each section of the form:
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
    const { serverError, setServerError } = useContext(AppContext);
    const [loading, setLoading] = useState(false);

    const [formPage, setFormPage] = useState(1);
    const [isEmailTaken, setIsEmailTaken] = useState(false);
    const [formState, dispatch] = useReducer(formReducer, initialState);
    const [addressData, setAddressData] = useState({ location: formState.location, addressInput: formState.addressInput })

    useEffect(() => {
        console.log(formPage)
    }, [formPage])

    const [validErr, setValidErr] = useState(null);

    const handleChange = (form, field, value) => {
        dispatch({ type: 'updateField', form, field, value });
    };


    const onSubmit = (async () => {
        try {
            // -indicates to the user that the registration is in process:
            setLoading(true);
            setValidErr(null); //*resets the errors
            // -updating the final address the user provided:
            handleChange('addresses', 'location', addressData.location);
            handleChange('addresses', 'addressInput', addressData.addressInput);

            // -validates the inputs from the user are valid according to certain ruless
            let validationRes = validateNewUserData(formState.basicDetails.username, formState.basicDetails.firstName, formState.basicDetails.lastName, formState.securityDetails.phoneNumber, formState.securityDetails.email, formState.securityDetails.password, formState.securityDetails.confirmPassword)

            // -handles validation failure:
            if (!validationRes.valid) {
                Alert.alert(validationRes.msg)
                setFormPage((prev) => validationRes.page);
                // console.log("fieldName: " + validationRes.fieldName)
                setValidErr(validationRes.fieldName)
                return;
            }
            // -handles no address from the user:
            if (!formState.addresses.addressInput) {
                setValidErr('addressNull');
                return;
            }

            // -a check that the email is not already being used by another user (throws an error if it is taken):
            let isEmailAvailable = await checkEmailAvailability(formState.securityDetails.email);

            // -calling the method that formats the data according to the schema and from there to the method that sends it to the server:
            const newUser = await createNewUser(formState);

            // -if the registration is successful, navigates the user to the login page
            await navigation.navigate('Login')
        } catch (error) {
            console.log("registering error:", error) // *for debugging

            // -email is not available error: 
            if (error.status == 409) {
                setIsEmailTaken((prev) => true); // *for ui purposes
                setFormPage((prev) => 2); // * navigates to the correct component of the registration form
            }
            // -address is not valid error:
            else if (error.message == 'הכתובת אינה תקינה')
                setValidErr('addressNull'); // *for the ui
            else
                setServerError({ ...error });
        }
        finally {
            // -no matter the outcome, the loading has finished.
            setLoading(false);
        }

    });



    useEffect(() => {
        // console.log("UPDATED")
        handleChange('addresses', 'location', addressData.location);
        handleChange('addresses', 'addressInput', addressData.addressInput);
    }, [addressData]);



    return (
        <SafeAreaView style={[styles.main_container2, { justifyContent: 'space-between' }]}>
            <Text style={[styles.mediumTitle, styles.marginHorizontal, { marginTop: 30, alignSelf: 'center' }]}>הרשמה</Text>
            <View style={[styles.containerCenter, { backgroundColor: '#f5f4f4c4', width: '100%', height: 350, alignSelf: 'center', borderRadius: 15, }]}>

                {loading ? <ActivityIndicator size="large" /> :

                    formPage == 1 ?
                        <BasicDetailsForm state={formState.basicDetails} dispatch={dispatch} handleChange={handleChange} validErr={validErr} /> :
                        formPage == 2 ?
                            <SecurityDetailsForm state={formState.securityDetails} dispatch={dispatch} handleChange={handleChange} isEmailTaken={isEmailTaken} setIsEmailTaken={setIsEmailTaken} validErr={validErr} /> : formPage == 3 ? <AddressesForm state={formState.addresses} dispatch={dispatch} handleChange={handleChange} validErr={validErr} addressData={addressData} setAddressData={setAddressData} /> : null

                }

            </View>
            < View style={[styles.containerCenter, { flex: 0.1 }]}>
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

            </View>
            <View style={[styles.smallBtn, { flex: 0.2, alignSelf: 'center' }]}>
                {formPage == 3 ? <Button style={[styles.btn,]} mode="contained" onPress={onSubmit}  >הרשמה</Button> : null}
            </View>
        </SafeAreaView >
    )
}