import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { styles, paperStyles } from '../Styles';
import { TextInput, Button } from 'react-native-paper';
import { isValidPassword, isValidEmail, isValidPhoneNumber } from '../utils/index.js'

export default function SecurityDetailsForm({ state, dispatch, handleChange, isEmailTaken, setIsEmailTaken, validErr }) {

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [rePasswordVisible, setRePasswordVisible] = useState(false);
    const {
        control,
        watch,
        trigger,
        formState: { errors }
    } = useForm({ mode: 'all' })


    const password = watch('password');

    useEffect(() => {
        if (state.password != '' && state.confirmPassword != '')
            trigger('confirmPassword');
    }, [password])

    useEffect(() => {
        if (validErr)
            trigger(validErr);
    }, [validErr]);



    return (
        <SafeAreaView style={[styles.container]}>

            <View style={[]}>

                <Text style={[styles.form_small_heading]} >אבטחה:</Text>

                <Controller
                    control={control}
                    name="phoneNumber"
                    defaultValue={state.phoneNumber}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            inputMode='tel'
                            style={[styles.input,]}
                            label="מספר טלפון נייד"
                            value={value}
                            onBlur={onBlur}
                            onChangeText={value => { onChange(value); handleChange('securityDetails', 'phoneNumber', value); }}

                            theme={{ colors: { onSurfaceVariant: 'black', placeholder: 'white', primary: '#66686c' } }} />

                    )}

                    rules={{
                        required: {
                            value: true,
                            message: 'שדה חובה'
                        },

                        validate:
                            value => isValidPhoneNumber(value) || 'נא הכנס מספר טלפון נייד תקין'


                    }}
                />
                {errors.phoneNumber && <Text style={[styles.inputError,]} >{errors.phoneNumber.message}</Text>}

                <Controller
                    control={control}
                    name="email"
                    defaultValue={state.email}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            inputMode='email'
                            style={[styles.input,]}
                            label="כתובת דואר אלקטרוני"
                            value={value}
                            onBlur={onBlur}
                            onChangeText={value => { onChange(value); handleChange('securityDetails', 'email', value); isEmailTaken ? setIsEmailTaken(false) : null }}
                            theme={{ colors: { onSurfaceVariant: 'black', placeholder: 'white', primary: '#66686c' } }} />
                    )}


                    rules={{
                        required: {
                            value: true,
                            message: 'שדה חובה'
                        },

                        validate:
                            value => isValidEmail(value) || 'כתובת המייל שהוכנסה אינה תקינה'


                    }}
                />
                {(errors.email && <Text style={[styles.inputError,]} >{errors.email.message}</Text>) || (isEmailTaken && <Text style={[styles.inputError,]}>כתובת המייל אינה פנויה</Text>)}

                <Controller
                    control={control}
                    name="password"
                    defaultValue={state.password}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={[styles.input,]}
                            label="סיסמה"
                            value={value}
                            onBlur={onBlur}
                            watch={'confirmPassword'}
                            secureTextEntry={!passwordVisible}
                            right={<TextInput.Icon icon="eye" size={paperStyles.inputIcon.size} name={passwordVisible ? "eye-off" : "eye"} onPress={() => setPasswordVisible(!passwordVisible)} />}
                            onChangeText={value => { onChange(value); handleChange('securityDetails', 'password', value); }}
                            theme={{ colors: { onSurfaceVariant: 'black', placeholder: 'white', primary: '#66686c' } }} />
                    )}

                    rules={{
                        required: {
                            value: true,
                            message: 'שדה חובה'
                        },

                        validate:
                            value => isValidPassword(value) || '8 - 16 תווים , אות גדולה אחת ומספר אחד לפחות',
                        // validate:
                        //     value => value === state.confirmPassword || 'הסיסמאות אינן זהות'


                    }}
                />
                {errors.password && <Text style={[styles.inputError,]} >{errors.password.message}</Text>}


                <Controller
                    control={control}
                    name="confirmPassword"
                    defaultValue={state.confirmPassword}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput style={[styles.input,]}
                            label="ווידוא סיסמה"
                            secureTextEntry={!rePasswordVisible}
                            right={<TextInput.Icon icon="eye" size={paperStyles.inputIcon.size} name={rePasswordVisible ? "eye-off" : "eye"} onPress={() => setRePasswordVisible(!rePasswordVisible)} />}
                            value={value}
                            watch='password'
                            onBlur={onBlur}
                            onChangeText={value => { onChange(value); handleChange('securityDetails', 'confirmPassword', value); }}
                            theme={{ colors: { onSurfaceVariant: 'black', placeholder: 'white', primary: '#66686c' } }} />
                    )}
                    rules={{
                        required: {
                            value: true,
                            message: 'שדה חובה'
                        },

                        // validate:
                        //     value => isValidPassword(value) || '8 - 16 תווים , אות גדולה אחת ומספר אחד לפחות',
                        //validate:
                        //value => value === state.password || 'הסיסמאות אינן זהות'
                        // value => value === watch('password'.value) || 'הסיסמאות אינן זהות'
                        //value => CheckPasswordsMatch(value) === password || 'הסיסמאות אינן זהות'

                        validate: {
                            validPassword: value => isValidPassword(value) || '8 - 16 תווים , אות גדולה אחת ומספר אחד לפחות',
                            passwordsMatch: value => value === watch('password') || 'הסיסמאות אינן זהות',
                        }
                    }}
                />
                {errors.confirmPassword && <Text style={[styles.inputError,]} >{errors.confirmPassword.message}</Text>}

                {/* <Button style={styles.btn} mode="contained" onPress={handleSubmit(onSubmit)}  > המשך</Button> */}

            </View>
        </SafeAreaView>
    )
}