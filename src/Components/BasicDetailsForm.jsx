import { View, Text, SafeAreaView, Image } from 'react-native'
import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { styles } from '../Styles';
import { TextInput, Button, IconButton } from 'react-native-paper';

import * as ImagePicker from 'expo-image-picker';
//***expo-image-picker does not automatically ask for permissions

import * as Permissions from 'expo-permissions';

import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function BasicDetailsForm() {

    const [image, setImage] = useState(null);

    const { control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        // Handle form submission
        console.log(data);
    };



    const pickImage = async () => {

        // ask for permission to access  the media on the device
        const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
        if (status !== 'granted') {
            alert('הרשאה נדחתה');
            return;
        }


        let result = await ImagePicker.launchImageLibraryAsync({
            //MediaTypeOptions.Images  = only images. to get all files, change to .All
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };




    return (
        <SafeAreaView style={[styles.container]}>

            <View style={[]}>

                <Text style={[styles.form_small_heading]} >פרטים אישיים:</Text>
                <Controller
                    control={control}
                    name="username"
                    rules={{ required: 'שדה חובה' }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput style={[styles.input,]} label="שם משתמש" value={null} theme={{ colors: { onSurfaceVariant: 'black', placeholder: 'white', primary: '#66686c' } }} />
                    )}
                />
                {errors.username && <Text style={[styles.inputError,]} >{errors.username.message}</Text>}

                <Controller
                    control={control}
                    name="firstName"
                    rules={{ required: 'שדה חובה' }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput style={[styles.input,]} label="שם פרטי" value={null} theme={{ colors: { onSurfaceVariant: 'black', placeholder: 'white', primary: '#66686c' } }} />
                    )}
                />
                {errors.firstName && <Text style={[styles.inputError,]} >{errors.firstName.message}</Text>}


                <Controller
                    control={control}
                    name="lastName"
                    rules={{ required: 'שדה חובה' }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput style={[styles.input,]} label="שם משפחה" value={null} theme={{ colors: { onSurfaceVariant: 'black', placeholder: 'white', primary: '#66686c' } }} />
                    )}
                />
                {errors.lastName && <Text style={[styles.inputError,]} >{errors.lastName.message}</Text>}

                <Button style={styles.smallTextButton} textColor='gray' icon={"file-image-plus-outline"} onPress={pickImage}  > תמונת פרופיל</Button>

                {/* <IconButton
                    icon="file-image-plus-outline"
                    size={20}
                    onPress={pickImage}
                /> */}
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}




            </View>
        </SafeAreaView>
    )
}