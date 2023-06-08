import { View, Text, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { styles } from '../Styles';
import { TextInput, Button } from 'react-native-paper';

export default function BasicDetailsForm() {

    // const { control, handleSubmit, errors } = useForm();
    const { control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        // Handle form submission
        console.log(data);
    };

    return (
        <SafeAreaView style={[styles.main_container, styles.container]}>
            <Text style={[styles.title, { marginBottom: 40 }]}>דף הרשמה</Text>
            <View style={[]}>
                {/* <Text style={[styles.form_small_heading]} >פרטים אישיים:</Text>
                <TextInput style={[styles.input,]} label="שם משתמש" value={null} theme={{ colors: { onSurfaceVariant: 'black', placeholder: 'white', primary: '#66686c' } }} />

                <TextInput style={[styles.input,]} label="שם פרטי" value={null} theme={{ colors: { onSurfaceVariant: 'black', placeholder: 'white', primary: '#66686c' } }} />

                <TextInput style={[styles.input,]} label="שם משפחה" value={null} theme={{ colors: { onSurfaceVariant: 'black', placeholder: 'white', primary: '#66686c' } }} />

                <TextInput style={[styles.input,]} label="סיסמה" value={null} theme={{ colors: { onSurfaceVariant: 'black', placeholder: 'white', primary: '#66686c' } }} />

                <TextInput style={[styles.input]} label="ווידוא סיסמה" value={null} theme={{
                    colors: { onSurfaceVariant: 'black', placeholder: 'white', primary: '#66686c' }
                }} />

                <Button style={styles.btn} mode="contained" onPress={() => { }}  >הרשמה</Button> */}
                <Text style={[styles.form_small_heading]} >פרטים אישיים:</Text>
                <Controller
                    control={control}
                    name="username"
                    rules={{ required: 'שדה חובה' }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput style={[styles.input,]} label="שם משתמש" value={null} theme={{ colors: { onSurfaceVariant: 'black', placeholder: 'white', primary: '#66686c' } }} />
                    )}
                />
                {errors.username && <Text style={[styles.inputError,]} >{errors.username.message}</Text>}

                <Controller
                    control={control}
                    name="firstName"
                    rules={{ required: 'שדה חובה' }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput style={[styles.input,]} label="שם פרטי" value={null} theme={{ colors: { onSurfaceVariant: 'black', placeholder: 'white', primary: '#66686c' } }} />
                    )}
                />
                {errors.firstName && <Text style={[styles.inputError,]} >{errors.firstName.message}</Text>}


                <Controller
                    control={control}
                    name="lastName"
                    rules={{ required: 'שדה חובה' }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput style={[styles.input,]} label="שם משפחה" value={null} theme={{ colors: { onSurfaceVariant: 'black', placeholder: 'white', primary: '#66686c' } }} />
                    )}
                />
                {errors.lastName && <Text style={[styles.inputError,]} >{errors.lastName.message}</Text>}

                <Button style={styles.btn} mode="contained" onPress={handleSubmit(onSubmit)}  > המשך</Button>

            </View>
        </SafeAreaView>
    )
}