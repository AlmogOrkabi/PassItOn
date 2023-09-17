// import React, { useContext, useState } from 'react';
// import { View, Text, TextInput, Button, Image, TouchableOpacity } from 'react-native';
// import { AppContext } from '../Contexts/AppContext';
// import { styles, theme } from '../Styles';

// export default function EditProfile({ navigation }) {


//     const { loggedUser, userToken } = useContext(AppContext);
//     const [firstName, setFirstName] = useState(loggedUser.firstName);
//     const [lastName, setLastName] = useState(loggedUser.lastName);
//     const [email, setEmail] = useState(loggedUser.email);
//     const [phoneNumber, setPhoneNumber] = useState(loggedUser.phoneNumber);
//     const [simplifiedAddress, setSimplifiedAddress] = useState(
//         loggedUser.address.simplifiedAddress || ''
//     );
//     const [profilePicture, setProfilePicture] = useState(
//         loggedUser.photo && loggedUser.photo.url
//             ? { uri: loggedUser.photo.url }
//             : require('../Pictures/DefaultPfp.jpg')
//     );



//     const handleUpdateProfile = () => {

//         navigation.goBack();
//     };

//     const handleEditProfilePicture = () => {

//     };

//     return (
//         <View style={styles.main_container2}>

//             <Text style={styles.title}>עריכת פרופיל</Text>
//             <TouchableOpacity onPress={handleEditProfilePicture}>
//                 <Image
//                     source={profilePicture}
//                     style={styles.profilePicture}
//                 />
//             </TouchableOpacity>
//             <TextInput
//                 placeholder="שם פרטי"
//                 value={firstName}
//                 onChangeText={setFirstName}
//                 style={styles.input}
//             />
//             <TextInput
//                 placeholder="שם משפחה"
//                 value={lastName}
//                 onChangeText={setLastName}
//                 style={styles.input}
//             />
//             <TextInput
//                 placeholder="אימייל"
//                 value={email}
//                 onChangeText={setEmail}
//                 style={styles.input}
//             />
//             <TextInput
//                 placeholder="מספר טלפון"
//                 value={phoneNumber}
//                 onChangeText={setPhoneNumber}
//                 style={styles.input}
//             />
//             <TextInput
//                 placeholder="כתובת"
//                 value={simplifiedAddress}
//                 onChangeText={setSimplifiedAddress}
//                 style={styles.input}
//             />
//             <Button title="שמור" onPress={handleUpdateProfile} style={styles.btn} />
//         </View>
//     );
// }



import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import React, { useState, useEffect, useContext, useReducer } from 'react'
import { Button, TextInput, FAB, IconButton } from 'react-native-paper'

import { openMediaLibrary } from '../utils/index'

import { styles, touchableOpacity, theme } from '../Styles'
import { AppContext } from '../Contexts/AppContext'

import Logo from '../Components/Logo'
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
                    edited: false
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




