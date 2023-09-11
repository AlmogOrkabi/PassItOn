import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image, Alert, ActivityIndicator } from 'react-native'
import React, { useState, useContext, useReducer, useEffect } from 'react'
import { IconButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker'
import { styles } from '../Styles';


export default function AddPictures({ photos, setPhotos, title }) {

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
            // aspect: [4, 3],
            // quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            addPhoto(result.uri);
        }
    };


    const addPhoto = (photoUri) => {
        if (photos.length < 6) {
            setPhotos((prevPhotos) => [...prevPhotos, photoUri]);
        }
    };

    const removePhoto = (index) => {
        setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
    };


    return (
        <View>
            <Text style={styles.nplabel}>{title}</Text>
            <View style={styles.npphotoContainer}>
                {photos.map((photoUri, index) => (
                    <View key={index} style={styles.npphotoItem}>
                        <Image source={{ uri: photoUri }} style={styles.npphoto} />
                        <IconButton
                            icon="delete"
                            color="red"
                            size={20}
                            onPress={() => removePhoto(index)}
                            style={styles.npdeleteButton}
                        />
                    </View>
                ))}

                {photos.length < 6 && (
                    <IconButton
                        icon="plus"
                        color="gray"
                        size={30}
                        // onPress={() => handleAddPhoto('photo_uri_placeholder')}
                        onPress={pickImage}
                        style={styles.npaddPhotoButton}
                    />
                )}
            </View>

        </View>
    )
}