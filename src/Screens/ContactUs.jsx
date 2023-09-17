import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import { styles } from '../Styles';

export default function ContactUs() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [snackbarVisible, setSnackbarVisible] = useState(false);

    const handleSubmit = () => {
        setSnackbarVisible(true);
    };

    return (
        <View style={styles.main_container}>
            <Text style={styles.title}>צור קשר</Text>
            <TextInput
                label="שם"
                value={name}
                onChangeText={text => setName(text)}
                mode="outlined"
                style={styles.input}
            />
            <TextInput
                label="אימייל"
                value={email}
                onChangeText={text => setEmail(text)}
                mode="outlined"
                style={styles.input}
            />
            <TextInput
                label="נושא"
                value={subject}
                onChangeText={text => setSubject(text)}
                mode="outlined"
                style={styles.input}
            />
            <TextInput
                label="הודעה"
                value={message}
                onChangeText={text => setMessage(text)}
                mode="outlined"
                multiline
                numberOfLines={5}
                style={styles.input}
            />
            <Button mode="contained" onPress={handleSubmit} style={styles.button}>
                שלח!
            </Button>

            <Snackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                action={{
                    label: 'Close',
                    onPress: () => setSnackbarVisible(false),
                }}
            >
                טופס נשלח בהצלחה!
            </Snackbar>
        </View>
    );
}