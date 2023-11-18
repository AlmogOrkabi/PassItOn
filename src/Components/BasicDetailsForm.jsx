import { View, Text, SafeAreaView, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { styles, theme } from '../Styles';
import { TextInput, Button, IconButton } from 'react-native-paper';

//import * as ImagePicker from 'expo-image-picker';
//***expo-image-picker does not automatically ask for permissions


import { isValidUserName, isValidName } from '../utils/index'
import { openMediaLibrary } from '../utils/index';

import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function BasicDetailsForm({ state, dispatch, handleChange, validErr }) {

    const [image, setImage] = useState(null);


    const {
        control,
        handleSubmit,
        trigger,
        formState: { errors, isValid, }
    } = useForm({ mode: 'all' })


    const pickImage = async () => {
        const result = await openMediaLibrary()

        if (result) {
            setImage(() => result);
            handleChange('basicDetails', 'image', result);
        }
    };


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
                            theme={{ colors: { onSurfaceVariant: 'black', placeholder: 'white', primary: '#66686c' } }}
                            outlineStyle={styles.outlinedInputBorder}
                            mode='outlined'
                        />
                    )}
                    rules={{
                        required: {
                            value: true,
                            message: 'שדה חובה'
                        },
                        validate:
                            value => isValidUserName(value) || 'שם המשתמש אינו תקין'
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
                            onBlur={onBlur}
                            onChangeText={value => { onChange(value); handleChange('basicDetails', 'firstName', value); }}
                            theme={{ colors: { onSurfaceVariant: 'black', placeholder: 'white', primary: '#66686c' } }}
                            outlineStyle={styles.outlinedInputBorder}
                            mode='outlined'
                        />
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
                            onBlur={onBlur}
                            onChangeText={value => { onChange(value); handleChange('basicDetails', 'lastName', value); }}
                            theme={{ colors: { onSurfaceVariant: 'black', placeholder: 'white', primary: '#66686c' } }}
                            outlineStyle={styles.outlinedInputBorder}
                            mode='outlined'
                        />
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

                <Pressable style={[styles.flexRow, { columnGap: 15, marginTop: '5%' }]} onPress={pickImage}>
                    {
                        image ?
                            <Image source={{ uri: state.image }} style={{ width: 60, height: 60, borderRadius: 50 }} />
                            :
                            <MaterialCommunityIcons name="account-plus-outline" size={25} color='gray' style={[{ borderWidth: 1, borderRadius: 50, padding: '3%', borderColor: 'gray' }]} />
                    }
                    <Text>תמונת פרופיל</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}