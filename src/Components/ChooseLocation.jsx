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
        if (fromLocation == 'user') {
            setCoordinates(loggedUser.address.location.coordinates.toString());
        }
        else if (fromLocation == 'newLocation' && address.location) {
            setCoordinates(address.location)
        }
        console.log("from location: " + fromLocation)
        console.log("coordinates: " + coordinates);
    }, [fromLocation]);



    return (
        <View>
            <View >
                <RadioButton.Group onValueChange={newValue => setFromLocation(newValue)} value={fromLocation}>
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