import { View, Text, SafeAreaView, FlatList, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useState, useMemo, useEffect } from 'react'
// import { useForm, Controller } from 'react-hook-form';
import { styles } from '../Styles';
import { TextInput, Button } from 'react-native-paper';
import { GEOAPI_KEY } from '@env';
import * as Location from 'expo-location';

export default function AddAddress({ address, handleChange }) {


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



    const debouncedHandleInputChange = useMemo(() => {
        return debounce(async (query) => {
            const url = `https://api.tomtom.com/search/2/geocode/${query}.json?key=${GEOAPI_KEY}&limit=3&countrySet=IL&language=he-IL`;

            try {
                const response = await fetch(url);
                const data = await response.json();

                if (data.error) {
                    console.error(data.error);
                } else {
                    setSuggestions(data.results);
                }
            } catch (error) {
                console.error(error);
            }
        }, 2000);
    }, []);

    const simplifyAddress = ((item) => {
        if (!item) return;

        const postalCode = item.address.extendedPostalCode;
        console.log(postalCode)
        const address = item.address.freeformAddress;
        const simplifiedAddress = address.replace(postalCode, '');
        console.log("address", simplifiedAddress)
        //******************//
        //setAddressInput(simplifiedAddress)
        return simplifiedAddress;
    });


    const renderSuggestion = ({ item }) => {
        console.log("renderSuggestion")
        if (!item)
            return;

        const simplifiedAddress = simplifyAddress(item)

        return (
            <TouchableOpacity onPress={() => handleSuggestionPress(item)}>
                <View>
                    <Text >{simplifiedAddress}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    const handleSuggestionPress = (suggestion) => {
        const simplifiedAddress = simplifyAddress(suggestion)
        handleChange({ location: suggestion, addressInput: simplifiedAddress });
        console.log("location:", address.location)
        setSuggestions([]); // Clear the suggestions once one is selected
    };

    const getLocationPermission = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert('גישה למיקום נדחתה');
            return;
        }
        getLocation();
    }


    const getLocation = async () => {
        try {
            setSuggestions([])
            let currentLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
            console.log("Location from device: ", currentLocation);
            console.log("coordinates:", currentLocation.coords.latitude, currentLocation.coords.longitude);
            //setLocation(await reverseGeocode(currentLocation.coords.latitude, currentLocation.coords.longitude));
            const deviceLocation = await reverseGeocode(currentLocation.coords.latitude, currentLocation.coords.longitude)
            console.log("deviceLocation:", deviceLocation);
            if (deviceLocation[0]) {
                const simplifiedAddress = simplifyAddress(deviceLocation[0]);
                handleChange({ location: deviceLocation[0], addressInput: simplifiedAddress })
            }


        } catch (error) {
            console.error(error, "error1");
        }
    }
    async function reverseGeocode(lat, lon) {
        const reverseGeocodeUrl = `https://api.tomtom.com/search/2/reverseGeocode/${lat},${lon}.json?key=${GEOAPI_KEY}&language=he-IL`;

        try {
            const response = await fetch(reverseGeocodeUrl);
            const data = await response.json();

            if (data.error) {
                console.error(data.error, "Error");
            } else {
                return data.addresses;
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <SafeAreaView style={[styles.container, styles.flexRow, { padding: 20 }]}>
            <View>
                <TextInput style={[styles.input,]} label="כתובת" value={address.addressInput} theme={{ colors: { onSurfaceVariant: 'black', placeholder: 'white', primary: '#66686c' } }} onChangeText={(text) => {
                    //setAddressInput(text);
                    //handleInputChange(text);
                    handleChange({ addressInput: text })
                    debouncedHandleInputChange(text);
                }} />

                {suggestions ? <FlatList
                    style={[styles.addressFlatList]}
                    data={suggestions}
                    renderItem={renderSuggestion}
                    keyExtractor={(index) => index.toString()}
                /> : null}
            </View>

            <TouchableOpacity onPress={() => getLocationPermission()} style={[{ backgroundColor: "lightblue", padding: 10 }]}><Text>למיקום נוכחי לחץ כאן</Text></TouchableOpacity>
        </SafeAreaView>
    )
}