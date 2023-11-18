import { View, Text, SafeAreaView, ScrollView, Image, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useContext, useReducer } from 'react'
import { Button, TextInput, FAB, IconButton } from 'react-native-paper'
import { useForm, Controller } from 'react-hook-form';
import { editUser, checkEmailAvailability, getUsers } from '../api/index';

import { openMediaLibrary } from '../utils/index'

import { styles, touchableOpacity, theme, paperStyles } from '../Styles'
import { AppContext } from '../Contexts/AppContext'

import { isValidPassword, isValidEmail, isValidName, isValidUserName, isValidPhoneNumber, validateUserData } from '../utils/index'

import AddAddress from '../Components/AddAddress'


const initialState = {
    username: {
        edited: false,
        value: ''
    },
    firstName: {
        edited: false,
        value: ''
    },
    lastName: {
        edited: false,
        value: ''
    },
    phoneNumber: {
        edited: false,
        value: ''
    },
    email: {
        edited: false,
        value: ''
    },
    password: {
        edited: false,
        value: '',
    },
    confirmPassword: {
        value: ''
    },
    profilePicture: {
        edited: false,
        value: ''
    },
    address: {
        edited: false,
    },
}


function formReducer(state, action) {
    switch (action.type) {
        case 'edit':
            return {
                ...state,
                [action.field]: {
                    ...state[action.field],
                    edited: true
                }
            }
        case 'cancel':
            return {
                ...state,
                [action.field]: {
                    ...state[action.field],
                    edited: false,
                    value: ''
                }
            }
        case 'update':
            return {
                ...state,
                [action.field]: {
                    ...state[action.field],
                    value: action.value
                }
            }
        default:
            return state;
    }
}




