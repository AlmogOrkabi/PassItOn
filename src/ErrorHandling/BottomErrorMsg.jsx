import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Button, Snackbar } from 'react-native-paper';

export default function BottomErrorMsg({ msg }) {
    const [visible, setVisible] = useState(false);

    const onToggleSnackBar = () => setVisible(!visible);

    const onDismissSnackBar = () => setVisible(false);

    return (
        <View style={styles.container}>
            <Button onPress={onToggleSnackBar}>{visible ? 'Hide' : 'Show'}</Button>
            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'הבנתי',
                    onPress: () => {
                        // Do something
                    },
                }}>
                {msg}
            </Snackbar>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
});