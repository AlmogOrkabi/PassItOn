import { View, Text, SafeAreaView, FlatList, TouchableOpacity, KeyboardAvoidingView, Pressable, ActivityIndicator } from 'react-native'
import React, { useState, useMemo, useEffect } from 'react'
// import { useForm, Controller } from 'react-hook-form';
import { styles } from '../Styles';
import { TextInput, Button, } from 'react-native-paper';
import { GEOAPI_KEY } from '@env';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';


export default function AddAddress({ address, handleChange }) {

    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [retryCount, setRetryCount] = useState(3); //retries if the api fails to respond (happens quite a lot)

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
        //console.log(postalCode)
        const postalCode = item.address.extendedPostalCode;
        const address = item.address.freeformAddress;
        const simplifiedAddress = address.replace(postalCode, '');
        //console.log("address", simplifiedAddress)
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
                <Text >{simplifiedAddress}</Text>
            </TouchableOpacity>
        );
    };

    const handleSuggestionPress = (suggestion) => {
        const simplifiedAddress = simplifyAddress(suggestion)
        handleChange((prev) => ({ ...prev, location: suggestion, addressInput: simplifiedAddress }));
        console.log("location:", address.location)
        setSuggestions([]); // Clear the suggestions once one is selected
    };

    const getLocationPermission = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert('גישה למיקום נדחתה');
            return;
        }
        await getLocation();
    }


    const getLocation = async () => {
        let timeoutId; // in case the api doesnt respond
        let apiResponded = false;
        try {
            setLoading(true);
            setSuggestions([])

            timeoutId = setTimeout(() => {
                setLoading(false);
                if (apiResponded) return;
                if (retryCount > 0) {
                    setRetryCount((retryCount) => retryCount - 1);
                    console.log("retry count: " + retryCount)
                    getLocation();
                } else {
                    console.log("getLocation failed")
                }

            }, 10000);


            let currentLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
            apiResponded = true;
            clearTimeout(timeoutId); // Clear the timeout if the API responds
            setRetryCount(0);
            // console.log("Location from device: ", currentLocation);
            // console.log("coordinates:", currentLocation.coords.latitude, currentLocation.coords.longitude);
            const deviceLocation = await reverseGeocode(currentLocation.coords.latitude, currentLocation.coords.longitude)
            console.log("deviceLocation:", deviceLocation);
            const simplifiedAddress = await simplifyAddress(deviceLocation[0]);
            await handleChange((prev) => ({ ...prev, location: deviceLocation[0], addressInput: simplifiedAddress }))


        } catch (error) {
            clearTimeout(timeoutId); // Clear the timeout in case of an error
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

    useEffect(() => {
        if (address.location) {
            //console.log("Location updated:", address.location);
            setLoading(false);
        }

    }, [address]);





    return (
        <SafeAreaView style={[styles.container, styles.flexRow, { padding: 20, maxWidth: '80%', alignItems: 'center' },]}>
            <View style={[{ justifyContent: 'flex-start' }]}>
                <TextInput style={[styles.input, { minWidth: '90%', marginTop: -2 }]} label="כתובת" value={address.addressInput} theme={{ colors: { onSurfaceVariant: 'black', placeholder: 'white', primary: '#66686c' } }} onChangeText={(text) => {
                    //setAddressInput(text);
                    //handleInputChange(text);
                    handleChange((prev) => ({ ...prev, addressInput: text }));
                    debouncedHandleInputChange(text);

                }}
                    mode='outlined'
                    outlineStyle={styles.outlinedInputBorder}
                />

                {suggestions ? <FlatList
                    style={[styles.addressFlatList,]}
                    data={suggestions}
                    renderItem={renderSuggestion}
                    keyExtractor={(item) => item.value}
                    nestedScrollEnabled
                /> : null}
            </View>

            {
                loading ? <View style={[styles.locationBtn]}>
                    <ActivityIndicator />
                </View> :
                    <TouchableOpacity onPress={() => getLocationPermission()} style={[styles.locationBtn,]} activeOpacity={0.5} >
                        <Ionicons name="location-outline" size={24} color="black" />
                        {/* <Text> מיקום נוכחי</Text> */}

                    </TouchableOpacity>
            }



            {/* <Button onPress={() => getLocationPermission()} style={[{ backgroundColor: "lightblue", padding: 0 }, { alignSelf: 'flex-end' }]}>למיקום נוכחי</Button> */}
        </SafeAreaView >
    )
}