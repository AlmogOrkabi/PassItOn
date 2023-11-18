import React, { useState, useMemo, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { styles } from '../Styles';
import { TextInput, Button } from 'react-native-paper';
import { View, Text, SafeAreaView } from 'react-native'
import AddAddress from './AddAddress'

import { isValidAddressNotes } from '../utils/index'


export default function AddressesForm({ state, dispatch, handleChange, validErr, addressData, setAddressData }) {

    const { control, handleSubmit, formState: { errors } } = useForm({ mode: 'all' });

    return (
        <SafeAreaView style={[styles.sub_container2]}>
            <Text style={[styles.form_small_heading]}>כתובת:</Text>
            {validErr === 'addressNull' ? <Text style={[styles.inputError]}>נא הכנס כתובת תקינה</Text> : null}
            <AddAddress address={addressData} handleChange={setAddressData} />
            <Text style={[styles.form_small_heading]}>פרטים נוספים (לא חובה)</Text>
            <View style={[styles.flexRow, { marginVertical: '5%' }, { alignItems: 'baseline' }]}>

                <Controller
                    control={control}
                    name='apartmentNumber'
                    defaultValue={state.apartment}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            inputMode='numeric'
                            style={[styles.input, styles.input_small]}
                            label="דירה"
                            value={value}
                            onBlur={onBlur}
                            onChangeText={value => { onChange(value); handleChange('addresses', 'apartment', value); }}
                            outlineStyle={styles.outlinedInputBorder}
                            mode='outlined'
                        />)}

                />

                <View >

                    <Controller
                        control={control}
                        name='notes'
                        defaultValue={state.notes}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={[styles.input,]}
                                label="הערות לכתובת"
                                value={value}
                                onBlur={onBlur}
                                onChangeText={value => { onChange(value); handleChange('addresses', 'notes', value); }}
                                outlineStyle={styles.outlinedInputBorder}
                                mode='outlined'
                            />
                        )}
                        rules={{
                            validate:
                                value => isValidAddressNotes(value) || 'התיאור ארוך מידי'
                        }}
                    />
                    {errors.notes && <Text style={[styles.inputError,]} >{errors.notes.message}</Text>}

                </View>


            </View>
        </SafeAreaView >
    )
}