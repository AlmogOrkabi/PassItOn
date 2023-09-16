import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image, Alert, Modal } from 'react-native'
import React, { useState, useContext, useReducer, useEffect } from 'react'
import { IconButton, Button, PaperProvider, Menu, Divider } from 'react-native-paper';
// import * as ImagePicker from 'expo-image-picker'
import { styles } from '../Styles';
import Overlay from './Overlay';
import { openCamera, openMediaLibrary } from '../utils/index';

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


    // const openMediaLibrary = async () => {
    //     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //     console.log(status)
    //     if (status !== 'granted') {
    //         alert('הרשאה נדחתה');
    //         return;
    //     }
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //         allowsEditing: true,
    //         // aspect: [4, 3],
    //         // quality: 1,
    //     });

    //     console.log(result);

    //     if (!result.canceled) {
    //         addPhoto(result.uri);
    //     }
    // }


    // const openCamera = async () => {
    //     const { status } = await ImagePicker.requestCameraPermissionsAsync();
    //     if (status !== 'granted') {
    //         alert('הרשאה נדחתה');
    //         return;
    //     }
    //     let result = await ImagePicker.launchCameraAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //         allowsEditing: true,
    //     });

    //     console.log(result);

    //     if (!result.canceled) {
    //         addPhoto(result.uri);
    //     }
    // }

    const [visible, setVisible] = useState(false);

    const show = () => setVisible(true);

    const hide = () => setVisible(false);




    const addPhoto = (photoUri) => {
        if (photos.length < 6) {
            setPhotos((prevPhotos) => [...prevPhotos, photoUri]);
        }
    };

    const removePhoto = (index) => {
        setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
    };

    async function handlePress(option) {
        // Alert.alert(null, null, [
        //     { text: 'מצלמה', onPress: () => openCamera() },
        //     { text: 'ספריה', onPress: () => openMediaLibrary() }
        // ])
        let res
        if (option == 1) {
            res = await openCamera();
        }
        else if (option == 2) {
            res = await openMediaLibrary();
        }

        if (res) {
            addPhoto(res)
        }
        setVisible(!visible);

    }

    return (
        <View style={[{ position: 'relative', flex: 1 }]}>
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
                        //onPress={pickImage}
                        onPress={() => handlePress()}
                        style={styles.npaddPhotoButton}
                    />
                )}
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
                onRequestClose={() => {
                    setVisible(!visible);
                }}>

                <View style={[styles.smallModal]}>
                    <View style={[{ gap: 10 }]}>
                        <Button mode='text' style={[{ margin: '1%' }]} onPress={() => { handlePress(1); setVisible(!visible) }}>מצלמה</Button>
                        <Divider />
                        <Button mode='text' style={[{ margin: '1%' }]} onPress={() => { handlePress(2); setVisible(!visible) }}>ספריה</Button>
                    </View>
                </View>
                {visible && <Overlay onClose={hide} />}
            </Modal>

        </View>
    )
}