export default function EditProfile() {

    const { loggedUser, userToken } = useContext(AppContext)

    const [formState, dispatch] = useReducer(formReducer, initialState);

    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);

    const [pfp, setPfp] = useState(loggedUser.photo && loggedUser.photo.url ? loggedUser.photo.url : require('../Pictures/DefaultPfp.jpg'));

    const [address, setAddress] = useState({
        location: null,
        addressInput: '',
        notes: null
    });

    async function handleChangePicture() {
        if (!formState.profilePicture.edited)
            dispatch({ type: 'edit', field: 'profilePicture' })

        const result = await openMediaLibrary();
        if (result) {
            dispatch({ type: 'update', field: 'profilePicture', value: result });
            setPfp(result);
        }

    }


    return (
        <SafeAreaView style={[styles.main_container2]}>
            <Logo width={200} height={80} />
            <Text style={[styles.mediumTitle]}>עריכת פרטי משתמש:</Text>
            <ScrollView nestedScrollEnabled style={[styles.sub_container2,]} >
                <View style={[{ alignSelf: 'center' }, styles.profilePictureContainer]}>
                    <Image source={{ uri: pfp }} style={[styles.profilePicture,]}
                    />
                    {/* <FAB icon="pencil" style={[styles.style_FAB_picture]} theme={{ colors: { primaryContainer: theme.mediumOrange, onPrimaryContainer: 'white' } }} onPress={() => handleChangePicture()} /> */}
                    <FAB icon="pencil" style={[styles.style_FAB_picture]} theme={{ colors: { primaryContainer: 'white', onPrimaryContainer: theme.mediumOrange } }} onPress={() => handleChangePicture()} />
                </View >
                <View style={[styles.fieldsGap]} >
                    {
                        formState.username.edited ? <View style={[styles.flexRow,]}>
                            <TextInput
                                label="שם משתמש"
                                value={formState.username.value}
                                onChangeText={text => dispatch({ type: 'update', field: 'username', value: text })}
                                mode='outlined'
                                placeholder={loggedUser.username}
                                style={[styles.textInput]}
                                //theme={{ roundness: 50, activeOutlineColor: 'white' }}
                                //activeOutlineColor='red'
                                outlineStyle={styles.outlinedInputBorder}
                            />
                            <IconButton
                                icon="close-thick"
                                size={20}
                                onPress={() => dispatch({ type: 'cancel', field: 'username' })}
                                style={[styles.canceEditlBtn]}
                            />
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
                        formState.firstName.edited ? <View style={[styles.flexRow,]}>
                            <TextInput
                                label="שם פרטי"
                                value={formState.firstName.value}
                                onChangeText={text => dispatch({ type: 'update', field: 'firstName', value: text })}
                                mode='outlined'
                                placeholder={loggedUser.firstName}
                                style={[styles.textInput]}
                                //theme={{ roundness: 50, activeOutlineColor: 'white' }}
                                //activeOutlineColor='red'
                                outlineStyle={styles.outlinedInputBorder}
                            />
                            <IconButton
                                icon="close-thick"
                                size={20}
                                onPress={() => dispatch({ type: 'cancel', field: 'firstName' })}
                                style={[styles.canceEditlBtn]}
                            />
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
                        formState.lastName.edited ? <View style={[styles.flexRow,]}>
                            <TextInput
                                label="שם משפחה"
                                value={formState.lastName.value}
                                onChangeText={text => dispatch({ type: 'update', field: 'lastName', value: text })}
                                mode='outlined'
                                placeholder={loggedUser.lastName}
                                style={[styles.textInput]}
                                //theme={{ roundness: 50, activeOutlineColor: 'white' }}
                                //activeOutlineColor='red'
                                outlineStyle={styles.outlinedInputBorder}
                            />
                            <IconButton
                                icon="close-thick"
                                size={20}
                                onPress={() => dispatch({ type: 'cancel', field: 'lastName' })}
                                style={[styles.canceEditlBtn]}
                            />
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
                        formState.phoneNumber.edited ? <View style={[styles.flexRow,]}>
                            <TextInput
                                label="מספר טלפון נייד"
                                value={formState.lastName.value}
                                onChangeText={text => dispatch({ type: 'update', field: 'phoneNumber', value: text })}
                                mode='outlined'
                                placeholder={loggedUser.phoneNumber}
                                style={[styles.textInput]}
                                //theme={{ roundness: 50, activeOutlineColor: 'white' }}
                                //activeOutlineColor='red'
                                outlineStyle={styles.outlinedInputBorder}
                            />
                            <IconButton
                                icon="close-thick"
                                size={20}
                                onPress={() => dispatch({ type: 'cancel', field: 'phoneNumber' })}
                                style={[styles.canceEditlBtn]}
                            />
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
                        formState.email.edited ? <View style={[styles.flexRow,]}>
                            <TextInput
                                label="כתובת מייל"
                                value={formState.lastName.value}
                                onChangeText={text => dispatch({ type: 'update', field: 'email', value: text })}
                                mode='outlined'
                                placeholder={loggedUser.email}
                                style={[styles.textInput]}
                                //theme={{ roundness: 50, activeOutlineColor: 'white' }}
                                //activeOutlineColor='red'
                                outlineStyle={styles.outlinedInputBorder}
                            />
                            <IconButton
                                icon="close-thick"
                                size={20}
                                onPress={() => dispatch({ type: 'cancel', field: 'email' })}
                                style={[styles.canceEditlBtn]}
                            />
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
                                <TextInput
                                    label="סיסמה"
                                    value={formState.password.value}
                                    onChangeText={text => dispatch({ type: 'update', field: 'password', value: text })}
                                    mode='outlined'
                                    //placeholder={}
                                    style={[styles.textInput]}
                                    //theme={{ roundness: 50, activeOutlineColor: 'white' }}
                                    //activeOutlineColor='red'
                                    outlineStyle={styles.outlinedInputBorder}
                                />
                                <IconButton
                                    icon="close-thick"
                                    size={20}
                                    onPress={() => dispatch({ type: 'cancel', field: 'password' })}
                                    style={[styles.canceEditlBtn]}
                                />
                            </View>
                            <TextInput
                                label="ווידוא סיסמה"
                                value={formState.password.value}
                                onChangeText={text => dispatch({ type: 'update', field: 'password', value: text })}
                                mode='outlined'
                                //placeholder={}
                                style={[styles.textInput]}
                                //theme={{ roundness: 50, activeOutlineColor: 'white' }}
                                //activeOutlineColor='red'
                                outlineStyle={styles.outlinedInputBorder}
                            />
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


            </ScrollView>
        </SafeAreaView>
    )
}