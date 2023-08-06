import { View, Text } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'

import { RadioButton } from 'react-native-paper';
import { styles } from '../Styles'
import { AppContext } from '../Contexts/AppContext';
import AddAddress from './AddAddress';

export default function ChooseLocation({ coordinates, setCoordinates }) {
    const { loggedUser } = useContext(AppContext)
    const [fromLocation, setFromLocation] = useState('user')

    const [address, setAddress] = useState({ addressInput: '', location: null });

    useEffect(() => {

    }, [fromLocation]);

    function handleChange(from) {
        setFromLocation(from);
        if (from == 'user') {
            setCoordinates(loggedUser.address.location.coordinates);
        }
        else if (from == 'newLocation' && address.location) {
            if (Array.isArray(address.location.position))
                setCoordinates(address.location.position)
            else
                setCoordinates([address.location.position.lon, address.location.position.lat])
        }
        console.log("from location: " + from)
        console.log("coordinates: " + coordinates);
        //console.log("coordinates: " + JSON.stringify(coordinates));

        // console.log("logged user location: " + JSON.stringify(loggedUser.address.location.coordinates))
    }

    return (
        <View>
            <View >
                <RadioButton.Group onValueChange={(newValue) => handleChange(newValue)} value={fromLocation}>
                    <View style={[styles.flexRow, { justifyContent: 'center' }]}>
                        <View style={[styles.flexRow]}>
                            <RadioButton value="user" />
                            <Text>המיקום שלי</Text>
                        </View>
                        <View style={[styles.flexRow]}>
                            <RadioButton value="newLocation" />
                            <Text>מיקום חדש</Text>
                        </View>
                    </View>
                </RadioButton.Group>
            </View>
            <View>
                {fromLocation == 'user' ? <Text>{loggedUser.address.simplifiedAddress}</Text> : <AddAddress address={address} handleChange={setAddress} />}
            </View>

        </View>
    )
}