export default function EditProfile({ navigation }) {

    const { setLoggedUser, loggedUser, serverError, setServerError } = useContext(AppContext)

    const [formState, dispatch] = useReducer(formReducer, initialState);

    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);

    const [pfp, setPfp] = useState(loggedUser.photo && loggedUser.photo.url ? loggedUser.photo.url : null);

    const [address, setAddress] = useState({
        location: null,
        addressInput: '',
        notes: null
    });

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [rePasswordVisible, setRePasswordVisible] = useState(false);
    const [isEmailTaken, setIsEmailTaken] = useState(false);

    const {
        control,
        watch,
        trigger,
        formState: { errors },
        setValue,
        handleSubmit,
    } = useForm({ mode: 'all' })

    const password = watch('password');

    useEffect(() => {
        if (formState.password != '' && formState.confirmPassword != '')
            trigger('confirmPassword');
    }, [password])


    async function handleChangePicture() {
        if (!formState.profilePicture.edited)
            dispatch({ type: 'edit', field: 'profilePicture' })

        const result = await openMediaLibrary();
        if (result) {
            dispatch({ type: 'update', field: 'profilePicture', value: result });
            setPfp(result);
        }

    }

    async function handleChanges() {
        try {
            setLoading(true);

            const newData = {};
            if (formState.username.edited) {
                newData.username = formState.username.value;
            }
            if (formState.firstName.edited) {
                newData.firstName = formState.firstName.value;
            }
            if (formState.lastName.edited) {
                newData.lastName = formState.lastName.value;
            }
            if (formState.phoneNumber.edited) {
                newData.phoneNumber = formState.phoneNumber.value;
            }
            if (formState.email.edited) {
                newData.email = formState.email.value;
            }
            if (formState.password.edited) {
                newData.password = formState.password.value;
            }

            const validationsRes = await validateUserData(newData);
            if (!validationsRes.valid) {
                trigger(validationsRes.field);
                return;
            }

            console.log("email edited?: " + formState.email.edited)
            if (formState.email.edited) {
                checkEmail = await checkEmailAvailability(formState.email.value); //* throws an error if the email is already taken
            }

            if (formState.profilePicture.edited) {
                newData.newPhoto = formState.profilePicture.value;
                newData.photo = loggedUser.photo; //* used to delete the previous picture from the cloud service in the server
                // console.log("pfp: " + newData.newPhoto);
            }

            let result;
            if (formState.address.edited)
                result = await editUser(loggedUser._id, newData, address)
            else
                result = await editUser(loggedUser._id, newData)

            console.log("result =>" + result.acknowledged)
            if (result.acknowledged) {
                if (formState.password.edited || formState.email.edited) //* if verification details are edited relogging required
                    navigation.navigate('Login')
                else {
                    const updatedUser = await getUsers({ _id: loggedUser._id, full: 'true' });
                    setLoggedUser(updatedUser[0]);
                    navigation.navigate('Profile');
                }
            }


        } catch (error) {
            if (error.status == 409) {
                setIsEmailTaken(() => true);
                return;
            }
            console.log("error here: " + error);
            setServerError({ ...error });
        }
        finally {
            setLoading(false);
        }
    }


    return (
        <SafeAreaView style={[styles.main_container2]}>
            <Text style={[styles.mediumTitle]}>עריכת פרטי משתמש:</Text>
            {loading ? <View style={[styles.main_container]}>
                <ActivityIndicator />
            </View> :
                <ScrollView nestedScrollEnabled style={[styles.sub_container2,]} >
                    <View style={[{ alignSelf: 'center' }, styles.profilePictureContainer,]}>
                        <Image source={
                            pfp ? { uri: pfp }
                                : require('../Pictures/DefaultPfp.jpg')
                        } style={[styles.profilePicture,]}
                        />
                        <FAB icon="pencil" style={[styles.style_FAB_picture]} theme={{ colors: { primaryContainer: 'white', onPrimaryContainer: theme.mediumOrange } }} customSize={40} onPress={() => handleChangePicture()} />
                    </View >
                    <View style={[styles.fieldsGap]} >
                        {
                            formState.username.edited ? <View>
                                <View style={[styles.flexRow,]}>
                                    <Controller
                                        control={control}
                                        name='username'
                                        defaultValue={formState.username.value}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextInput
                                                label="שם משתמש"
                                                value={value}
                                                onBlur={onBlur}
                                                onChangeText={value => { onChange(value); dispatch({ type: 'update', field: 'username', value: value }) }}
                                                mode='outlined'
                                                placeholder={loggedUser.username}
                                                style={[styles.textInput]}
                                                outlineStyle={styles.outlinedInputBorder}
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
                                    <IconButton
                                        icon="close-thick"
                                        size={20}
                                        onPress={() => { dispatch({ type: 'cancel', field: 'username' }); setValue('username', '') }}
                                        style={[styles.canceEditlBtn]}
                                        iconColor={theme.background}
                                    />
                                </View>
                                {errors.username && <Text style={[styles.inputError,]} >{errors.username.message}</Text>}
                            </View> :
                                <View style={[styles.flexRow, styles.editformFieldContainer]}>
                                    <IconButton
                                        icon="pencil"
                                        size={20}
                                        onPress={() => dispatch({ type: 'edit', field: 'username' })}
                                    />
                                    <Text style={[styles.editFormText]}>שם משתמש: {loggedUser.username}</Text>

                                </View>
                        }
                        {
                            formState.firstName.edited ? <View>
                                <View style={[styles.flexRow,]}>
                                    <Controller
                                        control={control}
                                        name='firstName'
                                        defaultValue={formState.firstName.value}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextInput
                                                label="שם פרטי"
                                                value={value}
                                                onBlur={onBlur}
                                                onChangeText={value => { onChange(value); dispatch({ type: 'update', field: 'firstName', value: value }) }}
                                                mode='outlined'
                                                placeholder={loggedUser.firstName}
                                                style={[styles.textInput]}
                                                outlineStyle={styles.outlinedInputBorder}
                                            />
                                        )}
                                        rules={{
                                            required: {
                                                value: true,
                                                message: 'שדה חובה'
                                            },
                                            validate:
                                                value => isValidName(value) || 'שם פרטי אינו תקין'
                                        }}
                                    />
                                    <IconButton
                                        icon="close-thick"
                                        size={20}
                                        onPress={() => { dispatch({ type: 'cancel', field: 'firstName' }); setValue('firstName', '') }}
                                        style={[styles.canceEditlBtn]}
                                        iconColor={theme.background}
                                    />
                                </View>
                                {errors.firstName && <Text style={[styles.inputError,]} >{errors.firstName.message}</Text>}
                            </View> :
                                <View style={[styles.flexRow, styles.editformFieldContainer]}>
                                    <IconButton
                                        icon="pencil"
                                        size={20}
                                        onPress={() => dispatch({ type: 'edit', field: 'firstName' })}
                                    />
                                    <Text style={[styles.editFormText]}>שם פרטי: {loggedUser.firstName}</Text>

                                </View>
                        }
                        {
                            formState.lastName.edited ? <View>
                                <View style={[styles.flexRow,]}>
                                    <Controller
                                        control={control}
                                        name='lastName'
                                        defaultValue={formState.lastName.value}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextInput
                                                label="שם משפחה"
                                                value={value}
                                                onBlur={onBlur}
                                                onChangeText={text => { onChange(value); dispatch({ type: 'update', field: 'lastName', value: text }) }}
                                                mode='outlined'
                                                placeholder={loggedUser.lastName}
                                                style={[styles.textInput]}
                                                outlineStyle={styles.outlinedInputBorder}
                                            />
                                        )}
                                        rules={{
                                            required: {
                                                value: true,
                                                message: 'שדה חובה'
                                            },
                                            validate:
                                                value => isValidName(value) || 'שם המשפחה אינו תקין'
                                        }}
                                    />
                                    <IconButton
                                        icon="close-thick"
                                        size={20}
                                        onPress={() => { dispatch({ type: 'cancel', field: 'lastName' }); setValue('lastName', '') }}
                                        style={[styles.canceEditlBtn]}
                                        iconColor={theme.background}
                                    />
                                </View>
                                {errors.lastName && <Text style={[styles.inputError,]} >{errors.lastName.message}</Text>}
                            </View> :
                                <View style={[styles.flexRow, styles.editformFieldContainer]}>
                                    <IconButton
                                        icon="pencil"
                                        size={20}
                                        onPress={() => dispatch({ type: 'edit', field: 'lastName' })}
                                    />
                                    <Text style={[styles.editFormText]}>שם משפחה: {loggedUser.lastName}</Text>

                                </View>
                        }
                        {
                            formState.phoneNumber.edited ? <View>
                                <View style={[styles.flexRow,]}>
                                    <Controller
                                        control={control}
                                        name='phoneNumber'
                                        defaultValue={formState.phoneNumber.value}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextInput
                                                inputMode='tel'
                                                label="מספר טלפון נייד"
                                                value={value}
                                                onBlur={onBlur}
                                                onChangeText={value => { onChange(value); dispatch({ type: 'update', field: 'phoneNumber', value: value }) }}
                                                mode='outlined'
                                                placeholder={loggedUser.phoneNumber}
                                                style={[styles.textInput]}
                                                outlineStyle={styles.outlinedInputBorder}
                                            />
                                        )}
                                        rules={{
                                            required: {
                                                value: true,
                                                message: 'שדה חובה'
                                            },
                                            validate:
                                                value => isValidPhoneNumber(value) || 'מספר הטלפון שהוכנס אינו תקין'
                                        }}
                                    />
                                    <IconButton
                                        icon="close-thick"
                                        size={20}
                                        onPress={() => { dispatch({ type: 'cancel', field: 'phoneNumber' }); setValue('phoneNumber', '') }}
                                        style={[styles.canceEditlBtn]}
                                        iconColor={theme.background}
                                    />
                                </View>
                                {errors.phoneNumber && <Text style={[styles.inputError,]} >{errors.phoneNumber.message}</Text>}
                            </View> :
                                <View style={[styles.flexRow, styles.editformFieldContainer]}>
                                    <IconButton
                                        icon="pencil"
                                        size={20}
                                        onPress={() => dispatch({ type: 'edit', field: 'phoneNumber' })}
                                    />
                                    <Text style={[styles.editFormText]}>מספר טלפון נייד: {loggedUser.phoneNumber}</Text>

                                </View>
                        }
                        {
                            formState.email.edited ? <View>
                                <View style={[styles.flexRow,]}>
                                    <Controller
                                        control={control}
                                        name='email'
                                        defaultValue={formState.email.value}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextInput
                                                inputMode='email'
                                                label="כתובת מייל"
                                                value={value}
                                                onBlur={onBlur}
                                                onChangeText={value => { onChange(value); dispatch({ type: 'update', field: 'email', value: value }); isEmailTaken ? setIsEmailTaken(false) : null }}
                                                mode='outlined'
                                                placeholder={loggedUser.email}
                                                style={[styles.textInput]}
                                                outlineStyle={styles.outlinedInputBorder}
                                            />
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
                                    <IconButton
                                        icon="close-thick"
                                        size={20}
                                        onPress={() => { dispatch({ type: 'cancel', field: 'email' }); setValue('email', '') }}
                                        style={[styles.canceEditlBtn]}
                                        iconColor={theme.background}
                                    />
                                </View>
                                {errors.email && <Text style={[styles.inputError,]} >{errors.email.message}</Text>
                                    || isEmailTaken && <Text style={[styles.inputError,]}>כתובת המייל אינה פנויה</Text>}
                            </View> :
                                <View style={[styles.flexRow, styles.editformFieldContainer]}>
                                    <IconButton
                                        icon="pencil"
                                        size={20}
                                        onPress={() => dispatch({ type: 'edit', field: 'email' })}
                                    />
                                    <Text style={[styles.editFormText]}>כתובת מייל: {loggedUser.email}</Text>

                                </View>
                        }
                        {
                            formState.password.edited ? <View >
                                <View style={[styles.flexRow,]}>
                                    <Controller
                                        control={control}
                                        name="password"
                                        defaultValue={formState.password.value}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextInput
                                                label="סיסמה"
                                                value={value}
                                                onBlur={onBlur}
                                                onChangeText={value => { onChange(value); dispatch({ type: 'update', field: 'password', value: value }) }}
                                                mode='outlined'
                                                style={[styles.textInput]}
                                                secureTextEntry={!passwordVisible}
                                                outlineStyle={styles.outlinedInputBorder}
                                                right={<TextInput.Icon icon="eye" size={paperStyles.inputIcon.size} name={passwordVisible ? "eye-off" : "eye"} onPress={() => setPasswordVisible(!passwordVisible)} />}
                                            />
                                        )}

                                        rules={{
                                            required: {
                                                value: true,
                                                message: 'שדה חובה'
                                            },

                                            validate: {
                                                validPassword: value => isValidPassword(value) || '8 - 16 תווים , אות גדולה אחת ומספר אחד לפחות',
                                                // passwordsMatch: value => value === watch('confirmPassword') || 'הסיסמאות אינן זהות',

                                            }

                                        }}
                                    />
                                    <IconButton
                                        icon="close-thick"
                                        size={20}
                                        onPress={() => {
                                            dispatch({ type: 'cancel', field: 'password' }); setValue('password', ''); setValue('confirmPassword', '');
                                        }}
                                        style={[styles.canceEditlBtn]}
                                        iconColor={theme.background}
                                    />
                                </View>
                                {errors.password && <Text style={[styles.inputError,]} >{errors.password.message}</Text>}
                                <Controller
                                    control={control}
                                    name="confirmPassword"
                                    defaultValue={formState.confirmPassword.value}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            label="ווידוא סיסמה"
                                            value={value}
                                            onBlur={onBlur}
                                            onChangeText={value => { onChange(value); dispatch({ type: 'update', field: 'confirmPassword', value: value }) }}
                                            mode='outlined'
                                            style={[styles.textInput]}
                                            outlineStyle={styles.outlinedInputBorder}
                                            secureTextEntry={!rePasswordVisible}
                                            right={<TextInput.Icon icon="eye" size={paperStyles.inputIcon.size} name={rePasswordVisible ? "eye-off" : "eye"} onPress={() => setRePasswordVisible(!rePasswordVisible)} />}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'שדה חובה'
                                        },

                                        validate: {
                                            validPassword: value => isValidPassword(value) || '8 - 16 תווים , אות גדולה אחת ומספר אחד לפחות',
                                            passwordsMatch: value => value === watch('password') || 'הסיסמאות אינן זהות',
                                        }
                                    }}
                                />
                                {errors.confirmPassword && <Text style={[styles.inputError,]} >{errors.confirmPassword.message}</Text>}
                            </View> :
                                <View style={[styles.flexRow, styles.editformFieldContainer]}>
                                    <IconButton
                                        icon="pencil"
                                        size={20}
                                        onPress={() => dispatch({ type: 'edit', field: 'password' })}
                                    />
                                    <Text style={[styles.editFormText]}>שינוי סיסמה</Text>

                                </View>
                        }
                        {
                            formState.address.edited ? <View>
                                <AddAddress address={address} handleChange={setAddress} />
                                <View style={[styles.flexRow]}>
                                    <TextInput
                                        label="הערות לכתובת"
                                        value={address.notes}
                                        onChangeText={text => setAddress((prev) => ({ ...prev, notes: text }))}
                                        mode='outlined'
                                        placeholder={loggedUser.address.notes}
                                        style={[styles.textInput]}
                                        outlineStyle={styles.outlinedInputBorder}
                                        multiline={true}
                                    />
                                    <IconButton
                                        icon="close-thick"
                                        size={20}
                                        onPress={() => dispatch({ type: 'cancel', field: 'address' })}
                                        style={[styles.canceEditlBtn]}
                                        iconColor={theme.background}
                                    />
                                </View>
                            </View> :
                                <View style={[styles.flexRow, styles.editformFieldContainer]}>
                                    <IconButton
                                        icon="pencil"
                                        size={20}
                                        onPress={() => dispatch({ type: 'edit', field: 'address' })}
                                    />
                                    <Text style={[styles.editFormText]}>כתובת: {loggedUser.address.simplifiedAddress}</Text>

                                </View>
                        }
                    </View>
                    <Button mode='contained' style={[styles.nppostButton, styles.smallBtn, { alignSelf: 'center' }]} onPress={() => handleChanges(handleSubmit)}>שמור שינויים</Button>
                </ScrollView>}
        </SafeAreaView>
    )
}