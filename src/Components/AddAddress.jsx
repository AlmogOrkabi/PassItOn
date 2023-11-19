import { View, Text, SafeAreaView, FlatList, TouchableOpacity, KeyboardAvoidingView, Pressable, ActivityIndicator, ScrollView } from 'react-native'
import React, { useState, useMemo, useEffect } from 'react'
import { styles } from '../Styles';
import { TextInput, Button, } from 'react-native-paper';
import { GEOAPI_KEY } from '@env';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';



export default function AddAddress({ address, handleChange }) {

    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [retryCount, setRetryCount] = useState(3); //* retries if the api fails to respond (happens quite a lot)

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
            const url = `https://api.tomtom.com/search/2/geocode/${query}.json?key=${GEOAPI_KEY}&limit=5&countrySet=IL&language=he-IL`;

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
        return simplifiedAddress;
    });


    //! changed from flatlist to map because of the scrollview
    const renderSuggestion = ({ item }) => {
        // console.log("renderSuggestion")
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
        // console.log("location:", address.location)
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
    const [apiResponded, setApiResponded] = useState(false);

    const getLocation = async () => {
        let timeoutId; //* in case the api doesnt respond
        //let apiResponded = false;
        try {
            setLoading(true);
            setSuggestions([])

            timeoutId = setTimeout(() => {
                setLoading(false);
                if (apiResponded) return;

                setRetryCount(prevRetryCount => {
                    if (prevRetryCount > 0) {
                        console.log("retry count: " + (prevRetryCount - 1));
                        getLocation();
                        return prevRetryCount - 1;
                    } else {
                        console.log("getLocation failed");
                        return prevRetryCount;
                    }
                });

            }, 10000);


            let currentLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
            setApiResponded(true);
            clearTimeout(timeoutId); //* Clear the timeout if the API responds
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
        <SafeAreaView style={[styles.container, styles.flexRow, { padding: 20, maxWidth: '80%', alignItems: 'flex-start' },]}>
            <View style={[{ justifyContent: 'center' }]}>
                <TextInput style={[styles.input, { minWidth: '90%', marginTop: -6 }]} label="כתובת" value={address.addressInput} theme={{ colors: { onSurfaceVariant: 'black', placeholder: 'white', primary: '#66686c' } }} onChangeText={(text) => {
                    handleChange((prev) => ({ ...prev, addressInput: text }));
                    debouncedHandleInputChange(text);

                }}
                    mode='outlined'
                    outlineStyle={styles.outlinedInputBorder}
                />
                {/* {suggestions ? <FlatList
                    style={[styles.addressFlatList,]}
                    data={suggestions}
                    renderItem={renderSuggestion}
                    keyExtractor={(item) => item.value}
                    nestedScrollEnabled
                /> : null} */}
                <ScrollView nestedScrollEnabled style={[{ maxHeight: 100 }]}>
                    {suggestions ? suggestions.map((suggestion, index) => (
                        <TouchableOpacity style={[styles.suggestionList_item]} key={index} onPress={() => handleSuggestionPress(suggestion)}>
                            <Text style={[styles.suggestionList_text]}>{simplifyAddress(suggestion)}</Text>
                        </TouchableOpacity>
                    ))
                        : null
                    }
                </ScrollView>
            </View>
            {
                loading ? <View style={[styles.locationBtn]}>
                    <ActivityIndicator />
                </View> :
                    <TouchableOpacity onPress={() => getLocationPermission()} style={[styles.locationBtn,]} activeOpacity={0.5} >
                        <MaterialIcons name="my-location" size={24} color="black" />
                    </TouchableOpacity>
            }
        </SafeAreaView >
    )
}