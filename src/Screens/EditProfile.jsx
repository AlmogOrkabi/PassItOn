import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, I18nManager } from 'react-native';
import { AppContext } from '../Contexts/AppContext';
import { styles, theme } from '../Styles';

export default function EditProfile({ navigation }) {
    const { users, loggedUser } = useContext(AppContext);
    const [firstName, setFirstName] = useState(loggedUser.firstName);
    const [lastName, setLastName] = useState(loggedUser.lastName);
    const [email, setEmail] = useState(loggedUser.email);
    const [phoneNumber, setPhoneNumber] = useState(loggedUser.phoneNumber);
    const [simplifiedAddress, setSimplifiedAddress] = useState(
        loggedUser.address.simplifiedAddress || ''
    );
    const [profilePicture, setProfilePicture] = useState(
        loggedUser.photo && loggedUser.photo.url
            ? { uri: loggedUser.photo.url }
            : require('../Pictures/DefaultPfp.jpg')
    );


    I18nManager.forceRTL(true);
    I18nManager.allowRTL(true);

    const handleUpdateProfile = () => {

        navigation.goBack();
    };

    const handleEditProfilePicture = () => {

    };

    return (
        <View style={styles.main_container2}>

            <Text style={styles.title}>עריכת פרופיל</Text>
            <TouchableOpacity onPress={handleEditProfilePicture}>
                <Image
                    source={profilePicture}
                    style={styles.profilePicture}
                />
            </TouchableOpacity>
            <TextInput
                placeholder="שם פרטי"
                value={firstName}
                onChangeText={setFirstName}
                style={styles.input}
            />
            <TextInput
                placeholder="שם משפחה"
                value={lastName}
                onChangeText={setLastName}
                style={styles.input}
            />
            <TextInput
                placeholder="אימייל"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <TextInput
                placeholder="מספר טלפון"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                style={styles.input}
            />
            <TextInput
                placeholder="כתובת"
                value={simplifiedAddress}
                onChangeText={setSimplifiedAddress}
                style={styles.input}
            />
            <Button title="שמור" onPress={handleUpdateProfile} style={styles.btn} />
        </View>
    );
}