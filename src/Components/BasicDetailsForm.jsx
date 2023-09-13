import { View, Text, SafeAreaView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { styles } from '../Styles';
import { TextInput, Button, IconButton } from 'react-native-paper';

import * as ImagePicker from 'expo-image-picker';
//***expo-image-picker does not automatically ask for permissions


// import { isValidPassword, isValidUserName, isValidName } from '../utils/validations'
import { isValidPassword, isValidUserName, isValidName } from '../utils/index'


import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PrivateValueStore } from '@react-navigation/native';


export default function BasicDetailsForm({ state, dispatch, handleChange, validErr }) {

    const [image, setImage] = useState(null);


    const {
        control,
        handleSubmit,
        trigger,
        formState: { errors, isValid, }
    } = useForm({ mode: 'all' })


    //for media on the device
    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        console.log(status)
        if (status !== 'granted') {
            alert('הרשאה נדחתה');
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.uri);
            handleChange('basicDetails', 'image', result.uri);
        }
    };


    //for camera
    // const pickImage = async () => {
    //     try {
    //         const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //         if (result.status !== 'granted') {
    //             alert('הרשאה נדחתה');
    //             return;
    //         }
    //         let captureResult = await ImagePicker.launchCameraAsync();

    //         if (!captureResult.canceled) {
    //             setImage(captureResult.uri);
    //         }
    //         return captureResult;
    //     } catch (error) {
    //         console.log('Error in pickImage:', error);
    //     }
    // }

    useEffect(() => {
        if (validErr)
            trigger(validErr);
    }, [validErr]);


    return (
        <SafeAreaView style={[styles.container]}>

            <View style={[]}>

                <Text style={[styles.form_small_heading]} >פרטים אישיים:</Text>
                <Controller
                    control={control}
                    name="username"
                    defaultValue={state.username}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={[styles.input,]}
                            label="שם משתמש"
                            value={value}
                            onBlur={onBlur}
                            onChangeText={value => { onChange(value); handleChange('basicDetails', 'username', value); }}
                            theme={{ colors: { onSurfaceVariant: 'black', placeholder: 'white', primary: '#66686c' } }} />
                    )}

                    rules={{
                        required: {
                            value: true,
                            message: 'שדה חובה'
                        },

                        validate:
                            value => isValidUserName(value) || 'שם המשתמש אינו תקין'
                        // ,
                        // validate: value => value.lengt < 5 || 'TEST'


                    }}
                />
                {errors.username && <Text style={[styles.inputError,]} >{errors.username.message}</Text>}

                <Controller
                    control={control}
                    name="firstName"
                    defaultValue={state.firstName}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={[styles.input,]}
                            label="שם פרטי"
                            value={value}
                            //onChangeText={onChange}
                            onBlur={onBlur}
                            onChangeText={value => { onChange(value); handleChange('basicDetails', 'firstName', value); }}
                            theme={{ colors: { onSurfaceVariant: 'black', placeholder: 'white', primary: '#66686c' } }} />
                    )}
                    rules={{
                        required: {
                            value: true,
                            message: 'שדה חובה'
                        },

                        validate:
                            value => isValidName(value) || 'שם אינו תקין'


                    }}
                />
                {errors.firstName && <Text style={[styles.inputError,]} >{errors.firstName.message}</Text>}


                <Controller
                    control={control}
                    name="lastName"
                    defaultValue={state.lastName}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={[styles.input,]}
                            label="שם משפחה"
                            value={value}
                            //onChangeText={onChange}
                            onBlur={onBlur}
                            onChangeText={value => { onChange(value); handleChange('basicDetails', 'lastName', value); }}
                            theme={{ colors: { onSurfaceVariant: 'black', placeholder: 'white', primary: '#66686c' } }} />
                    )}

                    rules={{
                        required: {
                            value: true,
                            message: 'שדה חובה'
                        },

                        validate:
                            value => isValidName(value) || 'שם אינו תקין'


                    }}
                />
                {errors.lastName && <Text style={[styles.inputError,]} >{errors.lastName.message}</Text>}

                <Button style={styles.smallTextButton} textColor='black' icon={"file-image-plus-outline"} onPress={pickImage}  > תמונת פרופיל</Button>

                {/* <IconButton
                    icon="file-image-plus-outline"
                    size={20}
                    onPress={pickImage}
                /> */}
                {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
                {state.image && <Image source={{ uri: state.image }} style={{ width: 200, height: 200 }} />}





            </View>
        </SafeAreaView>
    )
}