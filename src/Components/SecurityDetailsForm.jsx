import { View, Text, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { styles } from '../Styles';
import { TextInput, Button } from 'react-native-paper';

export default function SecurityDetailsForm({ state, dispatch, handleChange }) {

    const { control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        // Handle form submission
        console.log(data);
    };


    return (
        <SafeAreaView style={[styles.container]}>

            <View style={[]}>

                <Text style={[styles.form_small_heading]} >אבטחה:</Text>

                <Controller
                    control={control}
                    name="phoneNumber"
                    rules={{ required: 'שדה חובה' }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={[styles.input,]}
                            label="מספר טלפון נייד" value={state.phoneNumber}
                            onChangeText={value => { onChange(value); handleChange('securityDetails', 'phoneNumber', value); }}

                            theme={{ colors: { onSurfaceVariant: 'black', placeholder: 'white', primary: '#66686c' } }} />
                    )}
                />
                {errors.email && <Text style={[styles.inputError,]} >{errors.email.message}</Text>}


                <Controller
                    control={control}
                    name="email"
                    rules={{ required: 'שדה חובה' }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={[styles.input,]}
                            label="כתובת דואר אלקטרוני"
                            value={state.email}
                            onChangeText={value => { onChange(value); handleChange('securityDetails', 'email', value); }}
                            theme={{ colors: { onSurfaceVariant: 'black', placeholder: 'white', primary: '#66686c' } }} />
                    )}
                />
                {errors.email && <Text style={[styles.inputError,]} >{errors.email.message}</Text>}

                <Controller
                    control={control}
                    name="password"
                    rules={{ required: 'שדה חובה' }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={[styles.input,]}
                            label="סיסמה" value={state.password}
                            onChangeText={value => { onChange(value); handleChange('securityDetails', 'password', value); }}
                            theme={{ colors: { onSurfaceVariant: 'black', placeholder: 'white', primary: '#66686c' } }} />
                    )}
                />
                {errors.password && <Text style={[styles.inputError,]} >{errors.password.message}</Text>}


                <Controller
                    control={control}
                    name="confirmPassword"
                    rules={{ required: 'שדה חובה' }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput style={[styles.input,]}
                            label="ווידוא סיסמה"
                            value={state.confirmPassword}
                            onChangeText={value => { onChange(value); handleChange('securityDetails', 'confirmPassword', value); }}
                            theme={{ colors: { onSurfaceVariant: 'black', placeholder: 'white', primary: '#66686c' } }} />
                    )}
                />
                {errors.confirmPassword && <Text style={[styles.inputError,]} >{errors.confirmPassword.message}</Text>}

                {/* <Button style={styles.btn} mode="contained" onPress={handleSubmit(onSubmit)}  > המשך</Button> */}

            </View>
        </SafeAreaView>
    )
}