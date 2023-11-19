import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image, Alert, Modal } from 'react-native'
import React, { useState, useContext, useReducer, useEffect } from 'react'
import { IconButton, Button, PaperProvider, Menu, Divider } from 'react-native-paper';
import { styles } from '../Styles';
import { openCamera, openMediaLibrary } from '../utils/index';

export default function AddPictures({ photos, setPhotos, title }) {

    const [visible, setVisible] = useState(false);


    const addPhoto = (photoUri) => {
        if (photos.length < 6) {
            setPhotos((prevPhotos) => [...prevPhotos, photoUri]);
        }
    };

    const removePhoto = (index) => {
        setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
    };

    async function handlePress(option) {
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
                            size={15}
                            onPress={() => removePhoto(index)}
                            style={[styles.npdeleteButton, { width: 17, height: 17 }]}
                        />
                    </View>
                ))}

                {photos.length < 6 && (

                    <Menu
                        visible={visible}
                        onDismiss={() => setVisible(false)}
                        anchor={<IconButton
                            icon="plus"
                            color="gray"
                            size={30}
                            onPress={() => handlePress()}
                            style={styles.npaddPhotoButton}
                        />
                        }
                        anchorPosition='top'
                    >
                        <Menu.Item onPress={() => { handlePress(1) }} title="מצלמה" />
                        <Divider />
                        <Menu.Item onPress={() => { handlePress(2) }} title="גלריה" />


                    </Menu>
                )}
            </View>
        </View>
    )
}