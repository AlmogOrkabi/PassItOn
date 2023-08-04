import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useMemo, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { styles } from '../Styles';
import { TextInput, Button } from 'react-native-paper';
import { GEOAPI_KEY } from '@env';
import * as Location from 'expo-location';

export default function AddressesForm({ state, dispatch, handleChange }) {

    const { control, handleSubmit, formState: { errors } } = useForm();


    //const [location, setLocation] = useState(null);
    //const [addressInput, setAddressInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);



    // useEffect(() => {
    //     console.log("rendered")

    // }, []);




    // useEffect(() => {
    //     console.log("location updated", location);
    //     if (location) {
    //         console.log(location, "USEEFFECT") //this prints the location, the problem is with the function simplifyAddress.
    //         //setAddressInput(simplifyAddress(location));
    //         let simp = simplifyAddress(location[0]);
    //         setAddressInput(simp);
    //     }

    // }, [location]);



    //delay function to reduce requests from the API:
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




    // const handleInputChange = debounce(async (query) => {
    //     const url = `https://api.tomtom.com/search/2/geocode/${query}.json?key=${GEOAPI_KEY}&limit=3&countrySet=IL&language=he-IL`;

    //     try {
    //         const response = await fetch(url);
    //         const data = await response.json();

    //         if (data.error) {
    //             console.error(data.error);
    //         } else {
    //             setSuggestions(data.results);
    //             console.log("suggestions", suggestions)
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }, 2000);

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
        handleChange('addresses', 'location', suggestion);
        const simplifiedAddress = simplifyAddress(suggestion)
        handleChange('addresses', 'addressInput', simplifiedAddress);
        handleChange('addresses', 'location', suggestion);
        console.log("location:", state.location)
        setSuggestions([]); // Clear the suggestions once one is selected
    };
    //****************************//

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
            let currentLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
            console.log("Location from device: ", currentLocation);
            console.log("coordinates:", currentLocation.coords.latitude, currentLocation.coords.longitude);
            //setLocation(await reverseGeocode(currentLocation.coords.latitude, currentLocation.coords.longitude));
            const deviceLocation = await reverseGeocode(currentLocation.coords.latitude, currentLocation.coords.longitude)
            handleChange('addresses', 'location', deviceLocation[0]); //the request returns an array of results
            console.log("deviceLocation:", state.location);
            if (deviceLocation[0]) {
                const simplifiedAddress = simplifyAddress(deviceLocation[0]);
                handleChange('addresses', 'addressInput', simplifiedAddress);
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
        <SafeAreaView style={[styles.container]}>

            <Text style={[styles.form_small_heading]} >כתובת (לא חובה)</Text>
            <Controller
                control={control}
                name="address"
                rules={{}}
                //onChangeText={value => { onChange(value); handleChange('addresses', 'addressInput', value); }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput style={[styles.input,]} label="כתובת" value={state.addressInput} onChangeText={(text) => {
                        //setAddressInput(text);
                        //handleInputChange(text);
                        handleChange('addresses', 'addressInput', value)
                        debouncedHandleInputChange(text);
                    }} theme={{ colors: { onSurfaceVariant: 'black', placeholder: 'white', primary: '#66686c' } }} />
                )}
            />

            {suggestions ? <FlatList
                style={[styles.addressFlatList]}
                data={suggestions}
                renderItem={renderSuggestion}
                keyExtractor={(item, index) => index.toString()}
            /> : null}


            <TouchableOpacity onPress={() => getLocationPermission()} style={[{ backgroundColor: "lightblue", padding: 10 }]}><Text>למיקום נוכחי לחץ כאן</Text></TouchableOpacity>



        </SafeAreaView>
    )
}