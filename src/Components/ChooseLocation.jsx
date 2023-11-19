import { View, Text } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'

import { RadioButton, TextInput } from 'react-native-paper';
import { styles } from '../Styles'
import { AppContext } from '../Contexts/AppContext';
import AddAddress from './AddAddress';

export default function ChooseLocation({ address, setAddress, addNotes = false }) {
    const { loggedUser } = useContext(AppContext)
    const [fromLocation, setFromLocation] = useState('user')

    useEffect(() => {
        if (fromLocation == 'user') {
            setAddress((prev) => loggedUser.address)
            // console.log(loggedUser.address)
        }
        else {
            setAddress((prev) => ({ ...prev, notes: '' }))
        }
    }, [fromLocation]);

    return (
        <View style={[styles.container, styles.sub_container2]}>
            <View >
                <RadioButton.Group onValueChange={(newValue) => setFromLocation(newValue)} value={fromLocation}>
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
            <View >
                {fromLocation == 'user' ? <Text>{loggedUser.address.simplifiedAddress}</Text> : <View>
                    <AddAddress address={address} handleChange={setAddress} />
                    {
                        addNotes && <TextInput
                            label="הערות לכתובת"
                            placeholder=''
                            value={address.notes}
                            onChangeText={text => setAddress((prev) => ({ ...prev, notes: text }))}
                            mode='outlined'
                            style={[styles.textInput]}
                            outlineStyle={styles.outlinedInputBorder}
                            multiline={true}
                        />
                    }
                </View>}
            </View>

        </View>
    )
}