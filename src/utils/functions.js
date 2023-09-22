import * as ImagePicker from 'expo-image-picker'
import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';



export const getToken = async () => {
    return await SecureStore.getItemAsync('userToken');
};
export const removeToken = async () => {
    await SecureStore.deleteItemAsync('userToken');
};

export const setToken = async (userToken) => {
    await SecureStore.setItemAsync('userToken', userToken);
};





export const uriToBase64 = async (uri) => {
    try {
        const response = await fetch(uri);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error("Failed to convert URI to Base64: ", error.toString());
    }
}

// export const uriToBase64 = async (uri) => {
//     try {
//         console.log("uri =>", uri)
//         const response = await fetch(uri);
//         const blob = await response.blob();
//         return new Promise((resolve, reject) => {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 let base64data = reader.result;
//                 const cleanedBase64String = base64data.replace(/^data:image\/[a-z]+;base64,/, "");
//                 resolve(cleanedBase64String);
//             };
//             reader.onerror = reject;
//             reader.readAsDataURL(blob);
//         });
//     } catch (error) {
//         console.error("Failed to convert URI to Base64: ", error.toString());
//     }
// }

export const urisArrayToBase64 = async (uris) => {
    try {
        // Promise.all maps over the array of uris and runs uriToBase64 for each URI
        const base64Array = await Promise.all(
            uris.map(uri => uriToBase64(uri))
        );
        return base64Array;  // Returns an array of Base64 strings
    } catch (error) {
        console.error("Failed to convert one or more URIs to Base64: ", error.toString());
    }
}



export const openMediaLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log(status)
    if (status !== 'granted') {
        Alert.alert('', 'הגישה נדחתה. כדי להעלות להעלות תמונה יש לאפשר לאפליקציה גישה למדיה דרך הגדרות המכשיר', [
            { text: 'אישור', onPress: () => { } }
        ]);
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
        //addPhoto(result.uri);
        return result.assets[0].uri
    }
    else return null;
}


export const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
        alert('הרשאה נדחתה');
        return;
    }
    let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
    });

    console.log(result);

    if (!result.canceled) {
        //addPhoto(result.uri);
        return result.assets[0].uri
    }
    else return null;
}