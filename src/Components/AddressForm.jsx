import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { styles } from '../Styles';
import { TextInput, Button } from 'react-native-paper';
import { GEO_API_KEY } from '@env';
import * as Location from 'expo-location';

export default function AddressForm() {

    const { control, handleSubmit, formState: { errors } } = useForm();

    const [addressInput, setAddressInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    function debounce(func, delay) {
        let debounceTimer;
        return function () {
            const context = this;
            const args = arguments;
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(context, args), delay);
        };
    }



    const handleInputChange = debounce(async (text) => {
        const url = `https://us1.locationiq.com/v1/search.php?key=${GEO_API_KEY}&q=${text}&format=json&countrycodes=IL&accept-language=he&limit=5`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.error) {
                console.error(data.error);
            } else {
                console.log(data)
                setSuggestions(data);
            }
        } catch (error) {
            console.error(error);
        }
    }, 2000);






    // const handleSuggestionPress = (suggestion) => {
    //     setInput(suggestion.display_name);
    //     setSuggestions([]); // Clear the suggestions once one is selected
    // };


    // const renderItem = ({ item }) => (
    //     <TouchableOpacity onPress={() => handleSuggestionPress(item)}>
    //         <View>
    //             <Text>{item.display_name}</Text>
    //         </View>
    //     </TouchableOpacity>
    // );


    const handleSuggestionPress = (suggestion) => {
        const addressParts = suggestion.display_name.split(',');
        const streetNameAndNumber = addressParts[1] + addressParts[2];
        const cityName = addressParts[addressParts.length - 5];
        const simplifiedAddress = `${streetNameAndNumber}, ${cityName}`;

        setAddressInput(simplifiedAddress);
        setSuggestions([]); // Clear the suggestions once one is selected
    };



    const renderItem = ({ item }) => {
        const addressParts = item.display_name.split(',');
        const streetNameAndNumber = addressParts[0] + addressParts[1];
        const cityName = addressParts[addressParts.length - 5];
        const simplifiedAddress = `${streetNameAndNumber}, ${cityName}`;

        return (
            <TouchableOpacity onPress={() => handleSuggestionPress(item)}>
                <View>
                    <Text>{simplifiedAddress}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    //**********************************************//

    const [location, setLocation] = useState(null);

    const GetLocation = async () => {
        try {
            let currentLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
            console.log(currentLocation);
            console.log(currentLocation.coords.latitude, currentLocation.coords.longitude);
            setLocation(await reverseGeocode(currentLocation.coords.latitude, currentLocation.coords.longitude));
            console.log(location)
            setAddressInput(location._j)
        } catch (error) {
            console.error(error);
        }
    }
    const GetLocationPermission = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert('גישה למיקום נדחתה');
            return;
        }
        GetLocation();
    }



    async function reverseGeocode(lat, lon) {
        const reverseGeocodeUrl = `https://us1.locationiq.com/v1/reverse.php?key=${GEO_API_KEY}&lat=${lat}&lon=${lon}&format=json&accept-language=he&zoom=18`;

        try {
            const response = await fetch(reverseGeocodeUrl);
            const data = await response.json();

            if (data.error) {
                console.error(data.error);
            } else {
                console.log(data.display_name); // This will be the address
                return data.display_name;
            }
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <SafeAreaView style={[styles.container]}>

            <Text style={[styles.form_small_heading]} >כתובת (לא חובה)</Text>
            <Controller
                control={control}
                name="address"
                rules={{}}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput style={[styles.input,]} label="כתובת" value={addressInput} onChangeText={(text) => {
                        setAddressInput(text);
                        handleInputChange(text);
                    }} theme={{ colors: { onSurfaceVariant: 'black', placeholder: 'white', primary: '#66686c' } }} />
                )}
            />
            {errors.username && <Text style={[styles.inputError,]} >{errors.username.message}</Text>}

            {suggestions ? <FlatList
                style={[styles.addressFlatList]}
                data={suggestions}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            /> : null}


            <TouchableOpacity onPress={() => GetLocationPermission()} style={[{ backgroundColor: "lightblue", padding: 10 }]}><Text>למיקום נוכחי לחץ כאן</Text></TouchableOpacity>



        </SafeAreaView>
    )
}